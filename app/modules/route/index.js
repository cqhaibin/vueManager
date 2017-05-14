define(['../../app', '../../chart'],function(app, chart){
    return {
        name: 'croute',
        data: function(){
            return {
                list: []
            }
        },
        beforeCreate:function(){
            debugger
            chart.install(app.getApp().createContext());
        }
    }
});