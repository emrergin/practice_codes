import { promises as fsPromises} from 'fs';
import {dijkstra, dijkstraHeap} from './dijkstra.js'

async function asyncReadFile(filename) {
    try {
      const contents = await fsPromises.readFile(filename, 'utf-8');
    
      const arr = contents.split(/\r?\n/).map(a=>a.trim().split(/\t/).map((b,index)=>
      {
        if (index===0){return Number(b);}
        else{
          return b.split(`,`).map(c=>Number(c))
        }
      }));

      
      console.log(`file parsing done.`);

      console.time('dijkstra')
      const m1 = dijkstra([...arr], 1);
      console.timeEnd('dijkstra')

      console.time('dijkstraHeap')
      const m2 = dijkstraHeap([...arr], 1);
      console.timeEnd('dijkstraHeap');

      const relatedVertices = [7,37,59,82,99,115,133,165,188,197];
      console.log(relatedVertices.map(a=>m1.get(a)));
  
    } catch (err) {
      console.log(err);
    }
  }
  
  asyncReadFile('./problem10.8.txt');