<template>
  <layout description="vue server side render" keywords="egg, vue, webpack, server side render">
    <div class="container">
      <div class="row" v-for="item in lists" :key="item.id">
        <div class="col-lg-10 col-lg-offset-1 col-md-10 col-md-offset-1">
          <div class="post-preview">
              <div :href="item.name">
                  <h2 class="post-title">            
                      <a :href="item.fullId" target="_blank" style="font-size: 26px;">{{item.name}}</a>
                  </h2>
                  <div class="post-content-preview">{{item.repo}}</div>
              </div>
              <div class="post-meta">Posted by hubcarl on {{item.time}}</div>
          </div>
          <hr>
        </div>
      </div>
    </div>
    <div style="text-align:center" v-if="isLoading">
       <img src="../../asset/images/loading.gif">
    </div>
  </layout>
</template>
<style>
  @import "index.css";
</style>
<script type="babel">
  export default {
    components: {

    },
    data(){
      return {
        isFinish: false,
        isLoading : false,
        pageIndex: 1,
        pageSize: 10
      }
    },
    computed: {
      lists(){
        return this.list;
      }
    },
    methods: {
     
    },
    mounted() {
     
    }
  }
</script>

