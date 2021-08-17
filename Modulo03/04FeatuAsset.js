//Trabajando con Feature Collections
var paises = ee.FeatureCollection("USDOS/LSIB/2017");
var Mexico = paises.filter(ee.Filter.eq('COUNTRY_NA', 'Mexico'));

//Map.centerObject(Mexico, 4);
//Map.addLayer(Mexico, {'color':'blue'}, 'Mexico')

// Seleccione el conjunto de datos vectoriales sobre los estados de EE. UU. Proporcionado por GEE, seleccione dos estados
var fc = ee.FeatureCollection('TIGER/2016/States');

var estados = fc.filter(ee.Filter.or(
                    ee.Filter.eq('NAME', 'Nevada'),
                    ee.Filter.eq('NAME', 'Arizona')));
//Map.centerObject(estados, 4); 
Map.addLayer(fc, {'color': 'red',opacity: 0.8}, 'EEUU');
Map.addLayer(estados, {'color':'blue'}, 'Estados');

// Datos vectoriales del ASSET
var cuenca_peru = ee.FeatureCollection('users/juniorantoniocalvomontanez/carpeta/Cuenca_Hidrografica');
//Map.centerObject(cuenca_peru, 4);
Map.addLayer(cuenca_peru, {}, 'Cuencas Hidrograficas');
Map.addLayer(Cuenca, {'color': 'blue'}, 'Cuencas');

// Datos raster del ASSET
var img_carabayllo = ee.Image('users/juniorantoniocalvomontanez/carpeta/Planet_carabayllo');
var trucolor = img_carabayllo.select(['b1', 'b2', 'b3'])
print(img_carabayllo)

Map.centerObject(trucolor, 12);
Map.addLayer(trucolor, {'min':3718, 'max':9070}, 'TruColor img');
