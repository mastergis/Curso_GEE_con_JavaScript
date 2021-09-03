//Matematica de bandas 
var colec = ee.ImageCollection("LANDSAT/LC08/C01/T1_TOA")
            .filterBounds(geometry)
            .filterDate('2020-01-01', '2020-05-20')
            .filterMetadata('CLOUD_COVER', 'less_than', 5);
print(colec);

var img = ee.Image('LANDSAT/LC08/C01/T1_TOA/LC08_093077_20200427')

Map.addLayer(img, {min:0.0, max:0.5, bands:['B6','B5', 'B4']}, 'Landsat 8')

//Calculo del NBR (NIR-SWIR/NIR+SWIR)
//El análisis de severidad de incendios a través del índice NBR (Normalized Burn Ratio) 
//es una de las vías que podremos desempeñar durante los análisis de imágenes satélite 
//con el fin de evaluar daños forestales o analizar la evolución de la regeneración de la
//cubierta vegetal tras un incendio.
var NBR = img.select('B5').subtract(img.select('B7'))
          .divide(img.select('B5').add(img.select('B7')));

var NBR2 = img.expression('float(NIR-SWIR)/float(NIR+SWIR)', {
  'NIR':img.select('B5'),
  'SWIR':img.select('B6')
});
Map.addLayer(NBR, {min:0.0, max:1, 'palette': ['#7F0010', '#D99143', '#C04529', '#E02E20', '#EC6521', '#F6D53B']}, 'NBR')
Map.addLayer(NBR2, {min:0.0, max:1}, 'NBR2', false)
