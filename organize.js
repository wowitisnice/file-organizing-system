let fs=require("fs");
let path=require("path");
let prakar={archives:['zip', '7z', 'rar', 'tar', 'gz', 'ar', 'iso', "xz"],
documents:['docx', 'doc', 'pdf', 'xlsx', 'xls', 'odt', 'ods', 'odp', 'odg', 'odf', 'txt', 'ps', 'txt','js'],
app:['exe', 'dmg', 'pkg', "deb"]
};
function organize(inputPath){
    if(inputPath==undefined){
        let destPath=path.join(process.cwd(),"organized files");
        if(fs.existsSync(destPath)==false){
            fs.mkdirSync(destPath);
        }
        organizeHelper(process.cwd(),destPath);
    }
    else if(fs.existsSync(inputPath)){
        let destPath=path.join(inputPath,"organized files");
        if(fs.existsSync(destPath)==false){
            fs.mkdirSync(destPath);
        }
        organizeHelper(inputPath,destPath);

    }
    else{
        console.log("enter correct path");
        return;
    }
}
function organizeHelper(inputPath,destPath){
    let contents=fs.readdirSync(inputPath);
    for(let i=0;i<contents.length;i++){
        let filePath=path.join(inputPath,contents[i]);
        let check=fs.lstatSync(filePath);
        if(check.isFile()){
        let category=types(filePath);
        copyfiles(filePath,destPath,category);
        }
    }
}   
function types(filePath){
//     let prakar={archives:['zip', '7z', 'rar', 'tar', 'gz', 'ar', 'iso', "xz"],
//     documents:['docx', 'doc', 'pdf', 'xlsx', 'xls', 'odt', 'ods', 'odp', 'odg', 'odf', 'txt', 'ps', 'txt','js'],
//     app:['exe', 'dmg', 'pkg', "deb"]
// };
    for(let type in prakar){
        let ext=path.extname(filePath);
       ext=ext.slice(1);
        let check=prakar[type];
        for(let i=0;i<check.length;i++){
            if(ext==check[i]){
                return type;
            }
        }
    }
    return "others";
}
function copyfiles(sourcePath,destPath,category){
    let finalPath=path.join(destPath,category);
    if(fs.existsSync(finalPath)==false){
        fs.mkdirSync(finalPath);
    }
    let fileName=path.basename(sourcePath);
    let fileCopyPath=path.join(finalPath,fileName);
    fs.copyFileSync(sourcePath,fileCopyPath);
    //fs.unlinkSync(sourcePath);
}
module.exports={
    organizeCall:organize
}