//////////////////////////////////////////////////////////////////////////////////////
// Лабораторная работа 1 по дисциплине ЛОИС
// Выполнена студентом группы 721702 БГУИР Гуриновичем Александром Александровичем
// Файл содержит функции нахождения подформул,генерации формул, систему проверки знаний пользователя
//
// Функция генерации формулы https://github.com/PlagaMedicum/LOIS/tree/master/Lab1
//

okButton = document.getElementById("ok_button");
inputField = document.getElementById("input_field");
resultTextarea = document.getElementById("result_textarea");
formulaForm = document.getElementById("formulaForm");

classicModeButton = document.getElementById("classic");
testModeButton = document.getElementById("user_test");

genTestButton = document.getElementById("genTest");
genResultField = document.getElementById("genResult");
answerField = document.getElementById("answer");
answerLabel = document.getElementById("answerLabel");
checkAnswerButton = document.getElementById("checkAnswer");


okButton.addEventListener("click", () => {
    main();
});

checkAnswerButton.addEventListener("click", () => {
    checkAnswer();
});

genTestButton.addEventListener("click", () => {
    genResult.value = genFormula();
});

classicModeButton.addEventListener("click", () => {
    testModeButton.removeAttribute("class");
    classicModeButton.setAttribute("class", "selected");

    formulaForm.removeAttribute("class");
    genTestButton.setAttribute("class","none");
    genResultField.setAttribute("class","none");
    answerField.setAttribute("class","none");
    answerLabel.setAttribute("class","none");
    checkAnswerButton.setAttribute("class","none");
    resultTextarea.value = "";

});

testModeButton.addEventListener("click", () => {
    classicModeButton.removeAttribute("class");testModeButton
    testModeButton.setAttribute("class", "selected")

    formulaForm.setAttribute("class","none");
    genTestButton.removeAttribute("class");
    genResultField.removeAttribute("class");
    answerField.removeAttribute("class");
    answerLabel.removeAttribute("class");
    checkAnswerButton.removeAttribute("class");
    resultTextarea.value = "";
});



let openBracketsCount = 0;
let openArray = [];
let closeArray = [];

let arrayChecked = [];
let arrayOfFindAtom = [];

const atom = /[A-Z0-1]/g;
const operators = /[*&|~]/g;
const arrow = /(->)/

function main(){

    openBracketsCount = 0;
    openArray = [];
    closeArray = [];

    arrayChecked = [];
    arrayOfFindAtom = [];

    let inputString = inputField.value;
    let brackets = getBracketsFromString(inputString);
    if(!countBrackets(brackets)){
        resultTextarea.value = "проверь скобки";
        openBracketsCount = 0;
    } else {
        resultTextarea.value = "Открывающий скобок = " + openBracketsCount;
        if(checkSpace(inputString)){
            if ( allSubStringsIsFormula(inputString) ) {
                resultTextarea.value = "Строка является формулой.";
                resultTextarea.value += " Найдено " + findAtomCount(inputString) + " подформул";
            } else {
             resultTextarea.value = "Строка не является формулой.";
            }

        } else {
            resultTextarea.value = "проверь пробелы";
        }
    }
}

function getBracketsFromString(inputString){
    let bracketsString = "";
    openBracketsCount = 0;
    for(let i = 0; i < inputString.length; i += 1) {

        if (inputString[i] === '(') {
            bracketsString += inputString[i];
            openBracketsCount += 1;

        } else if ( inputString[i] === ')'){
            bracketsString += inputString[i];
        }
    }
    return bracketsString;
}

