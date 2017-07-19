export class Record{
    constructor(){
        this.id=0,
        this.content=null;
        this.begTime=null;
        this.endTime=null; 
        this.complete = false; //状态：完成，未完成等
        this.type=null; //类型：休息、工作
        this.stopTime = null; //停止时间
    }
}
/**
 * 设置配置模型
 */
export class Setting{
    constructor( workTime, restTime){
        this.workTime = workTime;
        this.restTime = resetTime;
    }
}