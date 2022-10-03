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

function extract12String(num,cOff){
	let second=num.slice(-cOff)||0;
	let first=num.slice(0,-cOff) ||0;
	return [first,second];
}



function karatsuba2(x,y){
	const karatsubaStack = [];
	const karatsubaSolution = new Map();	
	
	new KaratsubaCall(x,y);
	let counter=0;
	
	while(karatsubaStack.length>0){
		let currentX=karatsubaStack[karatsubaStack.length-1].x;
		let currentY=karatsubaStack[karatsubaStack.length-1].y;
		
		let numberofDigits=Math.min(currentX.length,currentY.length);
		let converterToUse = numberofDigits>16 ? BigInt : Number;
		if (numberofDigits%2!==0){numberofDigits++;}
		let cutOffPoint = (numberofDigits/2);
		
		let [a,b]=extract12String(currentX,cutOffPoint);
		let [c,d]=extract12String(currentY,cutOffPoint);	
		
		let ac = karatsubaSolution.get(`${a}*${c}`);
		let bd = karatsubaSolution.get(`${b}*${d}`);
		let abcd = karatsubaSolution.get(`${converterToUse(a)+converterToUse(b)}*${converterToUse(c)+converterToUse(d)}`);
		
		if (ac!==undefined && bd!==undefined && abcd!==undefined){
			let adbc = abcd-ac-bd;		
			let result = (10**numberofDigits)*ac+bd+(10**(cutOffPoint))*adbc;
			karatsubaSolution.set(`${currentX}*${currentY}`,result);
			karatsubaSolution.set(`${currentY}*${currentX}`,result);
			karatsubaStack.pop();
		}
		else{
			if (ac===undefined){
				new KaratsubaCall(a,c);
			}
			if (bd===undefined){
				new KaratsubaCall(b,d);
			}
			if (abcd===undefined){
				new KaratsubaCall(converterToUse(a)+converterToUse(b),converterToUse(c)+converterToUse(d));
			}
		}
	}
	
	return (karatsubaSolution.get(`${x}*${y}`));
	
	function KaratsubaCall(x,y){
		this.x=x.toString();
		this.y=y.toString();
		if (x.length!==1 || y.length!==1){karatsubaStack.push(this)}
		else{
			karatsubaSolution.set(`${x}*${y}`,Number(x)*Number(y));
			karatsubaSolution.set(`${y}*${x}`,Number(x)*Number(y));
		}
	}
}
console.log(karatsuba2(`3141592653589793238462643383279502884197169399375105820974944592`,`2718281828459045235360287471352662497757247093699959574966967627`));
