function every1(array, test) {
    for (let element of array){
      if(!test(element)){
        return false; 
      }
    }
    return true;
}
  
function every2(array, test) {
    return !array.some(a=> !test(a));
}


console.log(every1([1, 3, 5], n => n < 10));
console.log(every1([2, 4, 16], n => n < 10));
console.log(every1([], n => n < 10));