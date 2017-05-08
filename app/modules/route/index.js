define(['../../app', '../../chart'],function(app, chart){
    return {
        name: 'croute',
        data: function(){
            return {
                list: []
            }
        },
        beforeCreate:function(){
            chart.install(app.getVue().createContext());
        }
    }
});