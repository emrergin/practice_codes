import {readFileSync } from "fs";

let edgesMap = new Map();
// let edges = readFileSync(`floyd_test.txt`,'utf-8')
// let edges = readFileSync(`floyd_test2.txt`,'utf-8')
let edges = readFileSync(`floyd_challenge3.txt`,'utf-8')
                .split(`\n`).map(b=>b.split(" ")).map(a=>({start:+a[0],end:+a[1],weight:+a[2]}));



let vertices = [...new Set(edges.flatMap(a=>[a.start,a.end]))];
let n = vertices.length;
const edgeWeights = Array(n).fill().map(() => Array(n));

edges.forEach(a=>edgeWeights[a.start-1][a.end-1]=a.weight);
const A= Array(n+1).fill().map(() => Array(n).fill().map(() => new Int16Array(n)));

for(let v=0;v<n;v++){
    for(let w=0;w<n;w++){
        if(v===w){
            A[0][v][w]=0;
        }else{
            // const relatedWeight = edgesMap.get(`${v+1}-${w+1}`);
            const relatedWeight = edgeWeights[v][w];
            if (relatedWeight!==undefined){
                A[0][v][w]=relatedWeight;
            }
            else{
                A[0][v][w]=32767;
            }
        }
    }
}
for (let k=1;k<=n;k++){
    for(let v=0;v<n;v++){
        for(let w=0;w<n;w++){
            A[k][v][w]=Math.min(A[k-1][v][w],Math.max(-32767,A[k-1][v][k-1]+A[k-1][k-1][w]));
        }
    }
}

let isResultValid=true;
for(let v=0;v<n;v++){
    if(A[n][v][v]<0){
        console.log("negative cycle!");
        isResultValid=false;
        break;
    }
}
if(isResultValid){

    // console.log(A[n]);
    let minimumWeight = 32767;
    for(let v=0;v<n;v++){
        for(let w=0;w<n;w++){
            minimumWeight = Math.min(minimumWeight,A[n][v][w]);
        }
    }
    console.log(minimumWeight);
}