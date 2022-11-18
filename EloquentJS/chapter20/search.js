const {statSync, readdirSync, readFileSync,existsSync} = require("fs");

let searchTerm = new RegExp(process.argv[2]);
let arguments=process.argv.slice(3);

let existingFiles=[];

while(arguments[0]){
    if (!existsSync(arguments[0])){
        arguments.shift();
        continue;
    }
    if (!statSync(arguments[0]).isDirectory()){
        let fileContent = readFileSync(arguments[0],{encoding:'utf8'});
        if (searchTerm.test(fileContent)){
            existingFiles.push(arguments[0]);
        }
    }
    else{
        arguments=arguments.concat(readdirSync('./'+arguments[0]).map(a=>`./`+arguments[0]+`/`+a));
    }
    arguments.shift();
}

existingFiles=existingFiles.map(a=>a.replace(/^(.\/)+/, ''));
console.log(existingFiles)