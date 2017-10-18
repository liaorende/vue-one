<template>
    <transition name="exhibition">
        <div v-show="show" class="detailDialog" @click="isShow">
            <div class="swiper-container">
                <div class="swiper-wrapper">
                    <div class="swiper-slide">
                        <div class="lyricView">
                            <pre v-html="dialogInfo.lyric"></pre>
                        </div>
                    </div>
                    <div class="swiper-slide">
                        <img class="cover" :src="dialogInfo.cover" alt="">
                        <pre v-html="dialogInfo.info"></pre>
                    </div>
                </div>
                <!-- 如果需要分页器 -->
                <div class="swiper-pagination"></div>
            </div>
        </div>
    </transition>
</template>

<script>

import Swiper from '../../static/js/swiper-3.4.2.min.js'

export default {
    data() {
        return {
            swiper: null
        }
    },
    props: {
        dialogInfo: null,
        show: Boolean
    },
    mounted() {
        // console.log('dialogInfo.lyric----', this.dialogInfo.lyric)
    },
    updated() {
        // 初始display:none影响swiper实例生成 需在dom渲染完成swiper实例化
        if (this.swiper) return
        this.swiper = new Swiper('.swiper-container', {
            pagination: '.swiper-pagination'
        });
    },
    methods: {
        isShow() {
            this.$emit('show', false)
        }
    },
    computed: {

    }
}
</script>

<style lang="scss" scoped>
@import url("../assets/css/swiper-3.4.2.min.css");
.detailDialog {
    position: fixed;
    width: 100%;
    height: 13.34rem;
    z-index: 9;
    top: 0;
    background: #fff;
    pre {
        font-family: PingFangSC-Regular, sans-serif;
        font-size: .25rem;
        text-align: center;
        white-space: pre-wrap;
        word-wrap: break-word;
    }
    .lyricView {
        overflow: auto; // width: 6rem;
        height: 10rem;
        margin: .5rem auto 0;
    }
    .cover {
        display: block;
        margin: 1rem auto 0;
        width: 2.47rem;
    }
    .swiper-container {
        height: 13.34rem;
    }
    .swiper-pagination {
        position: fixed;
        bottom: .3rem;
    }
}


.exhibition-enter-active,
.exhibition-leave-active {
    transition: all .4s;
}

.exhibition-enter,
.exhibition-leave-to {
    top: 13.34rem;
}
</style>

