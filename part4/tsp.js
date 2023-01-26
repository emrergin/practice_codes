import {readFileSync } from "fs";

function formatOne(filename){

    let lines = readFileSync(filename, 'utf-8')
        .split(`\n`).map(b=>b.split(" ")).map(a=>({start:+a[0],end:+a[1],weight:+a[2]}));
    
    let vertices = [...new Set(lines.flatMap(a=>[a.start,a.end]))];
    let n = vertices.length;
    
    const edgeWeights = Array(n).fill().map(() => Array(n));
    lines.forEach(a=>{
        edgeWeights[a.start-1][a.end-1]=a.weight;
        edgeWeights[a.end-1][a.start-1]=a.weight
    });

    bellmanHeldKarp(vertices,edgeWeights);
}

function bellmanHeldKarp(vertices,edgeWeights){
    let n=vertices.length;
    function getAllSubsets(array) {
        const subsets = [new Set([1])];
        for (const el of array) {
            const last = subsets.length - 1;
            for (let i = 0; i <= last; i++) {
                const copySet = structuredClone(subsets[i]).add(el);
                subsets.push(copySet);
            }
        }
        return subsets;
    }
    
    function findIndexOfSet(set,fullArray){
        let result = 0;
    
        for(let i=0;i<fullArray.length;i++){
            if (set.has(fullArray[i])){
                result+=2**(i);
            }
        }
        return result-1;
    }
    
    const allRelatedSubsets = getAllSubsets(vertices.slice(1));
    const fullArray=vertices.slice(1);
    
    let A = Array(2**(n-1)-1).fill().map(() =>  Array(n-1));
    
    for (let j=2; j<=n; j++){
        A[findIndexOfSet(new Set([1,j]),fullArray)][j-1]=edgeWeights[0][j-1];
    }
    
    for (let s=3;s<=n;s++){
        let subsetOfSubsets = allRelatedSubsets.filter(a=>a.size===s);
        for(let subset of subsetOfSubsets){
            const relatedElements = [...subset].filter(a=>a!==1);
            for(let j of relatedElements){
                let minValue = Infinity;
                for(let k of relatedElements){
                    if(k===1 || j===k){continue;}
                    let subsetset = structuredClone(subset);
                    subsetset.delete(j);
                    minValue=Math.min(minValue,A[findIndexOfSet(subsetset,fullArray)][k-1]+edgeWeights[k-1][j-1]);
                }
                A[findIndexOfSet(subset,fullArray)][j-1]=minValue;
            }
        }
    }
    
    let minValue= Infinity;
    for (let j=2; j<=n; j++){
        minValue = Math.min(A[2**(n-1)-2][j-1]+edgeWeights[j-1][0],minValue);
    }
    
    console.log(minValue);
}

formatOne(`tsptest1.txt`);
formatOne(`tsptest2.txt`);

function formatTwo(filename){
    let lines = readFileSync(filename, 'utf-8').split(`\n`).map(b=>b.split(" ").map(Number));
    
    let vertices = Array(lines.length).fill().map((a,index)=>index+1);
    let n = lines.length;

    
    const edgeWeights = Array(n).fill().map(() => Array(n));

    for(let i=0;i<n;i++){
        for(let j=0;j<n;j++){
            edgeWeights[i][j]=euclidean(lines[i][0],lines[i][1],lines[j][0],lines[j][1]);
        }
    }

    bellmanHeldKarp(vertices,edgeWeights);

    function euclidean(x1,y1,x2,y2){
        return Math.sqrt((x1-x2)**2+(y1-y2)**2);
    }
}

formatTwo(`tsptest3.txt`);
formatTwo(`tspinput.txt`);