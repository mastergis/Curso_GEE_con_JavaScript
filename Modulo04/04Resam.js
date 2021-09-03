//Coleccion de imagenes 
var land8col = ee.ImageCollection("LANDSAT/LC08/C01/T1_TOA")
               .filterBounds(LagRafael)
               .filterDate('2020-01-01','2020-03-01')
               .filterMetadata('CLOUD_COVER', 'less_than', 5);
print(land8col);

//Imagen 
var img = ee.Image('LANDSAT/LC08/C01/T1_TOA/LC08_232092_20200220')
var visParams = {
  min:0.0,
  max: 0.5,
  bands:['B6', 'B5', 'B4']
}
Map.addLayer(img, visParams, 'land8 30m', true);
print(img)
//Resampleo de una imagen 
/*
Resampleo

*/
/*
bilinear
*/
var img_resam = img.resample('bilinear');
print(img_resam);
Map.addLayer(img_resam, visParams, 'land8 ResBilineal ', false);

/*
bicubic
*/
var img_resam = img.resample('bicubic');
Map.addLayer(img_resam, visParams, 'land8 bicubic ', false);

//Cambio de resolucion de una imagen 
var crs_ban2 = img.select('B2').projection()
print(crs_ban2)

//Resample
var img_10m =img.resample('bilinear').reproject({
  crs:crs_ban2, 
  scale:10
})
print(img_10m);
Map.addLayer(img_10m, visParams, 'land8 10m')
