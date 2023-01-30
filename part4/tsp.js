import { readFileSync } from "fs";

// The following two functions are just for data parsing. In the data I focused, the second one, that fills a matrix of euclidean distances is used.

function formatOne(filename) {
  let lines = readFileSync(filename, "utf-8")
    .split(`\n`)
    .map((b) => b.split(" "))
    .map((a) => ({ start: +a[0], end: +a[1], weight: +a[2] }));

  let vertices = [...new Set(lines.flatMap((a) => [a.start, a.end]))];
  let n = vertices.length;

  const edgeWeights = Array(n)
    .fill()
    .map(() => Array(n));
  lines.forEach((a) => {
    edgeWeights[a.start - 1][a.end - 1] = a.weight;
    edgeWeights[a.end - 1][a.start - 1] = a.weight;
  });

  bellmanHeldKarp(vertices, edgeWeights);
}

function formatTwo(filename) {
  let lines = readFileSync(filename, "utf-8")
    .split(`\n`)
    .map((b) => b.split(" ").map(Number));

  let vertices = Array(lines.length)
    .fill()
    .map((a, index) => index + 1);
  let n = lines.length;

  const edgeWeights = Array(n)
    .fill()
    .map(() => Array(n));

  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      edgeWeights[i][j] = euclidean(
        lines[i][0],
        lines[i][1],
        lines[j][0],
        lines[j][1]
      );
    }
  }

  function euclidean(x1, y1, x2, y2) {
    return Math.hypot(x1 - x2, y1 - y2);
  }

  bellmanHeldKarp(vertices, edgeWeights);
}

function bellmanHeldKarp(vertices, edgeWeights) {
  let n = vertices.length;

  //To save memory, I don't define the arrays exactly, until any cell is used. But in the original solution, I had:
  // Array(2**(n-1)-1).fill().map(() => Array(n-1)); 
  let A_k_1 = [];
  let A_k = [];

  //These are the base cases for dynamic programming. For every subset with just the first and some other element, the related score is
  //the edge length between them.
  for (let j = 2; j <= n; j++) {
    let aBase = new Int8Array(n - 1);
    aBase[j - 2] = 1;
    let currentSubsetIndex = findIndexOfSet(aBase, n);
    if (A_k_1[currentSubsetIndex] === undefined) {
      A_k_1[currentSubsetIndex] = Array(n - 1);
    }
    //A[subset][element] is the minimum distance that visits every element in the subset first, then the element in the second index, last.
    //Since in the base case, the only element is the first one, this score is just the distance between them.
    A_k_1[currentSubsetIndex][j - 1] = edgeWeights[0][j - 1];
  }

  for (let s = 3; s <= n; s++) {
    console.log("current size:", s);
    //This line gets all the subsets that has s-1 elements other than the first element, since it is always included. The full range of subsets
    //can get huge, thus I generate the relevant ones on go.

    let subsetOfSubsets = getNSizedSubsets(n, s);

    //Here is the main loop. For any subset with size s, tuples of elements j and k (except the first element) are selected.
    //As the subsets are represented as arrays of 1s and 0s, we skip every case with jth entry is 0, kth entry is 0, or j and k
    // are equal to each other.
    for (let subset of subsetOfSubsets) {
      for (let j = 2; j <= n; j++) {
        //note the minus 2, not 1. Since every subset has to include the first element anyways, I skip the first element in the arrays.
        if (subset[j - 2] === 0) {
          continue;
        }
        let minValue = Infinity;
        //for each subset, and for each element of that subset, I remove the each element and find the best subset according to their scores.
        // so here, j is the element removed. and k is the probable last elements of the remaining subsets, since the addition order changes the total
        // distance traversed.
        for (let k = 2; k <= n; k++) {
          if (subset[k - 2] === 0) {
            continue;
          }
          if (j === k) {
            continue;
          }
          //I need to keep the resulting subset constant, so I deep copy it.
          let subsetset = structuredClone(subset);
          subsetset[j - 2] = 0;
          minValue = Math.min(
            minValue,
            //this is the score of the subset without j, for different last added elements of k. I choose the best one, so each score also implies an
            // ordering of the elements. Note that we add j back in, and counting the edge distance.
            A_k_1[findIndexOfSet(subsetset, n)][k - 1] +
              edgeWeights[k - 1][j - 1]
          );
        }
        let currentSubsetIndex = findIndexOfSet(subset, n);
        if (A_k[currentSubsetIndex] === undefined) {
          A_k[currentSubsetIndex] = Array(n - 1);
        }
        //the best score for each subset and j is recorded to be used for subsets with more elements.
        A_k[currentSubsetIndex][j - 1] = minValue;
      }
    }
    //this is a memory optimization, since each loop only refers to one loop before.
    A_k_1 = A_k;
  }

  // after the main loop ends, we check all subsets that includes all elements. according to which elements is used last, the best ordering changes,
  // so we pick the element to complete the cycle.
  let minValue = Infinity;
  for (let j = 2; j <= n; j++) {
    minValue = Math.min(
      A_k[2 ** (n - 1) - 2][j - 1] + edgeWeights[j - 1][0],
      minValue
    );
  }

  console.log(minValue);

  //this function gives an index for every subset, since I did not think using a Map for indices would be better memory wise.
  // as the loop refers to scores corresponding to specific subsets, I needed to enumerate them somehow.
  function findIndexOfSet(set, len) {
    let result = 0;

    for (let i = 0; i < len; i++) {
      if (set[i] === 1) {
        result += 2 ** i;
      }
    }
    return result - 1;
  }

  //this one gives an array of Int8Arrays, in the shape of zeroes and ones.
  function getNSizedSubsets(num, size) {
    let subsets = [];
    // it takes the full range of number of subsets. (num-1), since 1st element always has to be included.
    let nn = 2 ** (num - 1);
    for (let i = 0; i < nn; i++) {
      //then it translates every number between 1 to nn, to binary.
      let b = i.toString(2).padStart(num - 1, "0");
      //then it translates it to an array of zeroes and ones.
      let bcodes = b.split("").map(Number);
      //it adds it to the value returned, if it has exactly size-1 ones. -1 is there, since 1 has to be included.
      if (bcodes.reduce((a, b) => a + b, 0) === size - 1) {
        subsets.push(new Int8Array(bcodes));
      }
    }
    return subsets;
  }
}

// formatOne(`tsptest1.txt`);
// formatOne(`tsptest2.txt`);



// formatTwo(`tsptest3.txt`);
formatTwo(`tspinput.txt`);
