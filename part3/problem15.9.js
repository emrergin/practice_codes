import { promises as fsPromises } from "fs";
// import Heap from "../part2/Heap.js";
// import Queue from "./Queue.js";
// import Heap from "heap";
import { heapPrim, naivePrim } from "./prim.js";
import { unionKruskal, naiveKruskal } from "./kruskal.js"

async function asyncReadFile(filename, function1, function2, function3, function4) {
  try {
    const contents = await fsPromises.readFile(filename, "utf-8");

    const arr = contents.split(/\r?\n/).map((a) => a.split(` `).map(b=>+b));
    console.log(`file parsing done.`);
    // console.log(arr)

    console.time(function1.name)
    await function1([...arr]);
    // console.log(Array.from(function1([...arr])).reduce((prev,curr)=>prev+curr[2],0));
    // const result1 = Array.from(function1([...arr]));
    console.timeEnd(function1.name)

    console.time(function2.name)
    await function2([...arr]);
    // const result2 = Array.from(function2([...arr]));
    // console.log(Array.from(function2([...arr])).reduce((prev,curr)=>prev+curr[2],0));
    console.timeEnd(function2.name)

    console.time(function3.name)
    await function3([...arr]);
    // console.log(Array.from(function3([...arr])).reduce((prev,curr)=>prev+curr[2],0));
    console.timeEnd(function3.name)

    console.time(function4.name)
    // console.log(Array.from(function4([...arr])).reduce((prev,curr)=>prev+curr[2],0));
    await function4([...arr]);
    console.timeEnd(function4.name)

    // for (let i=0;i<result1.length;i++){
    //   if(!(result1[i][0]===result2[i][0] && result1[i][1]===result2[i][1] && result1[i][2]===result2[i][2])){
    //     console.log(result1[i],result2[i])
    //   }
    // }
    

  } catch (err) {
    console.log(err);
  }
}

asyncReadFile(`problem15.9.txt`,naivePrim,heapPrim,naiveKruskal,unionKruskal);
