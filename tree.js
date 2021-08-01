let fs=require("fs");
let path=require("path");
function tree(inputPath){
    if(fs.existsSync(inputPath)){
        treeHelper(inputPath,"");
    }
    else{
            treeHelper(process.cwd(),"");
    }
 }
function treeHelper(inputPath,indent){
    let arr=fs.readdirSync(inputPath);
    for(let i=0;i<arr.length;i++){
        let check=fs.lstatSync(path.join(inputPath,arr[i]));
        if(check.isFile()){
            console.log(indent+"|---"+arr[i]);
        }
        else{
            console.log(indent+"|---"+arr[i]);
            let dirPath=path.join(inputPath,arr[i]);
            treeHelper(dirPath,indent+"\t");
        }
    }
}
module.exports={
    treeCall:tree
}