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

    function getNSizedSubsets(array,size){
        let subsets = [];
        let n=2**array.length;
        for(let i=0;i<n;i++){
            let b = i.toString(2).padStart(array.length, '0');        
            let bcodes =b.split("").map(Number);
            if(bcodes.reduce((a,b)=>a+b,0)===size-1){
                // let csubset = array.filter((a,index)=>bcodes[index]===1);
                subsets.push(bcodes);
            }
        }
        return subsets;
    }
    
    function findIndexOfSet(set,fullArray){
        let result = 0;
    
        for(let i=0;i<fullArray.length;i++){
            if (set[i]===1){
                result+=2**(i);
            }
        }
        return result-1;
    }

    const fullArray=vertices.slice(1);
    
    let A = Array(2**(n-1)-1).fill().map(() => Array(n-1));    
    
    for (let j=2; j<=n; j++){
        let Abase = Array(n-1).fill(0);
        Abase[j-2]=1;
        // console.log(Abase,findIndexOfSet(Abase,fullArray))
        A[findIndexOfSet(Abase,fullArray)][j-1]=edgeWeights[0][j-1];
    }

    
    
    for (let s=3;s<=n;s++){
        console.log("current size:",s);
        let subsetOfSubsets = getNSizedSubsets(vertices.slice(1),s);
        
        for(let subset of subsetOfSubsets){
            let nonZeroIndices = subset.map((a,index,arr)=>arr[index]>0?index+2:0).filter(a=>a>0);
            // console.log(nonZeroIndices);
            for(let j of nonZeroIndices){
                // if(j===1){continue;}
                let minValue = Infinity;
                for(let k of nonZeroIndices){
                    if(j===k){continue;}
                    let subsetset = structuredClone(subset);
                    subsetset[j-2]=0;
                    // console.log(subset,subsetset)
                    minValue=Math.min(minValue,A[findIndexOfSet(subsetset,fullArray)][k-1]+edgeWeights[k-1][j-1]);
                }
                A[findIndexOfSet(subset,fullArray)][j-1]=minValue;
            }
        }
    }
    // console.log(A);
    
    let minValue= Infinity;
    for (let j=2; j<=n; j++){
        minValue = Math.min(A[2**(n-1)-2][j-1]+edgeWeights[j-1][0],minValue);
    }
    
    console.log(minValue);
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