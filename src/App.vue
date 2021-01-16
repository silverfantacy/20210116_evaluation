<template>
  <div id="app">
    <img src="./assets/logo.png" height="200" />
    <!-- <el-button type="primary" @click="shareResult()">分享結果</el-button> -->
    <div class="container">
      <h2>工作壓力管理效能自我評量表</h2>
      <p>
        ※作答說明:您想要知道自己的工作壓力如何嗎？請您根據下面的題
        目，想一想在 最近三個月內 每一個敘述發生的次數，然後以 0~4，
        填入最符合您的狀況。
      </p>
    </div>
    <transition-group name="fade">
      <div class="container"  v-for="(item,key) in questions" :key="key">
        <el-card class="box-card question-card" v-if="key == showCard">
          <h3 class="title">{{ item.topic}}</h3>
          <el-radio-group v-model="anser[item.id]" class="anser">
            <el-radio v-for="(option,key) in item.options" :key="key" :label="option.fraction" >{{ option.option }}</el-radio>
          </el-radio-group>
          <el-button type="primary" @click="nextCard(key + 1)" v-if="key != questions.length - 1">下一題</el-button>
          <el-button type="primary" @click="calculation()" v-else>計算結果計算結果</el-button>
        </el-card>
      </div>

      <!-- 結果 -->
      <div class="container" v-if="resultCard">
        <el-card class="box-card result-card">
          <h3>總計 {{ totalPoints }} 分</h3>
          <h2 class="title">{{ resultCard.title }}</h2>
          <p>{{ resultCard.description }}</p>
          <el-button type="primary" @click="shareResult()">分享結果</el-button>
        </el-card>
      </div>
      
    </transition-group>
    
    <!-- <HelloWorld msg="Welcome to Your Vue.js App" /> -->
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
// import HelloWorld from "./components/HelloWorld.vue";
// import { ElLoading } from "element-plus";
// const axios = require('axios').default;
// import questionAPI from './api/question '

let rowdata;

