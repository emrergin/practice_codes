import { promises as fsPromises } from "fs";
import Heap from "../part2/Heap.js";
import Queue from "./Queue.js";
// import Heap from "heap";


const test1 = [37, 59, 43, 27, 30, 96, 96, 71, 8, 76];

const test2 = [
  895, 121, 188, 953, 378, 849, 153, 579, 144, 727, 589, 301, 442, 327, 930,
];


async function asyncReadFile(filename, function1, function2, function3) {
  try {
    const contents = await fsPromises.readFile(filename, "utf-8");

    const arr = contents.split(/\r?\n/).map((a) => +a);
    console.log(`file parsing done.`);

    console.time(function1.name)
    await function1([...arr]);
    console.timeEnd(function1.name)

    console.time(function2.name)
    await function2([...arr]);
    console.timeEnd(function2.name)

    console.time(function3.name)
    await function3([...arr]);
    console.timeEnd(function3.name)

  } catch (err) {
    console.log(err);
  }
}

function naiveHuffman(arr) {
  const trees = [];
  const results = [];

  let index=0;
  for (let a of arr) {
    trees.push({ nodeList: [{node:a, id:index}], 
      totalWeight: a, 
    });
    results.push(0);
    index++;
  }

  while (trees.length >= 2) {
    trees.sort((a, b) => b.totalWeight - a.totalWeight);
    let t1 = trees.pop();
    let t2 = trees.pop();
    let t3 = {
      nodeList: t1.nodeList.concat(t2.nodeList),
      totalWeight: t1.totalWeight + t2.totalWeight,
    };
    trees.push(t3);
    for (let a of t3.nodeList){
      results[a.id]+=1;
    }
  }
  const sortedResults = results.sort((a,b)=>(a-b));
  console.log(sortedResults[0],sortedResults[sortedResults.length-1]);
  // return results;
}

function heapHuffman(arr) {
  const trees = new Heap();
  const results = [];

  let index=0;
  for (let a of arr) {
    trees.insert({ nodeList: [{node:a, id:index}], 
      key: a, 
    });
    results.push(0);
    index++;
  }

  while (trees.store.length >= 2) {
    let t1 = trees.extract();
    let t2 = trees.extract();
    let t3 = {
      nodeList: t1.nodeList.concat(t2.nodeList),
      key: t1.key + t2.key,
    };
    trees.insert(t3);
    for (let n of t3.nodeList){
      results[n.id]+=1;
    }
  }
  const sortedResults = results.sort((a,b)=>(a-b));
  console.log(sortedResults[0],sortedResults[sortedResults.length-1]);
}

function queueHuffman(arr) {
  const queue1 = new Queue();
  const queue2 = new Queue();
  const results = [];

  let index=0;
  arr.sort((a,b)=>a-b)
  for (let a of arr) {
    queue1.enqueue({ nodeList: [{node:a, id:index}], 
      totalWeight: a, 
    });
    results.push(0);
    index++;
  }

  while (queue1.length + queue2.length>= 2) {
    let t1 = findMinimum(queue1,queue2);
    let t2 = findMinimum(queue1,queue2);
    let t3 = {
      nodeList: t1.nodeList.concat(t2.nodeList),
      totalWeight: t1.totalWeight + t2.totalWeight,
    };
    queue2.enqueue(t3);
    for (let a of t3.nodeList){
      results[a.id]+=1;
    }
  }
  const sortedResults = results.sort((a,b)=>(a-b));
  console.log(sortedResults[0],sortedResults[sortedResults.length-1]);

  function findMinimum(queue1,queue2){
    if (queue1.length===0){return queue2.dequeue()}
    else if(queue2.length===0){return queue1.dequeue()}
    else if(queue1.peek().totalWeight<queue2.peek().totalWeight){return queue1.dequeue()}
    else{return queue2.dequeue()}
  }
}

// naiveHuffman(test2);
// heapHuffman(test2);
// queueHuffman(test2);

asyncReadFile(`problem14.6.txt`,naiveHuffman,heapHuffman,queueHuffman);
