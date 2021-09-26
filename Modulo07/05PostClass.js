var bangalore = ee.FeatureCollection("users/mastergis01/GEE_JS/bangalore")
var urban = ee.FeatureCollection("users/mastergis01/GEE_JS/urban")
var bare = ee.FeatureCollection("users/mastergis01/GEE_JS/bare")
var water = ee.FeatureCollection("users/mastergis01/GEE_JS/water")
var vegetation = ee.FeatureCollection("users/mastergis01/GEE_JS/vegetation")

var s2 = ee.ImageCollection("COPERNICUS/S2_SR")

Map.centerObject(bangalore)
var rgbVis = {
  min: 0.0,
  max: 3000,
  bands: ['B4', 'B3', 'B2'], 
};
//2019
var filtered = s2
  .filter(ee.Filter.date('2019-01-01', '2019-01-31'))
  .filter(ee.Filter.bounds(bangalore))
  .select('B.*')

  
var before = filtered.median().clip(bangalore)
// Visualizacion de imagen compuesta
Map.addLayer(before, rgbVis, 'before');

var training = urban.merge(bare).merge(water).merge(vegetation)

// Entrenamiento de los datos
var training = before.sampleRegions({
  collection: training, 
  properties: ['landcover'], 
  scale: 10
});

// Entrenamiento de la clasificacion.
var classifier = ee.Classifier.smileRandomForest(50).train({
  features: training,  
  classProperty: 'landcover', 
  inputProperties: before.bandNames()
});

// // Clasificacion de la imagen 2019.
var beforeClassified = before.classify(classifier);
Map.addLayer(beforeClassified,
  {min: 0, max: 3, palette: ['gray', 'brown', 'blue', 'green']}, 'before_classified');


// 2020 
var after = s2
  .filter(ee.Filter.date('2020-01-01', '2020-01-31'))
  .filter(ee.Filter.bounds(bangalore))
  .select('B.*')
  .median()
  .clip(bangalore)

Map.addLayer(after, rgbVis, 'after');

// Clasificacion de la imagen 2020.
var afterClassified= after.classify(classifier);
Map.addLayer(afterClassified,
  {min: 0, max: 3, palette: ['gray', 'brown', 'blue', 'green']}, 'after_classified');

// Reclasificacion de 0-3 a 1-4
var beforeClasses = beforeClassified.remap([0, 1, 2, 3], [1, 2, 3, 4])
var afterClasses = afterClassified.remap([0, 1, 2, 3], [1, 2, 3, 4])

//Muestra todas las areas de cambio
var changed = afterClasses.subtract(beforeClasses).neq(0)
Map.addLayer(changed, {min:0, max:1, palette: ['white', 'red']}, 'Change')


//Transicion de los valores de los pixeles unicos
var merged = beforeClasses.multiply(100).add(afterClasses).rename('transitions')
print(merged);
// Histograma de frecuencia para obtener un recuento de píxeles por clase
var transitionMatrix = merged.reduceRegion({
  reducer: ee.Reducer.frequencyHistogram(), 
  geometry: bangalore,
  maxPixels: 1e10,
  scale:10,
  tileScale: 16
})
// Imprime el número de píxeles para cada transición de clase.
print(transitionMatrix.get('transitions'))              


