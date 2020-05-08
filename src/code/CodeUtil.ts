import FairyUtil from "../fairyGUIparse/FairyUtil";

/*
 *@description: 生成代码时要进行的一些转换
 *@author: hwc 
 *@date: 2020-04-30 12:16:10
 *@version 1.0.0
 */


 /**
 * 生成框架 UI 代码中需要的数据
 */
export interface UIdata{
    name:string;
    xy:string;
    size?:string;
    resName?:string; // 图片资源名字   
}

export interface TFUIdata extends UIdata {
    fontSize:string;
    color:string;
    strokeColor?:string;
    vAlign?:string;
}

export interface ComUI extends UIdata {
    fileName:string;
    src:string;

}

export interface CodeStr{
    UIcode:string;
    ValueCode:string;
    DisposeCode:string;
}

export class CodeUtil {

    /**
     * 字符串首字母大写
     * @param str 要转换的字符串
     */
    public static firstChatUpper (str:string):string {
        let firstChat = str[0];
        let tem:string = str.substr(1, str.length);
        return "".concat(firstChat, tem);
    }

    /**
     * 生成框架中的图片代码
     * @param obj 数据对象
     * @param parent 父亲节点的变量
     */
    public static toImagesCode(obj:any, parent:string):CodeStr{
        if(!obj){
            return null;
        }
        let code:CodeStr = {
            ValueCode: "",
            DisposeCode: "",
            UIcode: ""
        };;
        code.ValueCode = `\tpublic ${obj.name}:BaseBitmap = null;\n`;
        code.DisposeCode = `\t\tthis.${obj.name} = null;\n`;

        let resName:string = obj.fileName;
        resName = resName.split("/").pop().split(".")[0];
        // UI 代码
        let tem:string = "";
        tem = `
        let ${obj.name} = BaseBitmap.create("${resName}");
        ${parent}.addChild(${obj.name});
        this.${obj.name} = ${obj.name};
        ${obj.name}.setPosition(${obj.xy.split(",")[0]},${obj.xy.split(",")[1]});
        `;
        if(obj.size){
            tem = tem + 
            `${obj.name}.width = ${obj.size.split(",")[0]};
        ${obj.name}.height = ${obj.size.split(",")[1]};
        `
        }

        code.UIcode = tem;
        return code;
    }

    /**
     * 生成框架中的文本代码
     * @param obj 数据对象
     * @param parent 
     */
    public static toTFCode(obj:any, parent:string):CodeStr{
        if(!obj){
            return;
        }
        let code:CodeStr = {
            ValueCode: "",
            DisposeCode: "",
            UIcode: ""
        };;
        code.ValueCode = `\tpublic ${obj.name}:BaseTextField = null;\n`;
        code.DisposeCode = `\t\tthis.${obj.name} = null;\n`;
        
        let color:string = obj.color;
        color = color.replace("#", "0x");
        let tem:string = "";
        tem = `
        let ${obj.name} = ComponentMgr.getTextField('11', ${obj.fontSize}, ${color});;
        ${parent}.addChild(${obj.name});
        ${obj.name}.setPosition(${obj.xy.split(",")[0]},${obj.xy.split(",")[1]});
        `
        if(obj.size){
            tem = tem + 
            `${obj.name}.width = ${obj.size.split(",")[0]};
        `
        }
    
        if(obj.strokeColor){
            tem = tem +
            `${obj.name}.strokeColor = ${obj.strokeColor.replace("#", "0x")};
        `
        }
    
        if(obj.vAlign){
            tem = tem +
            `${obj.name}.verticalAlign = "${obj.vAlign}";
        `
        }
        code.UIcode = tem;
        return code;
    }

    public static toComUI(url:string, parent:string, obj?:any):CodeStr{
        if(!url){
            return
        }
        obj = obj || {};
        obj.name = obj.name || "root";
        obj.xy = obj.xy || "0,0";
        let name:string = obj.name ||"root";

        let cpm:any = FairyUtil.cmpParse(url);
        let displayList:Array<any> = cpm.component.displayList;
        let type = cpm.component.extention;
        let code:CodeStr = null;
        // 组件本身
        if(!obj.size){
            obj["size"] = cpm.component.size;
        }
        switch (type) {
            case "Button":
                code = this.toBtnUI(obj, parent, displayList);
                break;
            
            default:
                code = this.comCode(obj, parent);
                break;
        }

        // 组件包含的其他元素
        displayList.forEach(element => {
            if (element.image) {
                code = this.addCode(code, this.toImagesCode(element.image, name)); 
            } else if (element.component) {
                let item:any = element.component;
                code = this.addCode(code, this.toComUI(item.fileName, name, item));
            } else if (element.text) {
                code = this.addCode(code, this.toTFCode(element.text, name));
            } else if (element.list) {
                
            }
        });

        return code;
    }

    public static toBtnUI(obj:any, parent:string, displayList:any):CodeStr{
        let code:CodeStr = {
            ValueCode: "",
            DisposeCode: "",
            UIcode: ""
        };;
        code.ValueCode = `\tpublic ${obj.name}:BaseButton = null;\n`;
        code.DisposeCode = `\t\tthis.${obj.name} = null;\n`;

        /**
         * 获取按钮资源，默认第一张图片为按钮资源
         */
        let btnimg:any = null;
        if(displayList[0].image){
            btnimg = displayList.shift()["image"];
            let imgName:string = btnimg.fileName;
            imgName = imgName.split("/").pop().split(".")[0];
            code.ValueCode = `\tpublic ${this.name}OnClick:Function = null;\n`;
            code.DisposeCode = `\t\tthis.${this.name}OnClick = null\n`;
            code.UIcode = `
        let ${obj.name} = ComponentMgr.getButton(${imgName}, "", this.${obj.name}OnClick, this.obj);
        ${parent}.addChild(${obj.name});
        this.${obj.name} = ${obj.name};
        ${obj.name}.setPosition(${obj.xy.split(",")[0]},${obj.xy.split(",")[1]});
        `
        }

        return code;
    }

    public static comCode(obj:any, parent:string):CodeStr{
        let code:CodeStr = {
            ValueCode: "",
            DisposeCode: "",
            UIcode: ""
        };
        code.ValueCode = `\tpublic ${obj.name}:BaseDisplayObjectContainer = null;\n`;
        code.DisposeCode = `\t\tthis.${obj.name} = null;\n`;

        code.UIcode = `
        let ${obj.name} = new BaseDisplayObjectContainer();
        ${parent}.addChild(${obj.name});
        this.${obj.name} = ${obj.name};
        ${obj.name}.setPosition(${obj.xy.split(",")[0]},${obj.xy.split(",")[1]});
        `

        return code;
    }

    /**
     * 两个代码合并
     * @param code1 
     * @param code2 
     */
    public static addCode(code1:CodeStr, code2:CodeStr):CodeStr{
        if(!code1 || !code2){
            return;
        }
        let code:CodeStr = {
            ValueCode: "",
            DisposeCode: "",
            UIcode: ""
        };;
        code.UIcode = code1.UIcode + code2.UIcode;
        code.DisposeCode = code1.DisposeCode + code2.DisposeCode;
        code.ValueCode = code1.ValueCode + code2.ValueCode;
        return code;
    }
}