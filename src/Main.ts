/*
 *@description: 解析入口
 *@author: hwc 
 *@date: 2020-04-30 11:08:34
 *@version 1.0.0
 */
import FairyUtil from "./fairyGUIparse/FairyUtil"

function Main () {
    let pkgURL:string = "./test/package.xml";
    let codeURL:string = "./test/fpackage.json";
    let obj = FairyUtil.resMap(pkgURL);
    FairyUtil.saveCode(codeURL, JSON.stringify(obj, null, 2));
}

Main();