function countBrackets(str){

    let ArrBrackets = [];
    let open = 0;
    let close = 0;
                     
    bracketsConfig =[['(', ')']];
  
    if(str.length %2 != 0 ){
      return false;
    }
  
    for (let i = 0 ;i <str.length;i++){
      for (let j = 0 ;j <bracketsConfig.length;j++){
        if(bracketsConfig[j][0] == bracketsConfig[j][1]){
          if (str[i] == bracketsConfig[j][0]){
            if(close==open){
              ArrBrackets.push(i);
              open++;
              break;
            }
            else {
              ArrBrackets.pop();
              close ++;
              break;
            }
          }
        }
        else if (bracketsConfig[j][0] != bracketsConfig[j][1]){
          if (str[i] == bracketsConfig[j][0]){
            ArrBrackets.push(str[i]);
            open ++;
            break;
          }
          else if (str[i] == bracketsConfig[j][1]){
            if(ArrBrackets[ArrBrackets.length-1] == bracketsConfig[j][0]){
              ArrBrackets.pop();
              close ++;
              break;
            }
          }
        }
      }
    }
    return (ArrBrackets.length === 0);

}

function checkSpace(string){
    for(let i = 0; i < string.length; i += 1 ) {
        if(string[i] === " ") {
            return false;
        }
    }
    return true;
}

function allSubStringsIsFormula(inputString){
    let subStringsArray = [];

    let isFormula = true;

    configurateBraketsPair(inputString)
    
    console.log(openArray);
    console.log(closeArray);
    
    let getFirstFindBracketIndex = Math.min.apply(null,openArray);
    let getLastFindBracketIndex = Math.max.apply(null,closeArray);
    
    if(openArray.length > 0){
    
        let difference =  (getLastFindBracketIndex - getFirstFindBracketIndex);
    
        if ( difference + 1 !== inputString.length){
            resultTextarea.value = "все должно находиться внутри скобок";
            return null;
        }

        for(let i = 0; i < openArray.length;i++) {
            subStringsArray.push(inputString.substring(openArray[i],closeArray[i] + 1));
        }

        subStringsArray = sortArraysOfString(subStringsArray);

        for(let i = 0; i < openArray.length;i++) {
            if( !checkString(subStringsArray[i]) ) {
                isFormula = false
            }
        }

    } else {
        if ( !checkString(inputString) ) {
            isFormula = false;
        }
    }

    return isFormula;
}

function configurateBraketsPair(array){

    if ( openBracketsCount === 0 ) {
        return;
    }

    let visitedArray = [];
    let currentOpenState = [];

    let indexOpen = -1;
    let indexClose = -1;

    let counterOfBracketPairs = 0;

    for(let i = 0;i <= array.length; ){
        if ( !visitedArray.includes(i) && array[i] === "(") {
            indexOpen = i;
            currentOpenState.push(i);
        }  else if (!visitedArray.includes(i) && array[i] === ")"){
            indexClose = i;
        }

        if ( indexOpen !== -1 && indexClose !== -1){

            openArray.push(currentOpenState[currentOpenState.length-1] );
            closeArray.push(indexClose );

            visitedArray.push(currentOpenState[currentOpenState.length-1]);
            visitedArray.push(indexClose);

            currentOpenState.pop();
            counterOfBracketPairs++;

            indexClose = -1;
            if (currentOpenState.length === 0) {
                indexOpen = -1;
            }
  
        }
        if (i === array.length && counterOfBracketPairs !== openBracketsCount) {
            i = 0;
            continue;
        }
        i++;
    }
}

function sortArraysOfString(inputArrayOfString){
    for ( let i = 0; i < inputArrayOfString.length; i += 1 ) {
       for ( let j = 0; j < inputArrayOfString.length; j += 1 ) {
           if ( inputArrayOfString[i].length >= inputArrayOfString[j].length ) {
               continue;
           } else if ( inputArrayOfString[i].length < inputArrayOfString[j].length ) {
               let tmp = inputArrayOfString[i];
               inputArrayOfString[i] = inputArrayOfString[j];
               inputArrayOfString[j] = tmp;
           }
       }
    }
    return inputArrayOfString;
}

function checkString(getStrings){    
    if ( getStrings.length ) {
        if ( checkSubString(getStrings) ) {
            if (!arrayContainsElement(getStrings, arrayChecked)) {
                arrayChecked.push(getStrings);
            }
            return true;
        } else {
            return false;
        }
       
    }
}

