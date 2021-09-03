//Cuenca hidrografica 
var cuen_piura = ee.FeatureCollection('users/juniorantoniocalvomontanez/carpeta/Cuenca_Hidrografica')
                 .filter(ee.Filter.eq('NOMB_UH_N4','Piura'))
print(cuen_piura);
Map.centerObject({
  object:cuen_piura, 
  zoom: 7
})
Map.addLayer(cuen_piura, {}, 'Cuenca_Piura')

//Convertir vector a raster
var raster_piura = cuen_piura
    .filter(ee.Filter.notNull(['CODIGO']))
    .reduceToImage({
      properties:['ID'], //Tipo numerico
      reducer:ee.Reducer.first()
    }).rename('B1')
print(raster_piura)
Map.addLayer(raster_piura, {},'raster original')
// Sistema de coordenadas
var proj_ras = raster_piura.projection().crs()
print(proj_ras)
// Escala del raster convertido 
var sca_ras = raster_piura.select('B1').projection().nominalScale();
print(sca_ras);

//Escala a 30 m
var ras_piu30 = raster_piura.reproject({
  crs:proj_ras, 
  scale:30
})
// Escala del raster convertido de 30m  
var sca_ras30 = ras_piu30.select('B1').projection().nominalScale();
print(sca_ras30);
Map.addLayer(ras_piu30, {} ,'raster 30m')

//
var image = ee.Image('USDA/NAIP/DOQQ/m_3809731_sw_14_1_20150713');
Map.addLayer(image);

//segmentacion 
var snic = ee.Algorithms.Image.Segmentation.SNIC({image: image,
 size: 100,
 compactness: 0, 
 neighborhoodSize:100});
                                     
Map.addLayer(snic.randomVisualizer());


//Reduce to vector
var table = snic.reduceToVectors({reducer:ee.Reducer.mean(),
geometry:image.geometry(),
scale: 3,
maxPixels:1e12
});
print(table);
Map.addLayer(table);
