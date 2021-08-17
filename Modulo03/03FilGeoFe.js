// Filtro por geometria y fechas 
var sent2 = ee.ImageCollection("COPERNICUS/S2")
            .filterBounds(Area_estudio)
            .filterDate('2020-01-01', '2020-12-31')
            .filterMetadata('CLOUDY_PIXEL_PERCENTAGE', 'less_than', 5);
          
print(sent2)

Map.addLayer(sent2, {min: 100, max: 5000, bands: ['B11', 'B8A', 'B2']});

//Filtro con sub filtro 
var land5 = ee.ImageCollection("LANDSAT/LT05/C01/T1_SR")
            .filterDate('1987-01-01', '2000-12-31')
            .filter(ee.Filter.eq('WRS_PATH', 8))
            .filter(ee.Filter.eq('WRS_ROW', 66))
print(land5);

//Filtro combinado 
var land8 = ee.ImageCollection("LANDSAT/LC08/C01/T1_TOA")
            .filterDate('2018-11-01', '2018-12-31')
            .filter(ee.Filter.or(
              ee.Filter.and(ee.Filter.eq('WRS_PATH', 8), ee.Filter.eq('WRS_ROW', 66)), 
              ee.Filter.and(ee.Filter.eq('WRS_PATH', 9), ee.Filter.eq('WRS_ROW', 66))
              ));
print(land8);
Map.addLayer(land8);

//Filtro por exclusion 
var listexc = ['LT05_008066_19870312', 'LT05_008066_19870515'];

var land52 = ee.ImageCollection("LANDSAT/LT05/C01/T1_SR")
            .filterDate('1987-01-01', '2000-12-31')
            .filter(ee.Filter.eq('WRS_PATH', 8))
            .filter(ee.Filter.eq('WRS_ROW', 66))
            .filter(ee.Filter.inList('system:index', listexc).not());
print(land52);
