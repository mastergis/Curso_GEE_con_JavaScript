// Image Sentinel-2
var img = ee.Image('COPERNICUS/S2/20200617T152651_20200617T152645_T18LTQ');

//funcion para el calculo del NDSI
function cal_ndsi(imgndsi){
  var ndsi = imgndsi.normalizedDifference(['B3', 'B11']).rename('ndsi');
  return ndsi;
}

//Calculo del NDSI
var img_ndsi = cal_ndsi(img);
print(img_ndsi);

Map.centerObject(img, 8);
Map.addLayer(img_ndsi, {palette:['blue', 'white']}, 'Img_dnsi')

//Extracion de cobertura de nieve 0.4 a 1
var ndsi_gt = img_ndsi.gt(0.4);
var ndsi_extr = ndsi_gt.updateMask(ndsi_gt);

Map.addLayer(ndsi_extr, {palette:['blue']}, 'Img_dnsi_reclass')
