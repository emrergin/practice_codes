function isEven(num){
    if (num===0){return true;}
    if (num===1){return false;}

    return isEven(num-2>=0 ? num-2 : num+2);
}

console.log(isEven(50))
console.log(isEven(75))
console.log(isEven(-1))