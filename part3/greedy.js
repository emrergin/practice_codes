import { promises as fsPromises } from "fs";
async function asyncReadFile(filename, interval) {
  try {
    const contents = await fsPromises.readFile(filename, "utf-8");

    const arr = contents.split(/\r?\n/).map((a) => a.split(" ").map((b) => +b));
    console.log(`file parsing done.`);

    greedyRatio(arr);
    greedyDiff(arr);
  } catch (err) {
    console.log(err);
  }
}

function greedy(arr, functionToUse) {
  const arrayToWork = arr.slice(1);

  const arrayWithScores = arrayToWork
    .map((a) => [a[0], a[1], functionToUse(a[0], a[1])])
    .sort((b, c) => {
      if (b[2] > c[2]) {
        return -1;
      }
      if (b[2] < c[2]) {
        return 1;
      }
      if (b[2] === c[2]) {
        if (b[1] > c[1]) {
          return -1;
        }
        if (b[1] < c[1]) {
          return 1;
        }
        return 0;
      }
    });

  let totalTime = 0;
  let weightedSum = 0;

  for (let work of arrayWithScores) {
    totalTime += work[1];
    weightedSum += totalTime * work[0];
  }

  console.log(weightedSum);
}

const greedyRatio = (arr) => greedy(arr, (a, b) => a / b);
const greedyDiff = (arr) => greedy(arr, (a, b) => a - b);

// asyncReadFile(`problem13.4.test.txt`);
asyncReadFile(`problem13.4.txt`);
