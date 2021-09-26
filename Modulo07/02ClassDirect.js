Map.centerObject(change);
//Map.addLayer(change);
//Map.addLayer(nochange);

var rgbVis = {
  min: 0.0,
  max: 3000,
  bands: ['B4', 'B3', 'B2'],
};

// Crear una funcion para mascara de nubes
function maskS2clouds(image) {
  var qa = image.select('QA60')
  var cloudBitMask = 1 << 10;
  var cirrusBitMask = 1 << 11;
  var mask = qa.bitwiseAnd(cloudBitMask).eq(0).and(
             qa.bitwiseAnd(cirrusBitMask).eq(0))
  return image.updateMask(mask)//.divide(10000)
      .select("B.*")
      .copyProperties(image, ["system:time_start"])
} 
// visualizacion de imagenes compuestos
var filtered = s2
  .filter(ee.Filter.date('2019-01-01', '2019-02-01'))
  .filter(ee.Filter.bounds(geometry))
  .map(maskS2clouds)

  
var image2019 = filtered.median().clip(geometry)

Map.addLayer(image2019, rgbVis, '2019');

var filtered = s2
  .filter(ee.Filter.date('2020-01-01', '2020-02-01'))
  .filter(ee.Filter.bounds(geometry))
  .map(maskS2clouds)

var image2020 = filtered.median().clip(geometry)

Map.addLayer(image2020, rgbVis, '2020');



//Crear una funcion para el calculo del NDBI
var addNDBI = function(image) {
  var ndbi = image.normalizedDifference(['B11', 'B8']).rename(['ndbi']);
  return image.addBands(ndbi)
}


//Añadir las bandas NDBI para ambas fechas 2019 y 2020
var stackedImage = image2019.addBands(image2020)


//Entrenamiento de datos 
var training = stackedImage.sampleRegions({
  collection: change.merge(nochange), 
  properties: ['class'], 
  scale: 10
});

// Entrenar un clasificador.
var classifier = ee.Classifier.smileRandomForest(50).train({
  features: training,  
  classProperty: 'class', 
  inputProperties: stackedImage.bandNames()
});

// Clasificacion de una imagen
var classified = stackedImage.classify(classifier);
Map.addLayer(classified, {min: 0, max: 1, palette: ['white', 'red']}, 'change'); 
print(classified)




https://code.earthengine.google.com/f2d237a9f531c600a61d431949b78ff1

