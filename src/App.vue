<template>
  <div id="app">
    
    <img src="./assets/logo.png">
    <div>
      <p>
        If Element Plus is successfully added to this project, you'll see an
        <code v-text="'<el-button>'"></code>
        below
      </p>
      <el-button type="primary">el-button</el-button>
    </div>
    <HelloWorld msg="Welcome to Your Vue.js App"/>
  </div>
</template>

<script>
import {
  // createApp,
  // onMounted,
  // onUpdated,
  // onUnmounted,
  reactive,
  // ref,
  // computed,
} from "vue";
import HelloWorld from './components/HelloWorld.vue'
import { ElLoading } from 'element-plus';
// const axios = require('axios').default;
// import questionAPI from './api/question '

let rowdata

export default {
  name: 'App',
  components: {
    HelloWorld,
  },
  data() {
    return {
      questions: []
    }
  },
  async mounted() {
    ElLoading.service();
    await this.axios.get(
      'https://script.google.com/macros/s/AKfycbwyzSIPUB4RUhmf1-th6vQDd5uGfGGekrkYLydm2rda3BNfi_kj44R3/exec', {
      params: {
        url: "https://script.google.com/macros/s/AKfycbyTIFz7xtHEp8xiomayZb7yEMxdMPTsNwqXrjYG61rmeq6YNGVSfwM1eg/exec"
      }
    })
    .then((request) => {
        console.log(request)
        rowdata = request.data
        if(request.data && request.data.length >0) {
          this.questions = request.data;
        }
        ElLoading.service().close();
      })
    
  },
  setup() {
    // 測試用失敗
    // questionAPI.get().then((request) => console.log(request))
    


    const state = reactive({
      // message: "Hello Vue.js!",
      // img_url: "",
      settings: [],
      ratio: null,
      showPercent: null,
      selected_id_tmp: null,
      selected_url_tmp: null,
      data: rowdata,
    });
    

    return { state, }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
