/*
 *@description: 解析入口
 *@author: hwc 
 *@date: 2020-04-30 11:08:34
 *@version 1.0.0
 */
import FairyUtil from "./fairyGUIparse/FairyUtil"
import { CodeUtil } from "./code/CodeUtil";


function Main () {
    // let pkgURL:string = "./test/package.xml";
    // let codeURL:string = "./test/fpackage.json";
    // let obj = FairyUtil.resMap(pkgURL);
    // FairyUtil.saveCode(codeURL, JSON.stringify(obj, null, 2));

    let comURL = "./test/ReadyUI.xml";
    let root = "this.obj"

   let code = CodeUtil.toComUI(comURL, root);
   let ts = FairyUtil.tsClass("ReadyUI", code);
   FairyUtil.saveCode("./test/ReadyUI.ts", ts);

}

Main();