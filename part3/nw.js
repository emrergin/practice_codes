import {readFileSync } from "fs";

let lines = readFileSync(`nw.txt`,'utf-8')
                .split(`\n`);

const [lengthX,lengthY]=lines[0].split(" ").map(Number);
const [penaltyGap,penaltyMismatch]=lines[1].split(" ").map(Number);
const [stringX,stringY] = [lines[2],lines[3]];

const A=Array.from(Array(lengthX+1), () => new Array(lengthY+1));

for(let c=0;c<=lengthX;c++){
    A[c][0]=c*penaltyGap;
}

for(let c=0;c<=lengthY;c++){
    A[0][c]=c*penaltyGap;
}

for (let i=1;i<=lengthX;i++){
    for(let j=1;j<=lengthY;j++){
        A[i][j]=Math.min(A[i-1][j-1]+penalty(i,j),A[i-1][j]+penaltyGap,A[i][j-1]+penaltyGap);
    }
}

function penalty(i,j){
    if (stringX[i]===stringY[j]){return 0;}
    else{
        return penaltyMismatch;
    }
}

console.log(A[lengthX][lengthY]);
