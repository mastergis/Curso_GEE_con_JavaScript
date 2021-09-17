/ Crear mosaico de imágenes Sentinel 2
var img = ee.ImageCollection("LANDSAT/LC08/C01/T1_TOA")
                  .filterDate('2018-01-01', '2018-12-31')
                  .filter(ee.Filter.lt('CLOUD_COVER', 5))
                  .filterBounds(geometry)
                  .map(function(image){return image.clip(geometry)})
                  .median();

// Centrar el mapa en el área de estudio
Map.centerObject(geometry);

// Añadir imagen al mapa
Map.addLayer (img, {
  max: 0.4, 
  min: 0.0, 
  gamma: 1.0,
  bands: ['B4','B3','B2']}, 
  'Imagen Sentinel 2');
// Crear datos de entrenamiento
var training = img.sample({
  region: geometry,
  scale: 20,
  numPixels: 10000 // Puntos aleatorios (mientras más mejor)
});

// Aplicar algoritmo k-means y "entrenarlo"
var kmeans = ee.Clusterer.wekaKMeans(10).train(training);

// Agrupar los resultados del algoritmo
var resultado =  img.cluster(kmeans);

// Añadir imagen clasificada al mapa con colores aleatorios
Map.addLayer(resultado.randomVisualizer(), {}, 'Clasificación K-means');
