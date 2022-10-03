function range(start,end,step=1){
	let result=[];
	if (step>0){
		for (let i=start;i<end+1;i+=step){
			result.push(i);
		}	
	}else{
		for (let i=start;i>end-1;i+=step){
			result.push(i);
		}	
	}
	return result;
}

function sum(array){
	let result=0;
	for (let value of array){
		result+= +value;
	}
	return result;
}

console.log(range(1, 10));
console.log(range(5, 2, -1));
console.log(sum(range(1, 10)));