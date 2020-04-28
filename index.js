ok_button = document.getElementById("ok_button");
input_field = document.getElementById("input_field");
result_textarea = document.getElementById("result_textarea");

let openBracketsCount = 0;

ok_button.addEventListener("click", () => {
    main();
});


function main(){
    let inputString = input_field.value;
    // inputString = inputString.replace(/\s+/g,'');
    if(!countBrackets(getBracketsFromString(inputString))){
        result_textarea.value = "проверь скобки";
        openBracketsCount = 0;
    } else {
        result_textarea.value = "Открывающий скобок = " + openBracketsCount;
        console.log("ipnut before = " + inputString);
        findAllSubStrings(inputString);
        console.log("ipnut after = " + inputString);
    }
}

function findAllSubStrings(inputString){

    // 

    let subStringsArray = [];

    let openBracketIndexArray = [];
    let closeBracketIndexArray = [];

    let indexOfOpenBracket = inputString.indexOf("(");
    while (indexOfOpenBracket != -1) {
        openBracketIndexArray.push(indexOfOpenBracket);
        indexOfOpenBracket = inputString.indexOf("(", indexOfOpenBracket + 1);
    }

    let indexOfCloseBracket = inputString.indexOf(")");
    while (indexOfCloseBracket != -1) {
        closeBracketIndexArray.push(indexOfCloseBracket);
        indexOfCloseBracket = inputString.indexOf(")", indexOfCloseBracket + 1);
    }
    // console.log(openBracketsCount);
    console.log(closeBracketIndexArray[0]);
    console.log(closeBracketIndexArray[1]);
    // for(let i = 0; i < openBracketsCount;i++) {
        
    //     console.log("iter" + i + " openBracketIndex = " + openBracketIndexArray[i] + " closeBracketIndex = " + closeBracketIndexArray[ (openBracketsCount - 1) - i]);
    // }
    // let csBracketsArrLength = closeBracketIndexArray.length;

     for(let i = 0; i < openBracketsCount;i++) {
        let closeBracketIndex = (openBracketsCount - 1) - i;
         //console.log("num = " + (csBracketsArrLength - 1));
         console.log("iter" + i + " openBracketIndex = " + openBracketIndexArray[i] + " closeBracketIndex = " + closeBracketIndexArray[closeBracketIndex]);
         if ( closeBracketIndexArray[closeBracketIndex] - openBracketIndexArray[i] === 1 ) {
             result_textarea.value = "!!ОШИБКА (пустая строка) " + "iter" + i + " openBracketIndex = " + openBracketIndexArray[i] + " closeBracketIndex = " + closeBracketIndexArray[closeBracketIndex];
         } else {
             subStringsArray.push(inputString.substring(openBracketIndexArray[i] + 1,closeBracketIndexArray[closeBracketIndex]));
             console.log("iter" + i + " subst = " + subStringsArray[i]   );
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
              ArrBrackets.push(str[i]);
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