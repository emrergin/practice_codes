import { createReadStream } from "fs";
import { createInterface } from "readline";

import Heap from "./Heap.js";
import SearchTree from "./SearchTree.js";

async function heapMedian(filePath){

    const H1=new Heap(null,`max`);
    const H2=new Heap(null,`min`);

    function processNewInput(x){
    
        let y = H1.store[0]?.key ||Infinity;
        let z = H2.store[0]?.key ||-Infinity;

        if (x<y){H1.insert({key:+x})}
        else if (x>z){H2.insert({key:+x})}
        else{H1.insert({key:+x})}

        if(H1.store.length>H2.store.length+1){
            const maxh1 = H1.extract();
            H2.insert(maxh1);
        }
        else if (H2.store.length>H1.store.length+1){
            const minh2 = H2.extract();
            H1.insert(minh2);
        }
        return H1.store.length>=H2.store.length? H1.store[0].key : H2.store[0].key;
    }

    await processLineByLine(filePath,processNewInput);
}

async function treeMedian(filePath){
    const T= new SearchTree();    
    let counter=0;

    function processNewInput(x){
        counter++;
        T.insert(+x);
        return T.select(Math.ceil(counter/2)).key;
    }

    await processLineByLine(filePath,processNewInput);  
}

async function naiveMedian(filePath){
    const numbers= [];   

    function processNewInput(x){
        numbers.push(+x);
        numbers.sort(function(a, b){return a-b});
        return numbers[Math.ceil(numbers.length/2)-1];
    }

    await processLineByLine(filePath,processNewInput);  
}

async function processLineByLine(filePath, functionToUse) {
        
    let sum =0;
    const rl = createInterface({
        input: createReadStream(filePath),
        crlfDelay: Infinity
    });

    for await (const line of rl){
        
        let newValue = functionToUse(line);
        sum += newValue;
    }

    console.log(sum);
};


console.time('heap')
await heapMedian('./problem11.3.txt');
console.timeEnd('heap')

console.time('tree');
await treeMedian('./problem11.3.txt');
console.timeEnd('tree');

console.time('array');
await naiveMedian('./problem11.3.txt');
console.timeEnd('array');