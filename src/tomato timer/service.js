import Keys from './keys';

class Service{
    constructor(cxt){
        this.cxt = cxt;
        this.$store = this.cxt.$vue.$store;
    }
    addRecord (){
        this.$store.commit(Keys.addRecord,{id: "id"});
    }
}

export default Service;