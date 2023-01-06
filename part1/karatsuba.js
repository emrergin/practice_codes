function karatsuba(x,y){
	if (0<=x && x<10 && 0<=y && y<10){return x*y}
	else{
		let numberofDigits=Math.min(x,y).toString().length;
		if (numberofDigits%2!==0){numberofDigits++;}
		let cutOffPoint = (numberofDigits/2);
		
		let [a,b]=extract12(x,cutOffPoint);
		let [c,d]=extract12(y,cutOffPoint);		

		
		let ac = karatsuba(a,c);
		let bd = karatsuba(b,d);
		let adbc = karatsuba(a+b,c+d)-ac-bd;
		return (10**numberofDigits)*ac+bd+(10**(cutOffPoint))*adbc;
	}
}

function extract12(num,cOff){
	let strNum=num.toString();
	let second=Number(strNum.slice(-cOff));
	let first=Number(strNum.slice(0,-cOff) ||0);
	return [first,second];
}

