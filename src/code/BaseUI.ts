/*
 *@description: 数据转换的基类
 *@author: hwc 
 *@date: 2020-04-30 13:52:02
 *@version 1.0.0
 */

 /**
 * 生成框架 UI 代码中需要的数据
 */
interface UIdata{
    name:string;
    x:number|string;
    y:number|string;
    width:number|string;
    height:number|string;
    scaleX?:number|string;
    ScaleY?:number|string;
}

/**
 * 数据处理的基类
 */
export class BaseUI {

}