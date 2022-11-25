/* 
  si utilizáis algún import en vuestra solución, recordad que hay que indicarle a node 
  que estamos utilizando módulos. Para ello, debemos incluir el fichero package.json que 
  veis en este repositorio. En caso de que no os funcione, contactadme por discord.
*/

import readline from 'readline';


let students = [{
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
      '\n\n\n------------------------------------------------\n' +
      'OPTIONS\n' +
      '1- Mostrar en formato de tabla todos los alumnos.\n' +
      '2- Mostrar por consola la cantidad de alumnos que hay en clase.\n' +
      '3- Mostrar por consola todos los nombres de los alumnos.\n' +
      '4- Eliminar el último alumno de la clase.\n' +
      '------------------------------------------------\n' +
      'Introduze el numero asignado a la opcion de la lista abajo (Pulsa 0 para salir): ', function(num) {
    rl.pause();
    const parsedNumber = parseInt(num)
    resolve(parsedNumber);
    })
});
}


function calculateRandomNumber(min, max) {
  const randomNumber = Math.floor(Math.random() * (max - min)) + min;
  return randomNumber;
}


function generateStudents(NamesList, gender) {
  const age = {"min": 17, "max": 60};
  const score = {"min": 0, "max": 10};
  let students = [];
  for (let i = 0; i < NamesList.length; i ++ ) {
    students[i] = {
      age: calculateRandomNumber(age.min, age.max),
      examScores: [calculateRandomNumber(score.min, score.max)],
      gender: gender,
      name: NamesList[i].toLowerCase()
    }
  }
  return students

}


function getStudents(studentsList) {
  console.table(studentsList);
}


function TotalStudents(studentsList){
  console.log("TOTAL ESTUDIANTES: " + studentsList.length);
}


function getStudentsNames(studentsList) {
  studentsList.map(x => console.log(x.name));
}


function RemoveLast(studentsList) {
  studentsList.pop();
  console.log("ELIMITADO")
}

function RemoveRandom(studentsList) {
  studentsList.splice(calculateRandomNumber(0, studentsList.length - 1), 1);
}

//Automatically generate a new list of students
let students2 = generateStudents(availableFemaleNames, availableGenders[1]);
let student3 = generateStudents(availableMaleNames, availableGenders[0]);
let studentsList = students2.concat(student3);


async function manageStudents() {
  let num; 
  do{
    num = await getUserNumber();
    console.log()
    switch(num) {
      case 1:
        getStudents(studentsList);
        break;
      case 2:
        TotalStudents(studentsList);
        break;
      case 3:
        getStudentsNames(studentsList);
        break;
      case 4:
        RemoveLast(studentsList);
        break;
      case 5:
        RemoveRandom(studentsList);
        break;
    }
  } while (num >= 1 && num <= 18);
  rl.close();
}


manageStudents()