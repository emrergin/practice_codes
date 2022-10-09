import {readFileSync } from "fs";

let test = readFileSync(`problem16.7.test.txt`, 'utf-8').split(`\n`).map(a=>a.split(` `).map(b=>+b));
let challenge = readFileSync(`problem16.7.txt`, 'utf-8').split(`\n`).map(a=>a.split(` `).map(b=>+b));

const test2 = [
    [3,4],
    [2,3],
    [4,2],
    [4,3]
]

// console.log(test);
function knapsackWeights(arr,C){
    // console.log(arr.length+1,C+1);
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
        let oldImportantPoints=importantPoints[i-1];
        // console.log(i)
        newImportantPoints.push({start:0,value:0});
        for(let c=1;c<=C;c++){
            
            let lastImportantPoint = newImportantPoints[newImportantPoints.length-1];
            let v1 = getRelevantImportantPoint(c,oldImportantPoints);
            let v2=0;
            if (c-arr[i-1][1]>=0){
                v2 = getRelevantImportantPoint(c-arr[i-1][1],oldImportantPoints)+arr[i-1][0];
            }
            

            if(Math.max(v1,v2)>lastImportantPoint.value){
                newImportantPoints.push({start:c,value:Math.max(v1,v2)})
            }
        }
        importantPoints.push(newImportantPoints);
    }

    let result = importantPoints.pop();
    // console.log(result.pop().value);
    console.log(result.pop().value);
}

// knapsackWeights(test,10000);
// knapsackWeightsWithCache(challenge,2000000);
knapsackWeightsWithCache(test,10000);
knapsackWeightsWithCache(test2,6);

// knapsackWeights(test2,6)
// knapsackWeightsWithCache(test2,6)

function getRelevantImportantPoint(w,aa){
    // if (aa<0){return -Infinity;}
    let aaa = aa.filter(a=>a.start<=w);
    return aaa[aaa.length-1]?.value||0;
}