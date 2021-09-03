//Coleccion de imagenes  

var colec = ee.ImageCollection("LANDSAT/LC08/C01/T1_TOA")
            .filterBounds(geometry)
            .filterDate('2020-01-01', '2020-12-20')
            .filterMetadata('CLOUD_COVER', 'less_than', 20);
print(colec);

var img = ee.Image('LANDSAT/LC08/C01/T1_TOA/LC08_225061_20200728')
//Map.addLayer(img)

//Creando una funcion para el calculo del NDVI
function cal_ndvi(image){
  var ndvi = image.expression('(nir-red)/(nir+red)',{
    'nir':image.select('B5'),
    'red':image.select('B4'),
  }).rename('ndvi');
  return ndvi;
}

// calculo del NDVI de la imagen 
var NDVI_img = cal_ndvi(img);
var palette = {palette:["#051852", "#FFFFFF", "#C7B59B", "#A8B255", "#A3C020", "#76AD00","#429001", "#006400", "#003B00", "#000000"]}
print(NDVI_img);
Map.addLayer(NDVI_img, palette, 'NDVI img');
//Calculo del NDVI de la coleccion de imagen
var NDVI_imgcol = colec.map(cal_ndvi);
print(NDVI_imgcol);
Map.addLayer(NDVI_imgcol, palette, 'NDVI coleccion');
