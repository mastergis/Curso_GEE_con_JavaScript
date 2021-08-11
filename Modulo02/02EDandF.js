// ...............Estructura de control................
/*
CONDICIONALES
*/
//Estructura if
var mostrarMensaje = true;

if(mostrarMensaje === true) {
  print("Hola Mundo");
}

//Estructura if...else
var pixelNDVI = 0.3;

if(pixelNDVI >= 0.4) {
  print("Se presenta malesas");
}
else {
  print("Suelo descubierto");
}

/*
Estructura for
*/
var contador;

for (contador = 0; contador <= 5; contador++){
    print("Valor del contador = " + contador);
}

var dias = ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado", "Domingo"];

for(var i=0; i<7; i++) {
  print(dias[i]);
}

/*
Funciones
*/
//funcion declarada
function hola(){
  print('Hola mundo cruel')
}

//invocación de la funcion
hola()

function factorial(n) {
  if ((n === 0) || (n === 1))
    return 1;
  else
    return (n * factorial(n - 1));
}

print(factorial(4))
