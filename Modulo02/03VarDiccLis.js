//Diccionarios

var dic={
  saludo: 'Bienvenido al curso', 
  fecha: '2021-08-09',
  Curso:'GEE con JS', 
  Modulo: 7,
  Sesiones: 5
};

print(dic);

//Listas
var t=2+4;
var list_01=[1,2,3,4,5,6,7,8,9,10];
var list_02=[7, 'Curso GEE con JS', t];

print(list_01)
print(list_02)
print(list_02[1])

//Ejemplo
var palos = ["corazones", "picas", "tréboles", "diamantes"];
var numeros = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11 , 12];
for (var i = 0; i < palos.length; i++) {
for (var j = 0; j < numeros.length; j++) {
  console.log(numeros[j] + " de " + palos[i]);
    }
}
