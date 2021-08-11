// Datos raster de una sola banda 
var args="USGS/SRTMGL1_003";
var srtm=ee.Image(args);
print(srtm)

//visualizar el srtm
Map.addLayer(srtm, {
                    min:1000,
                    max:5000, 
                    palette: ['blue', 'red', 'green']
                    }, 'DEM srtm', false);
                    

//Datos raster de multibandas 
var land8=ee.Image("LANDSAT/LC08/C01/T1_TOA/LC08_008066_20200610");

print(land8);

Map.centerObject(land8, 7);
Map.addLayer(land8, {min:0, max:0.5,bands:['B6', 'B5', 'B4']},'Landsat8', false );

//Coleccion de imagenes 

var Land5col = ee.ImageCollection('LANDSAT/LT05/C01/T1_TOA')
                  .filterDate('2011-01-01', '2011-12-31')
                  .select(['B3', 'B2', 'B1']);

Map.setCenter(-77.324, -8.843, 6);
Map.addLayer(Land5col, {min:0, max:0.4}, 'Landsat 5 TOA');
