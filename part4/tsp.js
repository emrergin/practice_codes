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
    
    // let A_k_1 = Array(2**(n-1)-1).fill().map(() => Array(n-1));    
    // let A_k = Array(2**(n-1)-1).fill().map(() => Array(n-1));
    let A_k_1 = [];    
    let A_k = [];
    
    for (let j=2; j<=n; j++){
        let aBase = new Int8Array(n-1);
        aBase[j-2]=1;
        let currentSubsetIndex=findIndexOfSet(aBase,n);
        if(A_k_1[currentSubsetIndex]===undefined){A_k_1[currentSubsetIndex]=Array(n-1);}
        A_k_1[currentSubsetIndex][j-1]=edgeWeights[0][j-1];
    }
    
    for (let s=3;s<=n;s++){
        console.log("current size:",s);
        let subsetOfSubsets = getNSizedSubsets(n,s);
        
        for(let subset of subsetOfSubsets){
            for(let j=2;j<=n;j++){                
                if(subset[j-2]===0){continue;}
                let minValue = Infinity;
                for(let k=2;k<=n;k++){
                    if(subset[k-2]===0){continue;}
                    if(j===k){continue;}
                    let subsetset = structuredClone(subset);
                    subsetset[j-2]=0;
                    minValue=Math.min(minValue,A_k_1[findIndexOfSet(subsetset,n)][k-1]+edgeWeights[k-1][j-1]);
                }
                let currentSubsetIndex= findIndexOfSet(subset,n);
                if(A_k[currentSubsetIndex]===undefined){A_k[currentSubsetIndex]=Array(n-1);}
                A_k[currentSubsetIndex][j-1]=minValue;
            }
        }
        A_k_1=A_k;
    }
    
    let minValue= Infinity;
    for (let j=2; j<=n; j++){
        minValue = Math.min(A_k[2**(n-1)-2][j-1]+edgeWeights[j-1][0],minValue);        
    }
    
    console.log(minValue);

    function findIndexOfSet(set,len){
        let result = 0;
    
        for(let i=0;i<len;i++){
            if (set[i]===1){
                result+=2**(i);
            }
        }
        return result-1;
    }


    function getNSizedSubsets(num,size){
        let subsets = [];
        let nn=2**(num-1);
        for(let i=0;i<nn;i++){
            let b = i.toString(2).padStart(num-1, '0');        
            let bcodes =b.split("").map(Number);
            if(bcodes.reduce((a,b)=>a+b,0)===size-1){
                subsets.push(new Int8Array(bcodes));
            }
        }
        return subsets;
    }   
}

// formatOne(`tsptest1.txt`);
// formatOne(`tsptest2.txt`);

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
        return Math.hypot((x1-x2),(y1-y2));
    }
}

// formatTwo(`tsptest3.txt`);
formatTwo(`tspinput.txt`);