ok_button = document.getElementById("ok_button");
input_field = document.getElementById("input_field");
result_textarea = document.getElementById("result_textarea");

ok_button.addEventListener("click", () => {
    main();
});


function main(){
    if(!countBrackets(getBracketsFromString(input_field.value))){
        result_textarea.value = "проверь скобки";
    } else {
        result_textarea.value = "";
    }
}

function getBracketsFromString(inputString){
    let bracketsString = "";
    for(let i = 0; i < inputString.length; i += 1) {
        if (inputString[i] === '(' || inputString[i] === ')') {
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