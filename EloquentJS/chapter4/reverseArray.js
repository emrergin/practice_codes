function reverseArray(array){
	const result=[];
		for (let i=array.length-1;i>=0;i--){
			result.push(array[i]);
		}	
	return (result);
}


function reverseArrayInPlace(array){
	for (let i=0;i<=array.length/2;i++){
        [array[i],array[array.length-1-i]]=[array[array.length-1-i],array[i]];
	}
}

console.log(reverseArray(["A", "B", "C"]));
let arrayValue = [1, 2, 3, 4, 5];
reverseArrayInPlace(arrayValue);
console.log(arrayValue);