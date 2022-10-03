import { promises as fsPromises} from 'fs';
// const  kosaraju  = require('./kosaraju');
import kosaraju from './kosaraju.js';

// import {promises: fsPromises}

async function asyncReadFile(filename) {
    try {
      const contents = await fsPromises.readFile(filename, 'utf-8');
    
      const arr = contents.split(/\r?\n/).map(a=>a.trim().split(' '));
      console.log(`file parsing done.`);
  
    //   console.log(arr[0]);
    console.log(kosaraju(arr));
  
      return arr;
    } catch (err) {
      console.log(err);
    }
  }
  
  asyncReadFile('./problem8.10.txt');