import {readFileSync } from "fs";

let test = readFileSync(`problem16.7.test.txt`, 'utf-8').split(`\n`).map(a=>a.split(` `).map(b=>+b));
let challenge = readFileSync(`problem16.7.txt`, 'utf-8').split(`\n`).map(a=>a.split(` `).map(b=>+b));

const test2 = [
    [3,4],
    [2,3],
    [4,2],
    [4,3]
]

function knapsackWeights(arr,C){
    const A=Array.from(Array(arr.length+1), () => new Array(C+1));
    let size = arr.length;
    
    for(let c=0;c<=C;c++){
        A[0][c]=0;
    }

    for (let i=1;i<size+1;i++){
        for(let c=0;c<=C;c++){
            if (arr[i-1][1]>c){
                A[i][c]=A[i-1][c];
            }
            else{
                A[i][c]=Math.max(A[i-1][c],A[i-1][c-arr[i-1][1]]+arr[i-1][0])
            }
        }
    }

    console.log(A[size][C]);
}

function knapsackWeightsWithCache(arr,C){
    let size = arr.length;

    const importantPoints =[];

    importantPoints.push([{start:0,value:0}]);

    for (let i=1;i<size+1;i++){
        let newImportantPoints=[];
        newImportantPoints.push({start:0,value:0});
        for(let c=1;c<=C;c++){
            
            let lastImportantPoint = newImportantPoints[newImportantPoints.length-1];
            let [v1,v2] = getRelevantImportantPoint(c,arr[i-1][1],arr[i-1][0],importantPoints[i-1]);

            if(Math.max(v1,v2)>lastImportantPoint.value){
                newImportantPoints.push({start:c,value:Math.max(v1,v2)})
            }
        }
        importantPoints.push(newImportantPoints);
    }
    console.log(importantPoints.pop().pop().value);
}


// knapsackWeightsWithCache(challenge,2000000);
knapsackWeightsWithCache(test,10000);
knapsackWeightsWithCache(test2,6);


function getRelevantImportantPoint(w1,minus,plus,aaa){
    const size = aaa.length;
    let v1,v2;
    for(let i=size-1;i>=0;i--){
        if(aaa[i].start<=w1 && v1===undefined){
            v1=aaa[i].value;
            if(w1-minus<0){
                break;
            }
        }
        if(aaa[i].start<=w1-minus){
            v2=aaa[i].value+plus;
            break;
        }
    }
    return [(v1||0),(v2||0)];
}