export default {
  name: "App",
  components: {
    // HelloWorld,
  },
  data() {
    return {
      questions: [],
      anser: [],
      showCard: 0,
      totalPoints: 0,
      resultCard: null,
    };
  },
  computed: {
    // a computed getter
    userDate() {
      // `this` points to the vm instance
      let vm = this
      let row = []
      vm.anser.forEach((item,key) => {
        if(key == 0) return
        row[key] = vm.questions[key]['options'].filter(e => {
          console.log('item', item, 'e', e)
          return item == e.fraction
        })
      })
      return row
    }
  },
  async mounted() {
    this.questions = [{"id":1,"topic":"我覺得我對工作並不是很熱中","options":[{"option":"從不","fraction":0},{"option":"偶而","fraction":1},{"option":"有時","fraction":2},{"option":"常常","fraction":3},{"option":"總是","fraction":4}]},{"id":2,"topic":"就算有足夠的睡眠我仍然感到很疲倦","options":[{"option":"從不","fraction":0},{"option":"偶而","fraction":1},{"option":"有時","fraction":2},{"option":"常常","fraction":3},{"option":"總是","fraction":4}]},{"id":3,"topic":"我想完成工作上的職責卻遭受挫折","options":[{"option":"從不","fraction":0},{"option":"偶而","fraction":1},{"option":"有時","fraction":2},{"option":"常常","fraction":3},{"option":"總是","fraction":4}]},{"id":4,"topic":"一點點的不方便就會讓我感到不耐煩或不高興","options":[{"option":"從不","fraction":0},{"option":"偶而","fraction":1},{"option":"有時","fraction":2},{"option":"常常","fraction":3},{"option":"總是","fraction":4}]},{"id":5,"topic":"在時間與精力上持續地付出讓我想退縮","options":[{"option":"從不","fraction":0},{"option":"偶而","fraction":1},{"option":"有時","fraction":2},{"option":"常常","fraction":3},{"option":"總是","fraction":4}]},{"id":6,"topic":"我感覺我的工作是負面的、無用的或令人憂鬱的","options":[{"option":"從不","fraction":0},{"option":"偶而","fraction":1},{"option":"有時","fraction":2},{"option":"常常","fraction":3},{"option":"總是","fraction":4}]},{"id":7,"topic":"我做決策的能力似乎已不如以前","options":[{"option":"從不","fraction":0},{"option":"偶而","fraction":1},{"option":"有時","fraction":2},{"option":"常常","fraction":3},{"option":"總是","fraction":4}]},{"id":8,"topic":"我認為我的工作效率並沒有完全發揮","options":[{"option":"從不","fraction":0},{"option":"偶而","fraction":1},{"option":"有時","fraction":2},{"option":"常常","fraction":3},{"option":"總是","fraction":4}]},{"id":9,"topic":"我工作的品質並沒有達到應有的品質","options":[{"option":"從不","fraction":0},{"option":"偶而","fraction":1},{"option":"有時","fraction":2},{"option":"常常","fraction":3},{"option":"總是","fraction":4}]},{"id":10,"topic":"我感到身體的、情感的或精神的空虛耗弱","options":[{"option":"從不","fraction":0},{"option":"偶而","fraction":1},{"option":"有時","fraction":2},{"option":"常常","fraction":3},{"option":"總是","fraction":4}]},{"id":11,"topic":"我的抵抗力降低","options":[{"option":"從不","fraction":0},{"option":"偶而","fraction":1},{"option":"有時","fraction":2},{"option":"常常","fraction":3},{"option":"總是","fraction":4}]},{"id":12,"topic":"我的性慾降低","options":[{"option":"從不","fraction":0},{"option":"偶而","fraction":1},{"option":"有時","fraction":2},{"option":"常常","fraction":3},{"option":"總是","fraction":4}]},{"id":13,"topic":"為了應付工作，我的食量改變。咖啡、茶越喝越多，菸抽得更多，或者使用更多的酒精或藥物","options":[{"option":"從不","fraction":0},{"option":"偶而","fraction":1},{"option":"有時","fraction":2},{"option":"常常","fraction":3},{"option":"總是","fraction":4}]},{"id":14,"topic":"對於別人的需要和問題，我變得冷淡無情","options":[{"option":"從不","fraction":0},{"option":"偶而","fraction":1},{"option":"有時","fraction":2},{"option":"常常","fraction":3},{"option":"總是","fraction":4}]},{"id":15,"topic":"我和老闆、同事、朋友或家人的溝通似乎不良","options":[{"option":"從不","fraction":0},{"option":"偶而","fraction":1},{"option":"有時","fraction":2},{"option":"常常","fraction":3},{"option":"總是","fraction":4}]},{"id":16,"topic":"我很健忘","options":[{"option":"從不","fraction":0},{"option":"偶而","fraction":1},{"option":"有時","fraction":2},{"option":"常常","fraction":3},{"option":"總是","fraction":4}]},{"id":17,"topic":"我很難集中精神","options":[{"option":"從不","fraction":0},{"option":"偶而","fraction":1},{"option":"有時","fraction":2},{"option":"常常","fraction":3},{"option":"總是","fraction":4}]},{"id":18,"topic":"我很容易感到煩躁","options":[{"option":"從不","fraction":0},{"option":"偶而","fraction":1},{"option":"有時","fraction":2},{"option":"常常","fraction":3},{"option":"總是","fraction":4}]},{"id":19,"topic":"我有一種不滿足、做錯事或遺失什麼東西的感覺","options":[{"option":"從不","fraction":0},{"option":"偶而","fraction":1},{"option":"有時","fraction":2},{"option":"常常","fraction":3},{"option":"總是","fraction":4}]},{"id":20,"topic":"當我自問為何要起床去工作時，唯一的答案是「賺錢」","options":[{"option":"從不","fraction":0},{"option":"偶而","fraction":1},{"option":"有時","fraction":2},{"option":"常常","fraction":3},{"option":"總是","fraction":4}]}];

    



    // ElLoading.service();
    // await this.axios
    //   .get(
    //     "https://script.google.com/macros/s/AKfycbwyzSIPUB4RUhmf1-th6vQDd5uGfGGekrkYLydm2rda3BNfi_kj44R3/exec",
    //     {
    //       params: {
    //         url:
    //           "https://script.google.com/macros/s/AKfycbyTIFz7xtHEp8xiomayZb7yEMxdMPTsNwqXrjYG61rmeq6YNGVSfwM1eg/exec",
    //       },
    //     }
    //   )
    //   .then((request) => {
    //     console.log(request);
    //     rowdata = request.data;
    //     if (request.data && request.data.length > 0) {
    //       this.questions = request.data;
    //     }
    //     ElLoading.service().close();
    //   });

      
  },
  methods: {
    nextCard(key) {
      console.log(`下一題是${key}`)
      let vm = this
      vm.showCard = key
    },
    calculation() {
      let vm = this
      vm.showCard = null
      console.log('當前答案',vm.anser)
      let tmpAnser = []
      vm.anser.forEach(e => {
        if(e) {
          tmpAnser = [...tmpAnser, e];
        }
      })

      let reducer = (accumulator, currentValue) => accumulator + currentValue;
      console.log('分數',tmpAnser.reduce(reducer))
      vm.totalPoints = tmpAnser.reduce(reducer)

      let showResult = []
      if(vm.totalPoints > 56) {
        showResult.title = '危險'
        showResult.description = '您正承受著非常大的工作壓力，已經是崩潰沒辦法應付了，您必須趕緊學習新的方法來處理您所面臨的狀況。'
      } else
      if(vm.totalPoints > 41) {
        showResult.title = '警戒'
        showResult.description = '您的工作壓力頗大，您已經是在瀕臨崩潰邊緣了，要非常小心，您必須趕緊做一些防備來避免工作崩潰。'
      } else
      if(vm.totalPoints > 26) {
        showResult.title = '黃燈'
        showResult.description = '表示您正遭受到工作壓力的痛苦，雖然還不足以到您無法應付的程度，但是也要提早做預防準備。'
      } else {
        showResult.title = '安全'
        showResult.description = '表示您目前能夠適當地處理您的工作壓力，您的工作並沒有造成您太大的負擔。'
      }

      vm.resultCard = showResult

    },
    shareResult() {
      var url = location.href;
      console.log('url',url)
      // location.href = url
      history.pushState(null,null,`?user=2132&result=${this.totalPoints}`);
    }
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

    return { state };
  },
};
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

.container {
  width: 90%;
  margin: 0 auto;
  @media screen and (min-width: 425px){
    width: 60%;
  }
}

.question-card {
  .el-card {
    .el-card__body {
      min-height:300px;
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      align-items: center;
      .title {
        width:100%;
      }
      .anser {
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        
        label {
          width: 100px;
          margin-right: 0;
          margin-top: 20px;
          margin-bottom: 20px;
        }
      }
    }
  }
}
</style>
