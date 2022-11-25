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
                'Introduze el numero asignado a la opcion de la lista abajo (Pulsa 0 para salir): '

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });


function getUserNumber() {
return new Promise((resolve, reject) => {
    rl.question(options, function(num) {
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
  const age = {'min': 17, 'max': 60};
  const score = {'min': 0, 'max': 10};
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


function showTableWithStudents(studentsList) {
  console.table(studentsList);
}


function showTotalStudents(studentsList){
  console.log('TOTAL ESTUDIANTES: ' + studentsList.length);
}


function showStudentsNames(studentsList) {
  studentsList.forEach(student => { console.log(student.name)})
}


function removeLast(studentsList) {
  studentsList.pop();
  console.log('ELIMINADO')
}


function removeRandom(studentsList) {
  studentsList.splice(calculateRandomNumber(0, studentsList.length - 1), 1);
}


function showFemaleStudents(studentsList) {
  const femaleStudents = studentsList.filter(student => student.gender === 'female');
  console.log(femaleStudents)
}

function showTotalStudentsByGender(studentsList) {
  const totalMale = studentsList.filter(student => student.gender === 'male');
  const totalFemale = studentsList.filter(student => student.gender === 'female');
  console.log('TOTAL CHICAS: ' + totalFemale.length);
  console.log('TOTAL CHICOS: ' + totalMale.length);
}


function AreAllGirls(studentsList) {
  for(let i=0; i<studentsList.length; i++){
    if(studentsList[i].gender !== 'female'){
      return false;
    }
  }
  return true;
}


function showNamesFilteredByAge(studentsList, min, max){
  const studentsfrom20To30 = studentsList.filter(student => student.age >= min && student.age <= max);
  studentsfrom20To30.forEach(student => console.log(student.name));
}


function addRandomStudent(studentsList, namesList, gender) {
  
  const age = {'min': 20, 'max': 50};
  const student = {
    age: calculateRandomNumber(age.min, age.max),
    examScores: [],
    gender: gender,
    name: namesList[calculateRandomNumber(0, namesList.length)].toLowerCase()
  }
  studentsList.push(student);
  console.log("AÑADIDO")
}

function youngestStudent(studentsList) {
  let youngest = studentsList[0];
  for(let i=1; i<studentsList.length; i++){
    if (youngest.age > studentsList[i].age) {
      youngest = studentsList[i];
    }
  }
  return youngest
}


async function manageStudents() {
  let num; 
  do{
    num = await getUserNumber();
    console.log()
    switch(num) {
      case 1:
        showTableWithStudents(studentsList);
        break;
      case 2:
        showTotalStudents(studentsList);
        break;
      case 3:
        showStudentsNames(studentsList);
        break;
      case 4:
        removeLast(studentsList);
        break;
      case 5:
        removeRandom(studentsList);
        break;
      case 6:
        showFemaleStudents(studentsList);
        break;
      case 7:
        showTotalStudentsByGender(studentsList);
      case 8:
        console.log(AreAllGirls(studentsList));
        break;
      case 9:
        showNamesFilteredByAge(studentsList, 20, 25);
        break;
      case 10:
        addRandomStudent(studentsList, availableFemaleNames, availableGenders[1]);
        break;
      case 11:
        debugger
        console.log(youngestStudent(studentsList));
        break;
        
    }
  } while (num >= 1 && num <= 18);
  rl.close();
}


//Automatically generate a new list of students
let students2 = generateStudents(availableFemaleNames, availableGenders[1]);
let student3 = generateStudents(availableMaleNames, availableGenders[0]);
let studentsList = students2.concat(student3);

manageStudents();