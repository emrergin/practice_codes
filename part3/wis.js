import {readFileSync } from "fs";

let lines = readFileSync(`problem16.6.txt`, 'utf-8').split(`\n`).map(a=>+a);

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
let weightArray2 = wisWeight(lines);
const members = wisMembers(weightArray2,lines);

console.log([1,2, 3, 4, 17, 117, 517,997].map(a=>members.has(a)))