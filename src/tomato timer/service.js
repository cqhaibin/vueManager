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
        this.$state = this.$store.state;
        this.loadData();
    }
    addRecord (){
        this.$store.commit(Keys.addRecord,this.currentRecord);
        this.storage.changeValue(this.storageKey, JSON.stringify(this.$state.tomato.records));
    }

    getRecords(){
        return this.$state.tomato.records;
    }

    clear(){
        this.$store.commit(Keys.removeAllRecord);
        this.storage.changeValue(this.storageKey,"");
    }

    loadData(){
        var str = this.storage.readValue(this.storageKey);
        if(str){
            let arrayData = JSON.parse(str);
            arrayData.forEach((data,index)=>{
                this.$store.commit(Keys.addRecord, data);
            });
        }
    }

    /**
     * 开始做事情
     * @param type TYPE，事件状态
     * @param duration 时长，秒
     * @param content 内容
     */
    start(type, duration, content){        
        let record = new Record(), nowDate = new Date();
        record.id = _.uniqueId(this._prefix);
        record.begTime = nowDate;
        record.endTime = new Date( nowDate.getTime() + duration * 1000 );
        record.type = type;
        record.content = content;
        this.currentRecord = record;
    }
    /**
     * 停止做事情 
     * @param isauto 是否自动停止
     */
    stop(isauto){
        if(!this.currentRecord){
            return;
        }
        this.currentRecord.stopTime = new Date();
        this.currentRecord.state = isauto ? true : false;
        this.addRecord();
    }
}

export default Service;