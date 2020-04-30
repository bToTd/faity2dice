/*
 *@description: 生成代码时要进行的一些转换
 *@author: hwc 
 *@date: 2020-04-30 12:16:10
 *@version 1.0.0
 */

namespace CodeUtil {

    /**
     * 字符串首字母大写
     * @param str 要转换的字符串
     */
    export function firstChatUpper (str:string):string {
        let firstChat = str[0];
        let tem:string = str.substr(1, str.length);
        return "".concat(firstChat, tem);
    }
}

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