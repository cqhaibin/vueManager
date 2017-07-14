/**
 * 本地存储
 */
class LocalStorage{
    constructor () {

    }
    changeValue(name, val){
        window.localStorage.setItem(name,val);
    }
    readValue(name){
        window.localStorage.getItem(name);
    }
}

export default LocalStorage;