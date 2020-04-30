/*
 *@description: 把之前解析的代码从 js => ts
 *@author: hwc 
 *@date: 2020-04-30 11:28:45
 *@version 1.0.0
 */
import fs = require("fs");
import xml2json = require("xml2json");
namespace FairyUtil {
    /**
     * 解析 FairyGUI package.xml 的数据
     * @param fileName FairyGUI 包名
     */
    export function parsePkg (fileName:string):any {
        let context = fs.readFileSync(fileName, {encoding:"utf8"});
        let pkg = xml2json.toJson(context, {object: true});
        return pkg;
    }
    /**
     * 把 FairyGUI package.xml 的数据生成 obj;
     * @param fileName FairyGUI 包名
     */
    export function resMap (fileName:string) {
        let pkg:any = parsePkg(fileName)["packageDescription"]["resources"];
        let res:any = {};
        for (const key in pkg) {
            if (pkg.hasOwnProperty(key)) {
                const element = pkg[key];
                if(element instanceof Array){
                    res[key] = {};
                    element.forEach(item => {
                        res[key][item.id] = item;
                    });
                }else{
                    res[key] = element;
                }
            }
        }
        return res;
    }

    /**
     * 解析 FairyGUI 组件文件的数据信息
     * @param fileName 组件的文件名
     */
    export function cmpParse (fileName:string) {
        let cmp = fs.readFileSync(fileName, {encoding:"utf8"});
        let com:any = xml2json.toJson(cmp, {object:true});
        let tem = cmp.match(/<displayList>[\S\s]+<\/displayList>/g)[0];
        let disList = tem.split("\n");
        
        let dis = [];
        let str = '';
        let rex = /\/>$/;
        let flag = true;
        let tail = ""
        for (let index = 1; index < disList.length - 1; index++) {
            let item = disList[index];
            str += item
            item = item.trim();
            let itemObj:any = {};

            if(!flag){
                flag = (item == tail);
                if(flag){
                    itemObj = xml2json.toJson(str, {object:true});
                    dis.push(itemObj);
                    str = '';
                }
                continue;
            }

            if(!rex.test(item)){
                let head = item.split(" ");
                let tem = head[0].replace("<", "");
                tail = `</${tem}>`;
                flag = false;
                continue;
            }
            
            itemObj = xml2json.toJson(str, {object:true});
            dis.push(itemObj);
            str = '';
        }
        com.component.displayList = dis;

        return com;
    }

    /**
     * 保存生成的代码
     * @param path 生成的代码文件路径
     * @param code 代码内容
     */
    export function saveCode(path:string, code:string){
        fs.writeFileSync(path,code);
    }
}