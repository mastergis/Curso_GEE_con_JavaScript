Map.addLayer(geometry);

//// 1) BUSCAR IMAGEN ////

// Crear mosaico de imágenes Sentinel 2
var img = ee.ImageCollection('COPERNICUS/S2')
                  .filterDate('2019-01-01', '2019-12-31')
                  .filter(ee.Filter.lt('CLOUDY_PIXEL_PERCENTAGE', 5))
                  .filterBounds(geometry)
                  .map(function(image){return image.clip(geometry)})
                  .median();
                  
// Centrar el mapa en el área de estudio
Map.centerObject(geometry, 10);

// Añadir imagen al mapa
Map.addLayer (img, {
  max: 4000, 
  min: 0.0, 
  gamma: 1.0,
  bands: ['B11','B8','B2']}, 
  'Imagen Sentinel 2');
//-------------------------------------------------------------------------------------------------------------
//// 2) CLASIFICACIÓN ////

// Seleccionar bandas
var bands = img.bandNames();

// Unir los datos de entrenamiento de las distintas clases
var training_data = Agua.merge(Vegetacion).merge(Nieve).merge(Suelo).merge(Urbano);

// "Muestrear las regiones
var cart_training = img.select(bands).sampleRegions({
  collection:training_data,
  properties:['Land_class'],
  scale:20
});

// Entrenar al clasificador
var cart = ee.Classifier.smileCart().train({
  features:cart_training,
  classProperty: 'Land_class',
  inputProperties:bands
});
// Obtener la imagen clasificada
var img_clas =img.select(bands).classify(cart);

// Paleta de colores
var paleta = [
  "#0ed6b6", // Nieve
  "#49ac2c", // Vegetacion
  "#b06c37", // Suelo
  "#0f3dff", // Agua
  '#ebff14'] // Urbano

  
// Añadir la imagen clasificada al mapa
Map.addLayer(img_clas, {min: 1, max:5, palette: paleta}, "Clasificacion CART ");

// Exportar la imagen clasificada a Drive
Export.image.toDrive({
  image:img_clas,
  description:'clas_CART',
  folder: 'GEE_JS',
  region:geometry, 
  scale:20
});
