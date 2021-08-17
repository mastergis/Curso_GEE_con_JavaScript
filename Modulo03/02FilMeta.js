//Filtrar por metadata 
var land5 = ee.ImageCollection("LANDSAT/LT05/C01/T1_SR").
            filterMetadata('WRS_PATH', 'equals', 8).
            filterMetadata('WRS_ROW', 'equals', 66).
            filterMetadata('CLOUD_COVER', 'less_than', 10);
            
print(land5)

var img = ee.Image('LANDSAT/LT05/C01/T1_SR/LT05_008066_19870515');
print(img);
Map.addLayer(img, {min: 0, max: 3000, bands: ['B5', 'B4', 'B3']});

var land5indx = land5.filterMetadata('system:index', 'contains', '1987');
print(land5indx);
