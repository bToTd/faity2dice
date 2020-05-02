/*
 *@description: 主入口
 *@author: hwc 
 *@date: 2020-04-20 14:01:05
 *@version 1.0.0
 */
const fs = require("fs");

const pkgParser = require("./src/fairyGUIparse/parsePkg");
// let res = pkgParser.resMap("./test/package.xml");

// fs.writeFileSync("./test/package.json", JSON.stringify(res, null, 2));


let toImagesCode = function (obj, parent) {
    let valueName = obj.name;
    let resName = obj.fileName.split("/").pop().split(".")[0];
    let pos = obj.xy.split(",");
    let size = (obj.size) ? obj.size.split(",") : null;

    let code = "";
    
    code = `
    let ${valueName} = BaseBitmap.create("${resName}");
    ${parent}.addChild(${valueName});
    ${valueName}.setPosition(${pos[0]},${pos[1]});
    `;
    if(size){
        code = code + 
        `${valueName}.width = ${size[0]};
    ${valueName}.height = ${size[1]};
    `
    }

    return code;
}

let toTFCode = function (obj, parent) {
    let valueName = obj.name;
    let fontSize = 24;
    let fontColor = obj.color.replace("#", "0x");
    let pos = obj.xy.split(",");
    let size = (obj.size) ? obj.size.split(",") : null;

    let code = "";
    
    code = `
    let ${valueName} = ComponentMgr.getTextField('11', ${fontSize}, ${fontColor});;
    ${parent}.addChild(${valueName});
    ${valueName}.setPosition(${pos[0]},${pos[1]});
    `;
    if(size){
        code = code + 
        `${valueName}.width = ${size[0]};
    ${valueName}.height = ${size[1]};
    `
    }

    if(obj.strokeColor){
        code = code +
        `${valueName}.strokeColor = ${obj.strokeColor.replace("#", "0x")};
    `
    }

    if(obj.vAlign){
        code = code +
        `${valueName}.verticalAlign = "${obj.vAlign}";
        `
    }

    return code;
}

let toListCode = function (obj, parent) {
    // 需要一个 listitem 类，直接使用 obj.name + "Item" 作为 list item
    // 类，然后判断当前文件夹下是否出存在这个类的 ts 文件，没有则直接生成。
    let valueName = obj.name;
    let pos = obj.xy.split(",");
    let size =  obj.size.split(","); // 移动存在
    let code = `
    let ${valueName} = ComponentMgr.getScrollList(${valueName}, [], new egret.Rectangle(0,0,${size[0]}, ${size[1]}));
    ${parent}.addChild(${valueName});
    ${valueName}.setPosition(${pos[0]}, ${pos[1]});
    `;

    if(false){
        // 这里要生成 listItem 类
    }
    return code;
}

let strFirstChatUpper = function (str) {
    let firstChat = str[0];
    return "".concat(firstChat.toUpperCase(), str.substr(1, str.lenght - 1));
}

let toBtnCode = function (obj, parent) {
    // btn 的代码
    // let userInfoBtn = ComponentMgr.getButton("name_bg", "", this.infoOnclickHandler, this);
	// 	nameView.addChild(userInfoBtn);
	// 	userInfoBtn.x = 0;
	// 	userInfoBtn.y = 0;
    return "";
}

let toProgressCode = function (obj, parent) {
    return "";
}

let toComponent = function (path, parent) {
    let cmp = pkgParser.comParse(path);
    let conName = path.split("/").pop().split(".")[0];
    let code = `
    let ${conName} = new BaseDisplayObjectContainer();
    ${conName}.setPosition();
    `
    
}

let main = function () {
    let cmp = pkgParser.comParse("./test/BattleCommonView.xml");
    let code = "";
    cmp.component.displayList.forEach(element => {
        if (element.image) {
            code += toImagesCode(element.image, "this");
        } else if (element.component) {
            // 还没处理
        } else if (element.text) {
            code += toTFCode(element.text, "this");
        } else if (element.list) {
            code += toListCode(element.list, "this");
        }
    });

    fs.writeFileSync("./test/test.ts",code);
}
main();

// cmp = pkgParser.comParse("./test/BattleCommonView.xml");
// fs.writeFileSync("./test/BattleCommonView.json", JSON.stringify(cmp, null, 2));