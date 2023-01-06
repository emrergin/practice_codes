function splitIntoTwo(num,cutOff){
    const strNum = num.toString();
    const first = strNum.slice(0,-cutOff);
    const second = strNum.slice(-cutOff);
    return [BigInt(first),BigInt(second)];
}

function karatsubaMultiply(x,y){
    const resultsMap =  new Map();
    const kStack = [];

    karatsubaCall(x,y);
    const valuesWithNoError={x:0,y:0};
    while(kStack.length>0){
        let currentX = kStack[kStack.length-1].x;
        let currentY = kStack[kStack.length-1].y;
        
        let relatedLength=Math.max(currentX.toString().length,currentY.toString().length);
        if(relatedLength%2!==0){relatedLength++;}
        const cutOff = (relatedLength/2);                 
        const [a,b] = splitIntoTwo(currentX,cutOff);
        const [c,d] = splitIntoTwo(currentY,cutOff);

        const ac=resultsMap.get(`${a}*${c}`);
        const bd=resultsMap.get(`${b}*${d}`);
        const abcd=resultsMap.get(`${a+b}*${c+d}`);

        if(ac!==undefined&&bd!==undefined&&abcd!==undefined){
            const adbc = abcd - ac - bd;
            const localResult = BigInt(10)**BigInt(relatedLength)*ac+BigInt(10)**BigInt(cutOff)*adbc+bd;
            resultsMap.set(`${currentX}*${currentY}`,localResult);
            resultsMap.set(`${currentY}*${currentX}`,localResult);
            if(localResult>currentX*currentY){
                console.log(currentX,currentY);
                console.log(adbc,ac,bd);
                break;
            }
            kStack.pop();
        }
        else{
            if(ac===undefined){
                karatsubaCall(a,c);
            }
            if(bd===undefined){
                karatsubaCall(b,d);
            }
            if(abcd===undefined){
                karatsubaCall(a+b,c+d);
            }
        }
    }
    console.log(valuesWithNoError);
    return(resultsMap.get(`${x}*${y}`));

    function karatsubaCall(x,y){
        if(x.toString().length===1 && y.toString().length===1){
            resultsMap.set(`${x}*${y}`,x*y);
            resultsMap.set(`${y}*${x}`,x*y);
        }
        else{
            kStack.push({x,y});
        }
    }
}