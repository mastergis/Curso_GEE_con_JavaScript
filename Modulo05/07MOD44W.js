//Limites de todos los paises 
var paises = ee.FeatureCollection("USDOS/LSIB/2017");
var brazil = paises.filter(ee.Filter.eq('COUNTRY_NA', 'Brazil'));
Map.centerObject(brazil, 6);
Map.addLayer(brazil);

//Productos MOD44W
var collMOD44W =ee.ImageCollection("MODIS/006/MOD44W")
                .filter(ee.Filter.date('2015-01-01', '2015-05-01'));

print(collMOD44W);

var imgMOD44W = ee.Image('MODIS/006/MOD44W/2015_01_01')
                .select('water_mask')
                .clip(brazil);
//parametros de visualizacion                 
var watervis ={
  min:0.0, 
  max:0.5, 
  palette: ['bcba99', '2d0491']
};

Map.addLayer(imgMOD44W, watervis, 'Mascara_agua');
