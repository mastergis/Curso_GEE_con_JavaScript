var s2 = ee.ImageCollection("COPERNICUS/S2")
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

// Exercise


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



//Area de feature 
var cityArea = geometry.geometry().area()

//Resultado en ee.Number() y calcular el area en Km2
var cityAreaSqKm = ee.Number(cityArea).divide(1e6).round()
print(cityAreaSqKm)

//Area de deteccion de cambios
var classified0 = classified.neq(0);
var classified0ma = classified0.updateMask(classified0);

Map.addLayer(classified0ma, {min: 0, max: 1, palette: ['blue']}, 'change2'); 
print(classified0)

//Multiplicacion matricial a la clasificacion 
var areaImage = classified.multiply(ee.Image.pixelArea())


//sumamos todos los valores de la región 
var area = areaImage.reduceRegion({
  reducer: ee.Reducer.sum(),
  geometry: geometry.geometry(),
  scale: 10,
  tileScale: 16,
  maxPixels: 1e10
  })

//Obtencion de las area de cambio en Km2
var vegetationAreaSqKm = ee.Number(area.get('classification')).divide(1e6).round()
print(vegetationAreaSqKm)

/*
Exportacion de la clasificacion
*/

//Exportar a drive 

Export.image.toDrive({
  image:classified0ma, 
  description: 'DeteCambios_Mask',
  folder: 'GEE_JS', 
  region: geometry,
  scale: 10, 
  fileFormat: 'GeoTIFF'
})
//Exportar al asset

Export.image.toAsset({
  image:classified, 
  description: 'Clasificacion',
  assetId: 'users/mastergis01/GEE_JS/classified', 
  region: geometry,
  scale: 10
})
//Exportar link
var URLDescarga = geometry.getDownloadURL({
  format: 'SHP', 
  filename:'Area_estudio'
});
print(URLDescargaT);


https://code.earthengine.google.com/6d842c104f0b02e01e9f382c05ce512b
