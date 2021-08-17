//Reduciones 
/*
var geometry = ee.Geometry.Point([-77.6143, -10.1216])
var s2 = ee.ImageCollection("COPERNICUS/S2");

var rgbVis = {
  min: 0.0,
  max: 3000,
  bands: ['B4', 'B3', 'B2'],
};
var filtered = s2.filter(ee.Filter.lt('CLOUDY_PIXEL_PERCENTAGE', 30))
              .filter(ee.Filter.date('2019-01-01', '2020-01-01'))
              .filter(ee.Filter.bounds(geometry))
 
var mosaic = filtered.mosaic() 
print(mosaic, 'Reduccion Mosaic')
 
var medianComposite = filtered.median();
print(medianComposite, 'Reduccion median')


Map.centerObject(filtered, 7)
Map.addLayer(filtered, rgbVis, 'Filtered Collection');
Map.addLayer(mosaic, rgbVis, 'Mosaic');
Map.addLayer(medianComposite, rgbVis, 'Median Composite');
*/


//Otras reducciones

var land8 = ee.ImageCollection("LANDSAT/LC08/C01/T1_TOA")
            .filterBounds(geometry)
            .filterDate('2018-01-01', '2018-12-31')
            .filterMetadata('CLOUD_COVER', 'less_than', 70);

print(land8);

Map.centerObject(land8, 7);
Map.addLayer(land8,
              {min:0, max:0.5, bands:['B6', 'B5', 'B4']},
              'Image Collecction')
//mean 
var media = land8.mean();
//min 
var minimo = land8.min();
//max 
var maximo = land8.max();
//mode
var mode = land8.mode();


Map.centerObject(land8, 7);

Map.addLayer(media,
              {min:0, max:0.5, bands:['B6', 'B5', 'B4']},
              'Media')
Map.addLayer(minimo,
              {min:0, max:0.5, bands:['B6', 'B5', 'B4']},
              'Minimo');
Map.addLayer(maximo,
              {min:0, max:0.5, bands:['B6', 'B5', 'B4']},
              'Maximo');
Map.addLayer(mode,
              {min:0, max:0.5, bands:['B6', 'B5', 'B4']},
              'Moda');
