import {readFileSync } from "fs";

let lines = readFileSync(`2sum.txt`,'utf-8')
                .split(`\n`).map(a=>+a.trim());


function getInterval(start,end){
	return Array.from({length:end-start+1},(a,index)=>start+index);
}				

const interval=getInterval(-10000,10000);

const S = new Set();
for (let num of lines){
    S.add(num);
}

let counter =0;
for (let tar of interval){
	if (twoSum(lines,tar,S)){counter++;}
}

console.log(counter);

function twoSum(array,target){    
	
    for (let num of array){
        if (S.has(target-num) && (target!== 2*num)){
            return true;
        }
    }
    return false;
}