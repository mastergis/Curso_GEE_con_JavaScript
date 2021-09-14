//Image Landsat
var img = ee.Image('LANDSAT/LC08/C01/T1_TOA/LC08_008066_20190608');

//funcion para el calculo del NDVI
function cal_ndvi(imgndvi){
  var ndvi = imgndvi.normalizedDifference(['B5', 'B4']).rename('NDVI');
  return ndvi;
}

//Funcion del calculo de EVI 
function cal_evi(imgevi){
  var evi = imgevi.expression ('float (2.5 * ((NIR - RED) / (NIR + 6 * RED - 7.5 * BLUE + 1)))', {
    'NIR': imgevi.select ('B5'),  
    'RED': imgevi.select ('B4'),
    'BLUE': imgevi.select ('B2')}).rename('evi');
  return evi;
}

// calculo del NDVI de la imagen 
var NDVI_img = cal_ndvi(img);
print(NDVI_img);
// calculo del EVI de la imagen 
var EVI_img = cal_evi(img);

var palette = {palette:["#051852", "#FFFFFF", "#C7B59B", "#A8B255", "#A3C020", "#76AD00","#429001", "#006400", "#003B00", "#000000"]}

Map.centerObject(img,8);
Map.addLayer(NDVI_img, palette, 'NDVI img');
Map.addLayer(EVI_img, palette, 'NDVI img');
