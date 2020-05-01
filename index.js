ok_button = document.getElementById("ok_button");
input_field = document.getElementById("input_field");
result_textarea = document.getElementById("result_textarea");

let openBracketsCount = 0;
let openArray = [];
let closeArray = [];

let arrayChecked = [];
let arrayOfFindAtom =[]

let subFormulasCounter = 0;

const atom = /[A-Z0-1]/g;

const operators = /[*|~]/g;
const arrow = /(->)/

ok_button.addEventListener("click", () => {
    main();
});


function main(){

    openBracketsCount = 0;
    openArray = [];
    closeArray = [];

    arrayChecked = [];

    subFormulasCounter = 0;

    let inputString = input_field.value;
    let brackets = getBracketsFromString(inputString);
    if(!countBrackets(brackets)){
        result_textarea.value = "проверь скобки";
        openBracketsCount = 0;
    } else {
        result_textarea.value = "Открывающий скобок = " + openBracketsCount;
        if(checkSpace(inputString)){
            findAllSubStrings(inputString);
            findAllAtom(inputString);
        } else {
            result_textarea.value = "проверь пробелы";
        }
    }
}

 function sortArraysOfString(inputArrayOfString){
     // console.log("length = " + inputArrayOfString.length);
     // console.log("length0 = " + inputArrayOfString[0].length);
     for(let i = 0;i < inputArrayOfString.length; i += 1){
         // console.log("iter i =" + i);
        for(let j = 0; j < inputArrayOfString.length; j += 1) {
            // console.log("iter j =" + i);
            if (inputArrayOfString[i].length >= inputArrayOfString[j].length){
                continue;
            } else if (inputArrayOfString[i].length < inputArrayOfString[j].length) {
                let tmp = inputArrayOfString[i];
                inputArrayOfString[i] = inputArrayOfString[j];
                inputArrayOfString[j] = tmp;
            }
        }
     }
     return inputArrayOfString;

 }

function findAllSubStrings(inputString){
    let subStringsArray = [];

    // console.log("inp Str = " + inputString);
    configurateBraketsPair(inputString)
    
    console.log(openArray);
    console.log(closeArray);
    
    let getFirstFindBracketIndex = Math.min.apply(null,openArray);
    let getLastFindBracketIndex = Math.max.apply(null,closeArray);


    
    if(openArray.length > 0){

        console.log("test consol");
        console.log(getLastFindBracketIndex);
        console.log(getFirstFindBracketIndex);
    
        let difference =  (getLastFindBracketIndex - getFirstFindBracketIndex);
    
        console.log("getLastFindBracketIndex - getFirstFindBracketIndex = " + difference);
    
        console.log("String.length = " + inputString.length);
    
        if ( difference + 1 !== inputString.length){
            result_textarea.value = "все должно находиться внутри скобок";
            return null;
        }

        // console.log("Получилось " + openArray.length);
        // console.log("MAIN");
        for(let i = 0; i < openArray.length;i++) {
            subStringsArray.push(inputString.substring(openArray[i],closeArray[i] + 1));
            // console.log("iter" + i + " subst = " + subStringsArray[i]   )
        }
        console.log("Массив до сортировки = " + subStringsArray);
        subStringsArray = sortArraysOfString(subStringsArray);
        console.log("Массив после сортировки = " + subStringsArray);
        for(let i = 0; i < openArray.length;i++) {
            checkString(subStringsArray[i])
        }

    } else {
        checkString(inputString)

    }
   
}

function configurateBraketsPair(string) {
    let visitedArray = [];

    let tmp = string;
    let indexOpen = -1;
    let indexClose = -1;

    // console.log("tmp  = " + tmp);
    let iteration = 0;
  
    // console.log("ДОЛЖНО " + openBracketsCount);
    let b = false;
    let counterIter = 0;
    for(let i = 0;i <= tmp.length; ){
        // console.log("iter = " + iteration++);
        // console.log("openBracketsCount = " + openBracketsCount);
        if ( !visitedArray.includes(i) && tmp[i] === "(") {
            indexOpen = i;
        }  else if (!visitedArray.includes(i) && tmp[i] === ")"){
            indexClose = i;
        }
        if ( indexOpen !== -1 && indexClose !== -1){

            openArray.push(indexOpen );
            closeArray.push(indexClose );

            visitedArray.push(indexOpen);
            visitedArray.push(indexClose);

            // console.log("Посетили + "  + indexOpen);
            // console.log("Посетили + "  + indexClose);

            indexClose = -1;
            indexOpen = -1;

        }
   
        if (counterIter > 1000) {
            break;
        }
        if (i === tmp.length && openArray.length !== openBracketsCount) {
            i = 0;
            continue;
        }
        i++;
        counterIter++;
       
    }
}

function removeFirstBrackets(string) {
    if (string[0] === "("){
        console.log("remove first bracket");
        string = string.substring(1,string.length);
    }

    if(string[string.length-1] === ")") {
        console.log("remove last bracket");
        string = string.substring(0,string.length-1);
    }
    return string;
}

