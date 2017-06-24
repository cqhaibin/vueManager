<template>
<div class="layout-default">
<div class="header">
    <ul class="nav clearfix">
        <li class="nav-item" v-for="(item,index) in roots" >
            <a href="javascript:void(0)" v-on:click="goto(item, $event)" v-bind:class="{active: item.selected}" >{{item.name}}</a>
        </li>
    </ul>
</div>
<div class="body"> 
    <div class="main">
        <div class="cont">
            <router-view></router-view>                    
        </div> 
    </div>
    <div class="left">
        <ul class="nav nav-child" >
            <li v-for="(item,index) in childs" class="nav-item">
                <router-link :to="item.href" active-class="active" >{{item.name}}</router-link>
            </li> 
        </ul>
    </div>
</div>
</div>
</template>
<script>
import app from 'app';
import store from './nav';

var _app = app.getApp(), router = _app.createContext().router;

export default {
    name: 'layoutdefault',
    computed: {
        childs: function(){
            return this.$store.state.router.childs;
        },
        roots: function(){
            return this.$store.state.router.roots;
        }
    },
    beforeMount:function(){
        this.$store.registerModule('router', store.route);
    },
    methods:{
        goto: function(item, event){ 
            var _event = event, self = this;
            var chooseItem = function(item){
                router.push(item.href);
                self.$store.dispatch('selectRootItem', item);
            }

            self.$store.dispatch('childs',[]);
            _app.loadThridPart(item, chooseItem);
        }
    }
}
</script>