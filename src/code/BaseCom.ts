import BaseUI, { UIdata, TFUIdata } from "./BaseUI";
import ImageUI from "./ImageUI";
import TFUI from "./TFUI";

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
    
    constructor(data:UIdata, parent:string){
        super(data, parent);
    }

    private getDisplayList(){
        
    }

    public toCode(){
        this.displayList.forEach(element => {
            if (element.image) {
               new ImageUI(<UIdata>element.image, this.name);
            } else if (element.component) {
                new BaseCom(<UIdata>element.component, this.name);
            } else if (element.text) {
                new TFUI(<TFUIdata>element.text, this.name);
            } else if (element.list) {
                
            }
        });
        return super.toCode();
    }
}