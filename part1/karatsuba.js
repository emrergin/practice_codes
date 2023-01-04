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
	let strNum=num.toString();
	let second=strNum.slice(-cOff)||0;
	let first=strNum.slice(0,-cOff) ||0;
	return [BigInt(first),BigInt(second)];
}



function karatsuba2(x,y){
	const karatsubaStack = [];
	const karatsubaSolution = new Map();	
	
	new karatsubaCall(x,y);
	
	while(karatsubaStack.length>0){
		
		let currentX=karatsubaStack[karatsubaStack.length-1].x;
		let currentY=karatsubaStack[karatsubaStack.length-1].y;
		let numberofDigits=Math.max(currentX.toString().length,currentY.toString().length);
		
		if (numberofDigits%2!==0){
			numberofDigits++;
		}
		let cutOffPoint = (numberofDigits)/2;
		
		let [a,b]=extract12String(currentX,cutOffPoint);
		let [c,d]=extract12String(currentY,cutOffPoint);	
		
		let ac = karatsubaSolution.get(`${a}*${c}`);
		let bd = karatsubaSolution.get(`${b}*${d}`);
		let abcd = karatsubaSolution.get(`${a+b}*${c+d}`);
		
		if (ac!==undefined && bd!==undefined && abcd!==undefined){
			let adbc = abcd-ac-bd;		
			let result = BigInt((10**numberofDigits))*ac+bd+BigInt((10**(cutOffPoint)))*adbc;
			karatsubaSolution.set(`${currentX}*${currentY}`,result);
			karatsubaSolution.set(`${currentY}*${currentX}`,result);
			karatsubaStack.pop();
		}
		else{
			if (ac===undefined){
				karatsubaCall(a,c);
			}
			if (bd===undefined){
				karatsubaCall(b,d);
			}
			if (abcd===undefined){
				karatsubaCall(a+b,c+d);
			}
		}
	}

	
	return (karatsubaSolution.get(`${x}*${y}`));
	
	function karatsubaCall(x,y){
		const newCall = {x,y};
		if (newCall.x.toString().length!==1 || newCall.y.toString().length!==1){karatsubaStack.push(newCall)}
		else{
			karatsubaSolution.set(`${newCall.x}*${newCall.y}`,BigInt(newCall.x)*BigInt(newCall.y));
			karatsubaSolution.set(`${newCall.y}*${newCall.x}`,BigInt(newCall.x)*BigInt(newCall.y));
		}
	}
}



