import { promises as fsPromises } from "fs";
import { heapPrim, naivePrim } from "./prim.js";
import { unionKruskal, naiveKruskal } from "./kruskal.js"

async function asyncReadFile(filename, function1, function2, function3, function4) {
  try {
    const contents = await fsPromises.readFile(filename, "utf-8");

    const arr = contents.split(/\r?\n/).map((a) => a.split(` `).map(b=>+b));
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

    console.time(function4.name)
    await function4([...arr]);
    console.timeEnd(function4.name)
    

  } catch (err) {
    console.log(err);
  }
}

asyncReadFile(`problem15.9.txt`,naivePrim,heapPrim,naiveKruskal,unionKruskal);
