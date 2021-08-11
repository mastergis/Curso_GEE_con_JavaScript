// Datos vectoriales

var coleccionLimites = ee.FeatureCollection("USDOS/LSIB/2017");
var filtropais = coleccionLimites
                .filter(ee.Filter.eq('COUNTRY_NA', 'Mexico'));
Map.addLayer(filtropais);


//Asset vector
var provincias = ee.FeatureCollection('users/juniorantoniocalvomontanez/Limite_Provincial');
var Loreto = provincias
            .filter(ee.Filter.eq("NOMBPROV","LORETO"));
            
Map.addLayer(Loreto);

//Asset raster
var amazon= ee.Image('users/juniorantoniocalvomontanez/Huascaran');

Map.addLayer(amazon);
