import {readFileSync } from "fs";
import UnionFind from './UnionFind.js'

let lines = readFileSync(`clustering_big.txt`, 'utf-8')
                .split(/\r?\n/).map((a) => a.trim().split(` `).map(b=>+b));


export function clustering(G,num){
    let numberOfEdges=0;
   
    const U = new UnionFind();
    U.initialize(getInterval(1,num));

    let index=0;
    for (let i=1;i<=num;i++){
        for (let j=i+1;j<=num;j++){
            index++;
            index%10000000===0?console.log(index):false;
            if((hammingDistance(G[i-1],G[j-1])<3)&&(U.find(i-1)!==U.find(j-1))){
                U.union(i-1,j-1);
                numberOfEdges++;
            }
        }
    }

    console.log(num-numberOfEdges);
}

function hammingDistance(arr1,arr2){
    let distance=0;
    for(let i=0;i<arr1.length;i++){
        distance+=Math.abs(arr1[i]-arr2[i]);
    }
    return distance;
}

function getInterval(start,end){
	return Array.from({length:end-start+1},(a,index)=>start+index);
}	

clustering(lines,200000);
