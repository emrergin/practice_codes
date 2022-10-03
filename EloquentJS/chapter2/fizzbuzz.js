for(let i=0;i<100;i++){
    let textToWrite = ``;
    if ((i+1)%3===0){textToWrite+=`Fizz`}
    if ((i+1)%5===0){textToWrite+=`Buzz`}
    if (textToWrite===``){
        console.log(i+1);
    }
    else{
        console.log(textToWrite);
    }
}