# Related Books

- [Algorithms Illuminated](https://algorithmsilluminated.org/) series by **Tim Roughgarden**, Parts 1-4.
- [Eloquent Javascript](https://eloquentjavascript.net/) by **Marijn Haverbeke**.
    - These are old (May 2022 or so) solutions, in need of reorganization. Keeping them here for archival purposes.
    - Also note that, some of the solutions depend on the global variables defined in the website itself, thus won't work independently, and may need the global scope in https://eloquentjavascript.net/code/.
- [You Don't Know JS](https://github.com/getify/You-Dont-Know-JS) series, by **Kyle Simpson**. Currently only the first book is covered.

# Related Courses
- [The Missing Semester of Your CS Education](https://missing.csail.mit.edu/)

## More sources
- Queue code is not mine, I got it from : https://www.javascripttutorial.net/javascript-queue/.

## What I learned
- Map and Set has a maximum size of $2^{24}$, enforced by Node V8 engine, see: https://github.com/nodejs/node/issues/37320
- Array uses 8 bytes per entry. When RAM is limited, it is better to use IntArray.
- When dealing with IntArray, special care should be spared for the maximum and minimum values. Also, note that all the values are started as zero in this case.
- When more RAM is necessary, ``--max-old-space-size`` optional argument can be used with node.
