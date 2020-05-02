/*
 *@description: 数据转换的基类
 *@author: hwc 
 *@date: 2020-04-30 13:52:02
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

export interface CodeStr{
    UIcode:string;
    ValueCode:string;
    DisposeCode:string;
}

/**
 * 数据处理的基类
 */
export default class BaseUI {
    public parent:string;

    public name:string;
    public x:number|string;
    public y:number|string;
    public width:number|string = null;
    public height:number|string = null;

    constructor(data:UIdata, parent:string){
        this.parent = parent;
        this.name = data.name;
        this.x = data.xy.split(",")[0];
        this.y = data.xy.split(",")[1];
        if(data.size){
            this.width = data.size.split(",")[0];
            this.height = data.size.split(",")[1];
        }
    }

    /**
     * 生成框架 UI 代码
     */
    public toCode():CodeStr{
        return {
            UIcode:null,
            ValueCode:null,
            DisposeCode:null
        }
    }
}