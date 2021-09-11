/*
var collection = ee.ImageCollection("USDA/NAIP/DOQQ")
                .filterBounds(geometry)
                .filterDate('2015-01-01', '2015-12-31');
print(collection)
Map.addLayer(collection);
*/

var image = ee.Image('USDA/NAIP/DOQQ/m_3809731_sw_14_1_20150713');
Map.centerObject(image, 14)
Map.addLayer(image);

//segmentacion 
var snic = ee.Algorithms.Image.Segmentation.SNIC({image: image,
 size: 100,
 compactness: 0, 
 neighborhoodSize:100});
 
var resnic = snic.reproject({
  crs: 'EPSG:4326', 
  crsTransform: null, 
  scale:3
})
print(snic);                                    
Map.addLayer(snic.randomVisualizer());
Map.addLayer(snic.select('seeds').focal_max(3));
Map.addLayer(resnic.randomVisualizer());
//Reduce to vector
var table = snic.reduceToVectors({reducer:ee.Reducer.mean(),
geometry:image.geometry(),
scale: 3,
maxPixels:1e12
});
print(table);
Map.addLayer(table);

//Export
/*
Export.table.toDrive({
  collection: table,
  description: 'SegSHP', 
  folder:'Segmentacion', 
  fileFormat: 'SHP'
})
*/
//Export Link
/*
var URLDescarga = table.getDownloadURL({
  format: 'SHP', 
  filename: 'SegmenSHP'
})
*/
