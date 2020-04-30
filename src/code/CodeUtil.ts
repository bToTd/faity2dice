/*
 *@description: 生成代码时要进行的一些转换
 *@author: hwc 
 *@date: 2020-04-30 12:16:10
 *@version 1.0.0
 */

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
    public static toImagesCode(obj:any, parent:string):string{
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

    /**
     * 生成框架中的文本代码
     * @param obj 数据对象
     * @param parent 
     */
    public static toTFCode(obj:any, parent:string):string{
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
}