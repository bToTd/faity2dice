import BaseUI, { UIdata, TFUIdata, ComUI } from "./BaseUI";
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
                break;
        }
    }
    private btnCode():string{
        let tem:string = "";

        return tem;
    }

    private proCode():string{
        return ""
    }

    public toCode(){
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