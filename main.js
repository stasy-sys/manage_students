/* 
  si utilizáis algún import en vuestra solución, recordad que hay que indicarle a node 
  que estamos utilizando módulos. Para ello, debemos incluir el fichero package.json que 
  veis en este repositorio. En caso de que no os funcione, contactadme por discord.
*/

import readline from 'readline';


const students = [{
    age: 32,
    examScores: [],
    gender: 'male',
    name: 'edu'
  },
  {
    age: 29,
    examScores: [],
    gender: 'female',
    name: 'silvia'
  }]
  
const availableMaleNames = ['pepe', 'juan', 'victor', 'Leo', 'francisco', 'carlos'];
const availableFemaleNames = ['cecilia', 'ana', 'luisa', 'silvia', 'isabel', 'virginia'];
const availableGenders = ['male', 'female'];

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });


function getUserNumber() {
return new Promise((resolve, reject) => {
    rl.question(
        'Introduze el numero asignado a la opcion de lista abajo (Pulsa 0 para salir):\n' +
        '________________________________________________\n' +
        '1- Mostrar en formato de tabla todos los alumnos.\n' +
        '2- Mostrar por consola la cantidad de alumnos que hay en clase.\n', function(num) {
    rl.pause();
    const parsedNumber = parseInt(num)
    resolve(parsedNumber);
    })
});
}

let num = await getUserNumber();
rl.close();

