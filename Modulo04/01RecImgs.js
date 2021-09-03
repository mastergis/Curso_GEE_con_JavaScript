// Recortar imagenes a partir de datos vector
//Image
var img = ee.Image('LANDSAT/LT05/C01/T1_SR/LT05_008066_19870515');
print(img);
Map.addLayer(img, {min: 100, max: 5000, bands: ['B5', 'B4', 'B3']}, 'Image');
//Image clip
var img_clip = img.clip(Huascaran);
Map.addLayer(img_clip, {min: 100, max: 5000, bands: ['B5', 'B4', 'B3']}, 'Image clip');
/*
Feature Collection
*/
var Boundary = ee.FeatureCollection("USDOS/LSIB/2017");
var Argentina = Boundary.filter(ee.Filter.eq('COUNTRY_NA','Argentina'));

//Map.addLayer(Argentina, {}, 'Argentina');

/*
Image Collection
*/
var colec = ee.ImageCollection("LANDSAT/LC08/C01/T1_TOA")
            .filterBounds(Argentina)
            .filterDate('2020-01-01', '2020-12-31')
            .filterMetadata('CLOUD_COVER', 'less_than', 10)
            .median()
            .clip(Argentina);

print(colec);          
Map.addLayer(colec,{}, 'Median Landsat 8');