function findAllAtom(string){
    let counter = 0;
    for(let i = 0; i < arrayChecked.length ; i += 1) {
        if ( string.includes( arrayChecked[i] ) ) {
            counter++;
        }
    }
    for(let i = 0; i < string.length;i++ ) {
        let atomic = string[i].match(atom); 
        if (atomic!== null) {
            console.log("atomic = " + atomic);
            if ( arrayOfFindAtom.indexOf(atomic) !== -1 ) {
                console.log("уже был");
            } else {
                arrayOfFindAtom.push(atomic);
                counter++;
            }
            
        }
    }
    console.log("Насчитали " + counter );
    result_textarea.value += " Найдено " + counter + " подформул"
}

function checkSubString(string){
    // let tmp_length = tmp[0].length 
    console.log("type = " + typeof string);
    console.log("Проверяем строку " + string);

    for(let i = arrayChecked.length - 1; i >= 0 ; i -= 1) {
        if ( string.includes( arrayChecked[i] ) ) {
            console.log("include " + arrayChecked[i]);
            let firsFindIndex = string.indexOf(arrayChecked[i]);
            console.log(firsFindIndex);
            console.log(firsFindIndex + arrayChecked[i].length);
            
     

            string = string.replace(arrayChecked[i],"A");
        }
    }

   //
   // тут часть с заменой части стро
   //

   console.log("теперь строка =" + string);
    if (string.length > 1 && (string[0] !== "(" || string[string.length-1] !== ")")){       
        console.log("отклонил по причине отсутствия открывающей или закрывающей скобки");
        return false;
    }
    console.log(string.length);
    console.log(string);

    if(string.length === 3 && string[0] === "(") { // отсеивает (A) , но просто А должно проходить
        return false;
    }
    console.log("до удаления скобок строка = " + string);
    string = removeFirstBrackets(string);
    console.log("После удаления скобок строка = " + string);


    console.log("tut1");
    if(string.length >= 5 ){ // условие хорошо будет работать, если будет хорошо работать часть с заменой подстрок на буквы
        result_textarea.value = `недопустимая формула "${string}"`;
        console.log("отклонили, ибо слишком большая");
        return false;
    } else if (string === 0){
            result_textarea.value = `Введите формулу`;
            console.log("нету формулы");
             return false;
    }



    for(let i = 0; i < string.length; i += 1 ) {
        if (string[0] === "!") { // не 
            if (string.length === 2 && string[1].match(atom) !== null){
            
                console.log("ОТРИЦАНИЕ ВЕРНО");
                return true;
            }  else {
               
                console.log("ОТРИЦАНИЕ НЕ ВЕРНО");
                console.log(string);
                console.log(string.length);
                console.log(string[1]);
                return false;
            }
        } else if (string.length === 4) { // условие со стрелой
            if ( (string[1] + string[2]).match(arrow)) {
                console.log("СТРЕЛА");
                console.log(string[0].match(atom) && string[3].match(atom));
                return string[0].match(atom) && string[3].match(atom);
            } 
            return false;

        } else if (string .length === 3 ){ // обычная формула

            console.log("Обычная = ");
            console.log(string[0].match(atom)!==null && string[1].match(operators)!==null && string[2].match(atom)!==null)
            return string[0].match(atom) && string[1].match(operators) && string[2].match(atom);
        } else if (string.length === 1 ) {
            return string.match(atom) !== null;
        }
        console.log("Попала в отрицание без объяснений");
        return false;
    }

    return false;
}

function checkString(getStrings){
    console.log(typeof(getStrings));
    let tmp = getStrings;
    
    console.log("начинаем проверку подстроки:" + getStrings);
    console.log("tmp.length = " + tmp.length);
    console.log(tmp);
    if (tmp.length){
        // tmp[0] = getStrings;
        // console.log("Длина = " + tmp[0].length);
        console.log("Длина2 = " + getStrings.length);
        //console.log(tmp[0]);
        console.log(getStrings);

        if(checkSubString(tmp)) {
            console.log("tut2");
            result_textarea.value = "Строка является формулой. Количество формул = " + ++subFormulasCounter;
            console.log("Занесем это в просмотренное" + tmp);
            arrayChecked.push(tmp);
            return true;
        } else {
            console.log("tut4");
            result_textarea.value = "Строка не является формулой.";
            return false;
        }
       
    }
    // tmp = getStrings;
    // for(let i = 0; i < tmp.length;i++){
    //     console.log("получили строку: " + tmp[i]);
    //     if (i > 0) { // тут проверка на вхождения 
    //         console.log("tut3");
    //         if(checkSubString(tmp[i])){
    //             result_textarea.value = "Строка является формулой. Количество формул = " + ++subFormulasCounter;
    //         } else {
    //             result_textarea.value = "Строка не является формулой. Количество формул = " + ++subFormulasCounter;
    //         }
    //     }


    // }


}

function checkSpace(string){
    console.log("проверка на пробелы");
    for(let i = 0; i < string.length; i += 1 ) {
        if(string[i] === " ") {
            console.log("найден пробел по индексу: " + i);
            return false;
        }
    }
    return true;
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
