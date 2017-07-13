import keys from './keys';

let state = {
    records: [],
    setting: {}
}

let mutations = {
    [keys.addRecord] (state, record) {
        state.records.push(record);
    },
    [keys.removeAllRecord] (state){
        state.records = [];
    },
    [keys.saveSetting] (state, setting){
        state.setting = setting;
    }
}

export default {
    state,
    mutations
}