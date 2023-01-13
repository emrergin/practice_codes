const frequencies = [2,8,2,5,5,2,8,3,6,1,1,6,3,2,6,7,4,63,2,9,10,1,60,5,2,7,34,11,31,76,21,6,8,1,81,37,15,6,8,24,12,18,42,8,51,21,8,6,5,7];

const A=Array.from(Array(51), () => new Array(51));
for(let c=0;c<51;c++){
    A[c][c]=0;
}

for (let s=0;s<51;s++){
    for(let i=0;i<=50-s;i++){
        let minSubValue=Number.MAX_SAFE_INTEGER;
        for(let r=i;r<=i+s;r++){
            if(s===0){
                minSubValue=Math.min(minSubValue,A[r][r]);
            }
            else{
                if(r===i){
                    minSubValue=Math.min(minSubValue,A[r+1][i+s])
                }
                else if(r===i+s){
                    minSubValue=Math.min(minSubValue,A[i][r-1])
                }
                else{
                    minSubValue=Math.min(minSubValue,A[i][r-1]+A[r+1][i+s])
                }
            }
        }
        A[i][i+s]=frequencies.slice(i,i+s+1).reduce((prev,curr)=>prev+curr,0)+minSubValue;
    }
}

console.log(A[0][50]);