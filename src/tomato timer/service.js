import Keys from './keys';
import {Record} from './model';
import _ from 'lodash';

class Service{
    constructor(store, storage){
        this.$store = store;
        this.storage = storage;
        this.storageKey = "RECORDS";
        this.currentRecord = null;
        this._prefix = "record_";
    }
    addRecord (){
        this.$store.commit(Keys.addRecord,this.currentRecord);
        this.storage.changeValue(this.storageKey, JSON.stringify(this.$store.state.records));
    }
    /**
     * 开始做事情
     * @param type TYPE，事件状态
     * @param duration 时长，秒
     */
    start(type, duration){        
        let record = new Record(), nowDate = new Date();
        record.id = _.uniqueId(this._prefix);
        record.begTime = nowDate;
        record.endTime = nowDate.setSeconds(nowDate.getSeconds() + duration);
        record.type = type;
        this.currentRecord = record;
    }
    /**
     * 停止做事情 
     * @param isauto 是否自动停止
     */
    stop(isauto){
        this.currentRecord.stopTime = new Ddate();
        this.currentRecord.state = isauto ? true : false;
        this.addRecord();
    }
}

export default Service;