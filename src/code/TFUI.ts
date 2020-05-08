import BaseUI, { TFUIdata, CodeStr } from "./BaseUI";

/*
 *@description: 生成框架中的文本代码
 *@author: hwc 
 *@date: 2020-05-01 20:41:50
 *@version 1.0.0
 */

export default class TFUI extends BaseUI{
    public fontSize:string = null;
    public fontColor:string = null;
    public strokeColor:string = null;
    public vAlign:string = null;

    constructor(TFdata:TFUIdata, parent:string){
        super(TFdata, parent);
        this.fontSize = TFdata.fontSize;
        this.fontColor = TFdata.color.replace("#", "0x");
        this.strokeColor = TFdata.strokeColor.replace("#", "0x");
        this.vAlign = TFdata.vAlign;
    }

    public toCode():CodeStr{
        let code:CodeStr = null;
        code.ValueCode = `\tpublic ${this.name}:BaseBitmap = null;\n`;
        code.DisposeCode = `\t\tthis.${this.name} = null;\n`;
        
        let tem:string = "";
        tem = `
        let ${this.name} = ComponentMgr.getTextField('11', ${this.fontSize}, ${this.fontColor});;
        ${this.parent}.addChild(${this.name});
        ${this.name}.setPosition(${this.x},${this.y});
        `
        if(this.width || this.height){
            tem = tem + 
            `${this.name}.width = ${this.width};
        ${this.name}.height = ${this.height};
        `
        }
    
        if(this.strokeColor){
            tem = tem +
            `${this.name}.strokeColor = ${this.strokeColor};
        `
        }
    
        if(this.vAlign){
            tem = tem +
            `${this.name}.verticalAlign = "${this.vAlign}";
        `
        }
        code.UIcode = tem;
        return code;
    }
}