import {readFileSync } from "fs";

let test = readFileSync(`problem16.7.test.txt`, 'utf-8').split(`\n`).map(a=>a.split(` `).map(b=>+b));
let challenge = readFileSync(`problem16.7.txt`, 'utf-8').split(`\n`).map(a=>a.split(` `).map(b=>+b));

// console.log(test);
function knapsackWeights(arr,C){
    // console.log(arr.length+1,C+1);
    const A=Array.from(Array(arr.length+1), () => new Array(C+1));
    let size = arr.length;
    
    for(let c=0;c<=C;c++){
        A[0][c]=0;
    }

    // console.log(arr[0][1])

    for (let i=1;i<size+1;i++){
        for(let c=0;c<=C;c++){
            // console.log(arr[i][1])
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

    const results = new Map();
    
    for(let c=0;c<=C;c++){
        results.set(`0-${c}`,0);
    }

    for (let i=1;i<size+1;i++){
        for(let c=0;c<=C;c++){
            if (arr[i-1][1]>c){
                results.set(`${i}-${c}`,results.get(`${i-1}-${c}`));

            }
            else{
                try{
                results.set(`${i}-${c}`,Math.max(results.get(`${i-1}-${c}`),results.get(`${i-1}-${c-arr[i-1][1]}`)+arr[i-1][0]));
                }
                catch(e){
                    console.log(i,c,`${i-1}-${c-arr[i][1]}`,results.get(`${i-1}-${c}`),results.get(`${i-1}-${c-arr[i-1][1]}`),arr[i-1][0])
                    break;
                }
                
            }
        }
    }

    console.log(results.get(`${size}-${C}`))
}

// knapsackWeights(test,10000);
// knapsackWeightsWithCache(challenge,2000000);