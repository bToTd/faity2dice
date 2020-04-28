/*
 *@description: 解析 package.xml 
 *@author: hwc 
 *@date: 2020-04-20 16:27:56
 *@version 1.0.0
 */

const fs = require("fs");
const xml2json = require("xml2json");
const parsePkg = (function(){
    let parsePkg = function (fileName) {
        let pkg = fs.readFileSync(fileName, {encoding:"utf8"});
        pkg = xml2json.toJson(pkg, {object: true});
        return pkg;
    }

    let ResMap = function (fileName) {
        let pkg = parsePkg(fileName).packageDescription.resources;
        let res = {};
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

    let cmpParse = function (fileName) {
        let cmp = fs.readFileSync(fileName, {encoding:"utf8"});
        let com = xml2json.toJson(cmp, {object:true});
        let disList = cmp.match(/<displayList>[\S\s]+<\/displayList>/g)[0];
        disList = disList.split("\n");
        
        let dis = [];
        let str = '';
        let rex = /\/>$/;
        let flag = true;
        let tail = ""
        for (let index = 1; index < disList.length - 1; index++) {
            let item = disList[index];
            str += item
            item = item.trim();

            if(!flag){
                flag = (item == tail);
                if(flag){
                    item = xml2json.toJson(str, {object:true});
                    dis.push(item);
                    str = '';
                }
                continue;
            }

            if(!rex.test(item)){
                let head = item.split(" ");
                head = head[0].replace("<", "");
                tail = `</${head}>`;
                flag = false;
                continue;
            }
            
            item = xml2json.toJson(str, {object:true});
            dis.push(item);
            str = '';
        }
        com.component.displayList = dis;

        return com;
    }

    return {
        parsePkg: parsePkg,
        resMap: ResMap,
        comParse: cmpParse
    }
})();

module.exports = parsePkg;