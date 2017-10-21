<template>
  <div id="app">
    <keep-alive>
      <router-view v-if="$route.meta.keepAlive"></router-view>
    </keep-alive>
    <mini-player :show="show" @showPlayer="showPlayer"></mini-player>
    <router-view v-if="!$route.meta.keepAlive"></router-view>
    <transition name="shift-in">
      <img v-if="audioSrc" @click="showPlayer(true)" class="miniBackstage" src="./assets/img/MusicFeedsPlaceHolder@2x.png" alt="">
    </transition>
    <!-- <footer id="footer"></footer> -->
  </div>
</template>

<script>
(function(doc, win) {
  var docEl = doc.documentElement,
    resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize',
    recalc = function() {
      var clientWidth = docEl.clientWidth > 750 ? 750 : docEl.clientWidth;
      if (!clientWidth) { return };
      docEl.style.fontSize = 100 * (clientWidth / 750) + 'px';
    };
  recalc();
  if (!doc.addEventListener) return;
  win.addEventListener(resizeEvt, recalc, false);
  doc.addEventListener('DOMContentLoaded', recalc, false);
})(document, window)

import miniPlayer from './components/miniPlayer'
import { mapState } from 'vuex'
export default {
  name: 'app',
  data() {
    return {
      nav: ['ONE', 'ALL', 'ME'],
      show: false
    }
  },
  components: {
    miniPlayer
  },
  computed: {
    ...mapState([
      'audioSrc'
    ])
  },
  methods: {
    showPlayer(v) {
      this.show = v
    },
  }
}
</script>

<style>
@import url('assets/css/common.scss');
.navTabs {
  position: fixed;
  z-index: 999;
  left: 0;
  bottom: 0;
  border-top: 1px solid #b2b2b2;
  height: 0.98rem;
  width: 100%;
  background: #fefefe;
}

.navTabs>li {
  display: inline-block;
  width: 33.3%;
}

.navTabs>li>a {
  display: inline-block;
  width: 100%;
  height: 0;
  padding-top: 0.98rem;
  vertical-align: top;
  overflow: hidden;
}

.navTabs .ONE {
  background: url(./assets/img/homeSelectedV4@2x.png) no-repeat center;
  background-size: 0.8rem
}

.navTabs .ALL {
  background: url(./assets/img/allUnselectedV4@2x.png) no-repeat center;
  background-size: 0.8rem
}

.navTabs .ME {
  background: url(./assets/img/meUnselectedV4@2x.png) no-repeat center;
  background-size: 0.8rem
}

.miniBackstage {
  position: fixed;
  top: 2rem;
  right: -20px;
  z-index: 998;
  width: 40px;
}

.shift-in-enter-active,
.shift-in-leave-active {
  transition: all .4s;
}

.shift-in-enter,
.shift-in-leave-to {
  right: -60px;
}
</style>
