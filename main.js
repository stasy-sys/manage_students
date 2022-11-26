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

const availableMaleNames = ['pepe', 'juan', 'victor', 'leo', 'francisco', 'carlos'];
const availableFemaleNames = ['cecilia', 'ana', 'luisa', 'silvia', 'isabel', 'virginia'];
const availableGenders = ['male', 'female'];
const availableNames = {
  'male': availableMaleNames,
  'female': availableFemaleNames
};
const AGE = { 'min': 20, 'max': 50 };
const SCORE = { 'min': 0, 'max': 10 };

const options = '\n\n\n------------------------------------------------\n' +
  'OPTIONS\n' +
  '1- Mostrar en formato de tabla todos los alumnos.\n' +
  '2- Mostrar por consola la cantidad de alumnos que hay en clase.\n' +
  '3- Mostrar por consola todos los nombres de los alumnos.\n' +
  '4- Eliminar el último alumno de la clase.\n' +
  '5- Eliminar un alumno aleatoriamente de la clase.\n' +
  '6- Mostrar por consola todos los datos de los alumnos que son chicas.\n' +
  '7- Mostrar por consola el número de chicos y chicas que hay en la clase.\n' +
  '8- Mostrar true o false por consola si todos los alumnos de la clase son chicas.\n' +
  '9- Mostrar por consola los nombres de los alumnos que tengan entre 20 y 25 años.\n' +
  '10- Añadir un alumno nuevo\n' +
  '11- Mostrar por consola el nombre de la persona más joven de la clase.\n' +
  '12- Mostrar por consola la edad media de todos los alumnos de la clase.\n' +
  '13- Mostrar por consola la edad media de las chicas de la clase.\n' +
  '14- Añadir nueva nota a los alumnos. Por cada alumno de la clase\n' +
  '15- Ordenar el array de alumnos alfabéticamente según su nombre.\n' +
  '16- Mostrar por consola el alumno de la clase con las mejores notas.\n' +
  '17- Mostrar por consola la nota media más alta de la clase y el nombre del alumno al que pertenece..\n' +
  '18- Añadir un punto extra a cada nota existente de todos los alumnos. Recordad que la nota máxima posible es 10. Si los alumnos aún no tienen registrada ninguna nota, les pondremos un 10.\n' +
  '------------------------------------------------\n' +
  'Introduze el numero asignado a la opcion de la lista (Pulsa 0 para salir): '

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});


function getUserNumber() {
  return new Promise((resolve, reject) => {
    rl.question(options, function (num) {
      rl.pause();
      const parsedNumber = parseInt(num);
      resolve(parsedNumber);
    })
  });
}


function calculateRandomNumber(min, max) {
  const randomNumber = Math.floor( Math.random() * (max - min + 1)) + min;
  return randomNumber;
}


function generateStudents(namesList, gender) {
  let students = [];
  for (let i = 0; i < namesList.length; i++) {
    students[i] = {
      age: calculateRandomNumber(AGE.min, AGE.max),
      examScores: [calculateRandomNumber(SCORE.min, SCORE.max)],
      gender: gender,
      name: namesList[i].toLowerCase()
    }
  }
  return students
}

function getRandomFromList(list) {
  const i = calculateRandomNumber(0, list.length-1);
  return list[i];
}

function generateStudentsTotal(total, namesList, gendersList) {
  let students = [];
  for (let i = 0; i < total; i++) {
    const gender = getRandomFromList(gendersList);
    const name = getRandomFromList(namesList[gender]);
    students[i] = {
      age: calculateRandomNumber(AGE.min, AGE.max),
      examScores: [calculateRandomNumber(SCORE.min, SCORE.max)],
      gender: gender,
      name: name
    }
  }
  return students
}

function removeRandom(studentsList) {
  const index = calculateRandomNumber(0, studentsList.length - 1)
  const removedStudent = studentsList[index];
  studentsList.splice(index, 1);
  return removedStudent;
}


function femaleStudents(studentsList) {
  return studentsList.filter(student => student.gender === 'female');
}

