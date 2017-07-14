import Keys from './keys';

class Service{
    constructor(store, storage){
        this.$store = store;
        this.storage = storage;
        this.storageKey = "RECORDS"
    }
    addRecord (){
        this.$store.commit(Keys.addRecord,{id: "id"});
        this.storage.changeValue(this.storageKey, JSON.stringify(this.$store.state.records));
    }
}

export default Service;