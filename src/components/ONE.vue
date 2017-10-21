<template>
  <div class="ONE" v-if="datas">
    <header class="header">
      <div class="date">
        <p>{{times[0]}}</p>
        <span>/</span>
        <p>{{times[1]}}</p>
        <span>/</span>
        <p>{{times[2]}}</p>
      </div>
      <p class="local">
        <span>地球</span>
        <span>对流层</span>
        <span>-275℃</span>
      </p>
    </header>
    <section class="content">
      <div class="illustr">
        <img class="picture" :src="datas.content_list[0].img_url" alt="">
        <p class="name">{{datas.content_list[0].title}}
          <span>|</span>{{datas.content_list[0].pic_info}}</p>
        <p class="text">{{datas.content_list[0].forward}}</p>
        <p class="author">{{datas.content_list[0].words_info}}</p>
      </div>
      <div class="fn">
        <p class="reporter">
          <img src="../assets/img/note_dark@2x.png" alt="">小记
        </p>
        <p class="share">
          <img src="../assets/img/share_gray@2x.png" alt="">
        </p>
        <p class="collect">
          <img src="../assets/img/collect_gray@2x.png" alt="">
        </p>
        <p class="great">
          <img src="../assets/img/like_gray@2x.png" alt="">
          <span>{{datas.content_list[0].like_count}}</span>
        </p>
      </div>
    </section>
    <div class="column">
      <p class="title" @click="spreadView">一个VOL.{{datas.menu.vol}}</p>
      <transition name="spread" @enter="enter" @leave="leave">
        <transition-group name="flip-list" tag="ul" class="list" :style="{height:spread?viewHeight:0}">
          <li v-for="(item,index) in datas.menu.list" :key="index" :class="{'spreadLi':!spread}" @click="gotoAddress({path:'/' + type[item.content_type-1],query:{id:item.content_id}})">
            <span>{{titlesCategory(item)}}</span>
            <p class="text">{{item.title}}</p>
          </li>
        </transition-group>
      </transition>
    </div>
    <content-list :datas="datas" :titles="titles"></content-list>
  </div>
</template>

<script>
import contentList from './contentlist';
import { getNowDatas, getDateDatas } from '../service/getData';
export default {
  name: 'ONE',
  props: ['aaa'],
  data() {
    return {
      datas: '',
      date: '',
      dataId: [],
      titles: ["ONE STORY", "阅读", "连载", "问答", "音乐", "影视", '', '', "电台"],
      type: ['essay', 'serial', 'question', 'music', 'movie'],// 未完善
      spread: false
    }
  },
  components: {
    contentList
  },
  methods: {
    spreadView(e) {
      this.spread = !this.spread;
    },
    gotoAddress(path) {
      if (this.spread) {
        this.$router.push(path);
      }
    },
    enter(el, done) {
      el.style.height = viewHeight;
    },
    leave(el, done) {
      el.style.height = '0px';
    },
    titlesCategory(data) {
      if (data.tag) {
        return data.tag.title
      }
      return this.titles[data.content_type]
    }
  },
  created() {
    getNowDatas().then(res => {
      this.datas = res.data;
      this.date = res.data.weather.date;
      console.log('res', res);
    })
    // getDateDatas('2017-10-20').then(res => {
    //   this.datas = res.data;
    //   this.date = res.data.weather.date;
    //   console.log('res', res);
    // })
  },
  computed: {
    times() {
      return this.date.split('-')
    },
    viewHeight() {
      return (this.datas.menu.list.length * 55) * 2 / 100 + 'rem';
    }
  }
}
</script>

<style scoped>
.header {
  height: 1.28rem;
  width: 7.5rem;
  background: #fff;
}

.header .date {
  font-size: 0.4rem;
  line-height: 0.76rem;
  text-align: center;
}

.header .date>p {
  display: inline-block;
}

.header .local {
  text-align: center;
  font-size: 0.12rem;
}

.content {
  background: #fff;
  height: auto;
}

.content .picture {
  width: 100%;
}

.content .name {
  text-align: center;
  font-size: 0.24rem;
  line-height: 0.7rem;
  color: #ccc;
}

.content .name>span {
  margin: 0 5px
}

.content .text {
  width: 5.9rem;
  margin: 0.26rem 0.8rem 0;
  font-size: 0.28rem;
  line-height: 0.56rem;
}

.content .author {
  text-align: center;
  font-size: 0.24rem;
  line-height: 0.96rem;
  color: #ccc;
}

.fn {
  margin-top: 0.24rem;
  height: 0.74rem;
  font-size: 0.22rem;
  overflow: hidden;
}

.fn>p {
  color: #ccc;
  float: right;
  height: 0.4rem;
}

.fn>p>img {
  width: 0.32rem;
  height: 0.32rem;
}

.fn .reporter {
  float: left;
  padding-left: 0.5rem;
}

.fn .great {
  width: 1rem;
  position: relative;
}

.fn .collect {
  margin: 0 0.3rem
}

.fn .share {
  margin: 0 0.3rem
}

.fn .great>span {
  position: absolute;
  top: 0;
  font-size: 0.12rem;
  line-height: 1;
  color: #ccc;
}

.column {
  position: relative;
  border-top: .2rem solid #eee;
  line-height: 0.8rem;
  background: #fff;
}

.column .title {
  text-align: center;
  height: 0.8rem;
  font-size: 0.26rem;
  color: #ccc;
  position: relative;
  z-index: 99;
}

.column .list {
  transition: all .4s;
}

.list>li {
  margin-bottom: .33rem;
  padding-left: 0.62rem;
  transition: all .4s;
}

.list>li>span {
  font-size: 0.24rem;
  line-height: 0.28rem;
  display: block;
}

.list>li>.text {
  font-size: 0.26rem;
  line-height: 0.5rem;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.list .spreadLi {
  position: absolute;
  top: 0;
  opacity: 0;
}

.spread-enter-active {
  transition: all .4s;
}
</style>
