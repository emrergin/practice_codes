import {readFileSync } from "fs";

let edges = readFileSync(`floyd_challenge4.txt`,'utf-8')
                .split(`\n`).map(b=>b.split(" ")).map(a=>({start:+a[0],end:+a[1],weight:+a[2]}));


let n = [...new Set(edges.flatMap(a=>[a.start,a.end]))].length;

const edgeWeights = Array(n).fill().map(() => new Int8Array(n).fill(-128));

edges.forEach(a=>edgeWeights[a.start-1][a.end-1]=a.weight);

let A_k_1 = Array(n).fill().map(() =>  new Int16Array(n));
let A_k = Array(n).fill().map(() =>  new Int16Array(n));


for(let v=0;v<n;v++){
    for(let w=0;w<n;w++){
        if(v===w){
            A_k_1[v][w]=0;
        }else{
            const relatedWeight = edgeWeights[v][w];
            if (relatedWeight!==-128){
                A_k_1[v][w]=relatedWeight;
            }
            else{
                A_k_1[v][w]=32767;
            }
        }
    }
}
for (let k=1;k<n+1;k++){
    console.log(k);
    for(let v=0;v<n;v++){
        for(let w=0;w<n;w++){
            A_k[v][w]=Math.max(-32768,Math.min(A_k_1[v][w],A_k_1[v][k-1]+A_k_1[k-1][w],32767));
        }
    }
    A_k_1=A_k;
}

let isResultValid=true;

for(let v=0;v<n;v++){
    if(A_k[v][v]<0){
        console.log("negative cycle!");
        isResultValid=false;
        break;
    }
}

if(isResultValid){

    let minimumWeight = 32767;
    for(let v=0;v<n;v++){
        for(let w=0;w<n;w++){
            minimumWeight = Math.min(minimumWeight,A_k[v][w]);
        }
    }
    console.log(minimumWeight);
}