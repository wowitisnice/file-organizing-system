#!/usr/bin/env node
let fs=require("fs");
let path=require("path");
let organizeObj=require("./organize");
let treeObj=require("./tree");
let helpObj=require("../web-dev/help");
let arr=process.argv.slice(2);
let execute=arr[0];
switch(execute){
    case("organize"):
     organizeObj.organizeCall(arr[1]);
     break;
    case("tree"):
    treeObj.treeCall(arr[1],"")
     break;
    case("help"):
    helpObj.helpCall();
     break;
    default:
        console.log("wrong option");
}