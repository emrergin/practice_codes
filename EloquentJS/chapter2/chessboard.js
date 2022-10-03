function chessBoard(size){
    for (let i=1;i<=size;i++){
        let rowText=``;
        for (let j=1;j<=size;j++){
            if((i+j)%2===1){
                rowText+=`#`;
            }
            else{
                rowText+=` `;
            }
        }
        console.log(rowText);
    }
}

chessBoard(8);