function checkSubString(string){
    for(let i = arrayChecked.length - 1; i >= 0 ; i -= 1) {
        if ( string.includes( arrayChecked[i] ) ) { 
            string = string.replace(arrayChecked[i],"A");
            i++;
        }
    }

    if ( string.length > 1 && (string[0] !== "(" || string[string.length-1] !== ")") ) {       
        console.log("отклонил по причине отсутствия открывающей или закрывающей скобки");
        return false;
    }

    if(string.length === 3 && string[0] === "(") { // отсеивает (A) , но просто А должно проходить
        return false;
    }
    string = removeFirstBrackets(string);

    if(string.length >= 5 ){
        resultTextarea.value = `недопустимая формула "${string}"`;
        return false;
    } else if (string.length === 0){
            resultTextarea.value = `Введите формулу`;
             return false;
    }

    for ( let i = 0; i < string.length; i += 1 ) {
        if (string[0] === "!") { 
            if (string.length === 2 && string[1].match(atom) !== null){
                return true;
            }  else {
                return false;
            }
        } else if (string.length === 4) { 
            if ( (string[1] + string[2]).match(arrow)) {
                return string[0].match(atom) && string[3].match(atom);
            } 
            return false;

        } else if (string .length === 3 ){
            return string[0].match(atom) && string[1].match(operators) && string[2].match(atom);
        } else if (string.length === 1 ) {
            return string.match(atom) !== null;
        }
        return false;
    }
    return false;
}

function removeFirstBrackets(string) {
    if (string[0] === "("){
        string = string.substring(1,string.length);
    }

    if(string[string.length-1] === ")") {
        string = string.substring(0,string.length-1);
    }
    return string;
}

function findAtomCount(string){
    let counter = 0;
    for ( let i = 0; i < arrayChecked.length; i += 1 ) {
        if ( string.includes( arrayChecked[i] ) ) {
            counter++;
            console.log("Подформула в скобках = " + arrayChecked[i]);
        }
    }
    for ( let i = 0; i < string.length; i++ ) {
        let atomic = string[i].match(atom); 
        if ( atomic!== null ) {
            let condition = arrayContainsElement(atomic, arrayChecked);

            if (condition) {
                continue;
            }
            condition = arrayContainsElement(atomic, arrayOfFindAtom)
            if ( condition) {
                continue;
            } else {
                arrayOfFindAtom.push(atomic);
                counter++;
            }
        }
    }
    return counter;
}

function arrayContainsElement(el,array){
    for (let i = 0; i < array.length; i++ ) {
        if ( array[i].toString(10) === (el).toString(10) ) {
            return true;
        }
    }
    return false;
}


function checkAnswer() {

    openBracketsCount = 0;
    openArray = [];
    closeArray = [];

    arrayChecked = [];
    arrayOfFindAtom = [];


    let formula = genResultField.value;
    let userAnswer = parseInt(answerField.value);

    getBracketsFromString(formula);
    allSubStringsIsFormula(formula);
    let correctAnswer = findAtomCount(formula);

    if (correctAnswer === userAnswer) {
        console.log("Правильно");
        resultTextarea.value  = "правильно";
    } else {
        console.log("не правильно");
        resultTextarea.value  = "не правильно";
    }
}


/////////
const binary = ["->", "&", "|", "~"];
const braces = ["(", ")"];
const constant = ["0", "1"];
const symbol = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L",
    "M", "N", "O", "P", "Q", "R", "S", "T", "U", "X", "Y", "Z", "V", "W"];


const nestLimit = 15;
let nest = 0;

function genFormula() {
    nest = 0;
    let c = Math.floor(Math.random() * (nest < nestLimit ? 4 : 2));

    switch (c) {
        case 0:
            return genConst();
        case 1:
            return genSymbol();
        case 2:
            return genBinary();
        case 3:
            return genUnary();
    }
}


// genConst ...
function genConst() {
    return constant[Math.floor(Math.random() * constant.length)];
}

// genSymbol ...
function genSymbol() {
    return symbol[Math.floor(Math.random() * symbol.length)];
}

// genBinary ...
function genBinary() {
    nest++;
    return "(" + genFormula() + binary[Math.floor(Math.random() * binary.length)] + genFormula() + ")"
}

// genUnary ...
function genUnary() {
    nest++;
    return "(!" + genFormula() + ")"
}