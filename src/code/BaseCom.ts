import BaseUI, { UIdata, TFUIdata, ComUI, CodeStr } from "./BaseUI";
import ImageUI from "./ImageUI";
import TFUI from "./TFUI";
import FairyUtil from "../fairyGUIparse/FairyUtil";

/*
 *@description: 组件生成模板
 *@author: hwc 
 *@date: 2020-05-02 13:37:45
 *@version 1.0.0
 */

export default class BaseCom extends BaseUI{
    public resURL:string = null; // 组件的文件路径
    public fileName:string = null; //文件在相对于包的更根目录的文件路径
    public type:string = null; // 组件类型
    public displayList:Array<any> = null;
    
    constructor(data:ComUI, parent:string){
        super(data, parent);
        this.fileName = data.fileName;
        this.resURL = data.src;
        this.getDisplayList();
    }

    private getDisplayList(){
        let cpm:any = FairyUtil.cmpParse(this.fileName);
        this.displayList = cpm.component.displayList;
        this.type = cpm.extends;
    }

    private getComCode(){
        switch (this.type) {
            case "botton":
                return this.btnCode();
            
            case "progress":
                return this.proCode();
        
            default:
                return this.comCode();
        }
    }
    private btnCode():CodeStr{
        let code:CodeStr = null;
        code.ValueCode = "";
        code.DisposeCode = "";


        return code;
    }

    private comCode():CodeStr{
        let code:CodeStr = null;
        code.ValueCode = `\tpublic ${this.name}:BaseDisplayObjectContainer = null;\n`;
        code.DisposeCode = `\t\tthis.${this.name} = null;\n`;

        code.UIcode = `
        let ${this.name} = new BaseDisplayObjectContainer();
        ${this.parent}.addChild(${this.name});
        this.${this.name} = ${this.name};
        ${this.name}.setPositon(${this.x}, ${this.y});
        `

        return code;
    }

    private proCode():string{
        return ""
    }

    public toCode():CodeStr{
        this.displayList.forEach(element => {
            if (element.image) {
               new ImageUI(<UIdata>element.image, this.name);
            } else if (element.component) {
                new BaseCom(<ComUI>element.component, this.name);
            } else if (element.text) {
                new TFUI(<TFUIdata>element.text, this.name);
            } else if (element.list) {
                
            }
        });
        return super.toCode();
    }
}