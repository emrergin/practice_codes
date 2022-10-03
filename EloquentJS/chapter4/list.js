function arrayToList(array){
	let list=null;
	for (let i=array.length-1;i>=0;i--){
		list={value:array[i], rest:list};
	}
	return list;
}

function listToArray(list){
	let result=[];
	while (list){
		result.push(list.value);
		list=list.rest;
	}
	return result;
}

function prepend(number,list){
	let newList={value:number, rest:list};
	return newList;
}

function nth(list,number){
	if (number===0){
		return list.value;
	}
	else
	{
		number--;
		return nth(list.rest,number);
	}
}

console.log(arrayToList([10, 20]));
console.log(listToArray(arrayToList([10, 20, 30])));
console.log(prepend(10, prepend(20, null)));
console.log(nth(arrayToList([10, 20, 30]), 1));