function showTotalStudentsByGender(studentsList) {
  const totalMale = studentsList.filter(student => student.gender === 'male');
  const totalFemale = femaleStudents(studentsList);
  return { 'chicas': totalFemale.length, 'chicos': totalMale.length }
}


function areAllGirls(studentsList) {
  for (let i = 0; i < studentsList.length; i++) {
    if (studentsList[i].gender !== 'female') {
      return false;
    }
  }
  return true;
}


function showNamesFilteredByAge(studentsList, min, max) {
  return studentsList.filter(
    student => student.age >= min && student.age <= ma
  ).forEach(
    student => console.log(student.name)
  );
}


function addRandomStudent(studentsList, namesList, gender) {
  const student = {
    age: calculateRandomNumber(AGE.min, AGE.max),
    examScores: [],
    gender: gender,
    name: namesList[calculateRandomNumber(0, namesList.length)].toLowerCase()
  }
  studentsList.push(student);
  return student

}

function youngestStudent(studentsList) {
  let youngest = studentsList[0];
  for (let i = 1; i < studentsList.length; i++) {
    if (youngest.age > studentsList[i].age) {
      youngest = studentsList[i];
    }
  }
  return youngest.name;
}

function averageAge(studentsList) {
  let accum = 0;
  const len = studentsList.length;
  for (let i = 0; i < len; i++) {
    accum += studentsList[i].age;
  }
  return Math.round(accum / len)
}

function addScore(studentsList) {
  studentsList.forEach(student => { student.examScores.push(calculateRandomNumber(SCORE.min, SCORE.max)) })
}

function orderbyName(studentsList) {
  return studentsList.sort((a, b) => (a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0));

}


async function manageStudents(studentsList, availableFemaleNames, availableGenders) {
  let num;
  do {
    num = await getUserNumber();
    console.log()
    switch (num) {
      case 1:
        console.table(studentsList);
        break;
      case 2:
        console.log('TOTAL ESTUDIANTES: ' + studentsList.length);
        break;
      case 3:
        console.log(studentsList.forEach(student => { console.log(student.name) }));
        break;
      case 4:
        console.log('ELIMINADO: ', studentsList.pop());
        break;
      case 5:
        console.log('ELIMINADO: ', removeRandom(studentsList))
        break;
      case 6:
        console.log('LAS CHICAS: ', femaleStudents(studentsList));
        break;
      case 7:
        console.log('TOTAL: ', showTotalStudentsByGender(studentsList));
        break
      case 8:
        console.log('TODAS SON CHICAS: ', areAllGirls(studentsList));
        break;
      case 9:
        console.log('TIENE 20-25 AÑOS: ')
        showNamesFilteredByAge(studentsList, 20, 25);
        break;
      case 10:
        if (availableGenders[calculateRandomNumber(0, 1)] === 'female'){
          console.log('AÑADIDO: ', addRandomStudent(studentsList, availableFemaleNames, availableGenders[1]));
        } else {
          console.log('AÑADIDO: ', addRandomStudent(studentsList, availableMaleNames, availableGenders[0]));
        }
        break;
      case 11:
        console.log('MÁS JOVEN: ', youngestStudent(studentsList));
        break;
      case 12:
        console.log('EDAD MEDIA: ', averageAge(studentsList));
        break;
      case 13:
        console.log('EDAD MEDIA PARA CHICAS: ', averageAge(femaleStudents(studentsList)));
        break;
      case 14:
        addScore(studentsList);
        console.log('AÑADIDO')
        break;
      case 15:
        orderbyName(studentsList);
        console.log('ORDENADO')
        break;
      case 16:
      case 17:
      case 18:
        console.log("in development")
    }
  } while (num >= 1 && num <= 18);
  rl.close();
}


//Automatically generate a new list of students
let students2 = generateStudents(availableFemaleNames, availableGenders[1]);
let student3 = generateStudents(availableMaleNames, availableGenders[0]);
let studentsList = students2.concat(student3);
studentsList = generateStudentsTotal(12, availableNames, availableGenders);

manageStudents(studentsList, availableFemaleNames, availableGenders);