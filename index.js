ok_button = document.getElementById("ok_button");
input_field = document.getElementById("input_field");
result_textarea = document.getElementById("result_textarea");

let openBracketsCount = 0;
let openArray = [];
let closeArray = [];
let arrayOfBracketsIndex = [];

ok_button.addEventListener("click", () => {
    main();
});


function main(){
    let inputString = input_field.value;
    // inputString = inputString.replace(/\s+/g,'');
    let brackets = getBracketsFromString(inputString);
    if(!countBrackets(brackets)){
        result_textarea.value = "проверь скобки";
        openBracketsCount = 0;
    } else {
        result_textarea.value = "Открывающий скобок = " + openBracketsCount;
        // configurateBraketsPair((inputString.replace(/\s+/g,''),0));
       
        findAllSubStrings(inputString);
    }
}

function findAllSubStrings(inputString){
    let subStringsArray = [];

    let openBracketIndexArray = [];
    let closeBracketIndexArray = [];

    console.log("inp Str = " + inputString);
    for ( let i = 0; i < arrayOfBracketsIndex.length; i += 1 ) {
        // console.log("index" + i +  " = " + arrayOfBracketsIndex[i]);
    }


      configurateBraketsPair(inputString)
    
    console.log("inp Str = " + inputString);

    console.log("Получилось " + openArray.length);
     for ( let i = 0; i < openArray.length; i += 1 ) {
        console.log("pair" + i +  " = " + openArray[i] +" " + closeArray[i]);
    }
    console.log("MAIN");
    for(let i = 0; i < openArray.length;i++) {
        subStringsArray.push(inputString.substring(openArray[i],closeArray[i] + 1));
        console.log("iter" + i + " subst = " + subStringsArray[i]   );
    }
    

 
}

function configurateBraketsPair(string) {
    let visitedArray = [];// будет хронить посещенные индексы

    let tmp = string;
    let indexOpen = -1;
    let indexClose = -1;

    console.log("tmp  = " + tmp);
    let iteration = 0;
    // while(visitedArray.length/2 !== openBracketsCount){\
    console.log("ДОЛЖНО " + openBracketsCount);
    let b = false;
    for(let i = 0;i <= tmp.length; ){
        console.log("iter = " + iteration++);
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

            console.log("Посетили + "  + indexOpen);
            console.log("Посетили + "  + indexClose);

            indexClose = -1;
            indexOpen = -1;

        }
   
        if (i === tmp.length && openArray.length !== openBracketsCount) {
            i = 0;
            // b = true;
            continue;
        }
        i++;
       
    }
    console.log("VISITED ARRAY");
    for(let i =0;i < visitedArray.length;i++ ){
        console.log(visitedArray[i]);
    }
  


}

/*function findAllSubStrings(inputString){

    // 
    let subStringsArray = [];

    let openBracketIndexArray = [];
    let closeBracketIndexArray = [];

   //  let indexOfOpenBracket = inputString.indexOf("(");
    for (let i = 0; i <= inputString.length; i+= 1) {
        if (inputString[i] === "("){
            openBracketIndexArray.push(i);
        } 
         if (inputString[ inputString.length -1 - i] === ")") {
             closeBracketIndexArray.unshift(i);
         }
    }

/// эта чать работает не правильно
    // while (indexOfOpenBracket != -1) {
    //     openBracketIndexArray.push(indexOfOpenBracket);
    //     indexOfOpenBracket = inputString.indexOf("(", indexOfOpenBracket + 1);
    // }

    // let indexOfCloseBracket = inputString.lastIndexOf(")");
    // while (indexOfCloseBracket != -1) {
    //     closeBracketIndexArray.push(indexOfCloseBracket);
    //     indexOfCloseBracket = inputString.indexOf(")", indexOfCloseBracket + 1);
    // }
///
    // console.log(openBracketsCount);
    //console.log(closeBracketIndexArray[0]);
    //console.log(closeBracketIndexArray[1]);
    // for(let i = 0; i < openBracketsCount;i++) {
        
    //     console.log("iter" + i + " openBracketIndex = " + openBracketIndexArray[i] + " closeBracketIndex = " + closeBracketIndexArray[ (openBracketsCount - 1) - i]);
    // }
    // let csBracketsArrLength = closeBracketIndexArray.length;

     for(let i = 0; i < openBracketsCount;i++) {
        let closeBracketIndex = (openBracketsCount - 1) - i;
        // let closeBracketIndex = i;
        //closeBracketIndex = (openBracketsCount) - i;
         //console.log("num = " + (csBracketsArrLength - 1));
         console.log("iter" + i + " openBracketIndex = " + openBracketIndexArray[i] + " closeBracketIndex = " + closeBracketIndexArray[closeBracketIndex]);
         if ( closeBracketIndexArray[closeBracketIndex] - openBracketIndexArray[i] === 1 ) {
             result_textarea.value = "!!ОШИБКА (пустая строка) " + "iter" + i + " openBracketIndex = " + openBracketIndexArray[i] + " closeBracketIndex = " + closeBracketIndexArray[closeBracketIndex];
         } else {
             subStringsArray.push(inputString.substring(openBracketIndexArray[i],closeBracketIndexArray[closeBracketIndex] + 1));
             console.log("iter" + i + " subst = " + subStringsArray[i]   );
         }
     }
     for ( let i = subStringsArray.length - 1; i >=0; i -= 1 ) {
        checkSubstring(subStringsArray[i]);

     }
}*/

function checkSubstring(string){
    console.log("начинаем проверку подстроки:" + string);
    if ( checkSpace(string) ) {
        console.log("ПРОВЕРКА НА ПРОБЕЛ ПРОЙДЕНА")
    }

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
            arrayOfBracketsIndex.push(i);
            bracketsString += inputString[i];
            openBracketsCount += 1;

        } else if ( inputString[i] === ')'){
             arrayOfBracketsIndex.push(i);
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
