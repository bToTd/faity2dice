/*
 *@description: 生成图片代码模板的类
 *@author: hwc 
 *@date: 2020-05-01 20:21:10
 *@version 1.0.0
 */

import BaseUI, { UIdata, CodeStr } from "./BaseUI";


export default class ImageUI extends BaseUI {
    public resName:string;

    constructor(data:UIdata, parent:string){
        super(data, parent);
        this.resName = data.resName;
    }

    public toCode():CodeStr{
        let code:CodeStr = null;
        code.ValueCode = `\tpublic ${this.name}:BaseBitmap = null;\n`;
        code.DisposeCode = `\t\tthis.${this.name} = null;\n`;

        // UI 代码
        let tem:string = "";
        tem = `
        let ${this.name} = BaseBitmap.create("${this.resName}");
        ${this.parent}.addChild(${this.name});
        this.${this.name} = ${this.name};
        ${this.name}.setPosition(${this.x},${this.y});
        `;
        if(this.width || this.height){
            tem = tem + 
            `${this.name}.width = ${this.width};
        ${this.name}.height = ${this.height};
        `
        }

        code.UIcode = tem;
        return code;
    }
}