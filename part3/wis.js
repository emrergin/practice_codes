import {readFileSync } from "fs";

let lines = readFileSync(`problem16.6.txt`, 'utf-8').split(`\n`).map(a=>+a);
console.log(lines)

const test =[
    280,
    618,
    762,
    908,
    409,
    34,
    312,
    277,
    246,
    779
];

function wisWeight(arr){
    let A=[];
    A[0]=0;
    A[1]=arr[0];

    let size = arr.length;

    for(let i=2;i<size+1;i++){
        A[i]=Math.max(A[i-1],A[i-2]+arr[i-1]);
    }

    return A;
}

function wisMembers(wis,arr)
{
    const setOfNodes = new Set();
    let i=arr.length;

    while(i>=1){
        if(wis[i-1]>=wis[i-2]+arr[i-1]){
            i=i-1;
        }
        else{
            setOfNodes.add(i);
            i=i-2;
        }
    }
    if(i===1){
        setOfNodes.add(i);
    }

    return setOfNodes;
}

let weightArray = wisWeight(test);
console.log(weightArray[weightArray.length-1]);
console.log(wisMembers(weightArray,test));

let weightArray2 = wisWeight(lines);
console.log(weightArray2[weightArray2.length-1]);
console.log(wisMembers(weightArray2,lines));