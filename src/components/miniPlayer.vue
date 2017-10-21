<template>
    <div>
        <transition name="opc">
            <div v-show="show" class="warp" @touchmove.prevent @click="hideView"></div>
        </transition>
        <transition name="drop">
            <div v-show="show" class="miniPlayer">
                <audio ref="audio" :src="audioSrc" @timeupdate="timeupdate" @playing="totalTime"></audio>
                <p class="audioName">{{audioAuthor}}</p>
                <div class="progress">
                    <div class="progress-bar"></div>
                    <div class="progress-already-bar" :style="{width:alreadyPlay}">
                        <span class="progress-bar-ball"></span>
                    </div>
                    <span class="currentTime">{{currentTime||'--:--'}}</span>
                    <span class="totalTime">{{duration||'--:--'}}</span>
                </div>
                <p class="audioAuthor">{{audioName}}</p>
                <div class="control">
                    <span class="before"></span>
                    <span :class="{currentPlay:playStatus, currentPause:!playStatus}" @click="playAudio"></span>
                    <span class="after"></span>
                </div>
            </div>
        </transition>
    </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
import { add2Zero } from '../base/utils'
export default {
    data() {
        return {
            currentTime: '',
            duration: '',
            alreadyPlay: '',
            playStatus: false
        }
    },
    props: {
        show: Boolean
    },
    mounted() {

    },
    updated() {

    },
    methods: {
        ...mapMutations([
            'GET_AUDIO_CURRENTTIME', 'MUSIC_AUDIO_STATUS', 'READ_AUDIO_STATUS'
        ]),
        timeupdate() {
            this.alreadyPlay = (this.$refs.audio.currentTime / this.$refs.audio.duration) * 100 + '%';
            this.currentTime = add2Zero(Math.floor(this.$refs.audio.currentTime))
            if (!this.readAudioStatus) return;
            this.GET_AUDIO_CURRENTTIME(this.$refs.audio.currentTime)
        },
        hideView() {
            this.$emit('showPlayer', false)
        },
        totalTime() {
            this.duration = add2Zero(Math.floor(this.$refs.audio.duration))
        },
        playAudio() {
            this.$refs.audio.paused ? this.$refs.audio.play() : this.$refs.audio.pause()
            this.playStatus = this.$refs.audio.paused;
        }
    },
    computed: {
        ...mapState([
            'audioSrc', 'audioName', 'audioAuthor', 'musicAudioStatus', 'readAudioStatus'
        ]),
        // currentBar() {
        //     if (this.$refs.audio.currentTime) {
        //         return Math.floor(this.$refs.audio.currentTime / this.$refs.audio.duration) * 100 + '%'
        //     }
        // }
    },
    watch: {
        musicAudioStatus() {
            if (this.musicAudioStatus) {
                this.READ_AUDIO_STATUS(false);
                this.$nextTick(() => {
                    this.$refs.audio.play()
                })
            } else {
                this.$refs.audio.pause()
            }
        },
        readAudioStatus() {
            if (this.readAudioStatus) {
                this.MUSIC_AUDIO_STATUS(false);
                this.$nextTick(() => {
                    this.$refs.audio.play()
                })
            } else {
                this.$refs.audio.pause()
            }
        },
        playStatus() {

        }
    },
}
</script>

<style lang="scss" scoped>
.warp {
    position: fixed;
    width: 100%;
    height: 13.34rem;
    z-index: 998;
    top: 0;
    background: rgba(0, 0, 0, .2);
}

.miniPlayer {
    position: fixed;
    box-sizing: border-box;
    width: 100%;
    top: 0;
    height: 3.66rem;
    z-index: 999;
    background: #fff;
    padding: .2rem .24rem;
    .audioName {
        text-align: center;
        font-size: .25rem;
        margin-bottom: .36rem;
        color: #737373;
    }
    .audioAuthor {
        text-align: center;
        font-size: .23rem;
        color: #737373;
        margin-bottom: .6rem;
    }
    .progress {
        position: relative;
        font-size: .17rem;
        .progress-bar {
            width: 100%;
            height: 0.04rem;
            background: #eee;
            margin-bottom: .2rem;
        }
        .progress-already-bar {
            position: absolute;
            top: 0;
            height: 0.04rem;
            background-color: #000;
            .progress-bar-ball {
                position: absolute;
                top: -0.05rem;
                right: 0;
                width: .15rem;
                height: .15rem;
                border-radius: 50%;
                background: #000;
            }
        }
        .totalTime {
            float: right;
        }
    }
    .control {
        width: 100%;
        text-align: center;
        font-size: 0;
        img {
            width: .43rem;
        }
        span {
            width: .43rem;
            height: .43rem;
            background-size: .43rem .43rem;
            display: inline-block;
        }
        .before {
            background-image: url('../assets/img/MusicBarPreviousDisable@2x.png');
        }
        .currentPlay {
            background-image: url('../assets/img/MusicBarPlay@2x.png');
            margin: 0 .7rem;
        }
        .currentPause {
            background-image: url('../assets/img/MusicBarPause@2x.png');
            margin: 0 .7rem;
        }
        .after {
            background-image: url('../assets/img/MusicBarNextDisable@2x.png')
        }
    }
}

.opc-enter-active,
.opc-leave-active {
    transition: all .4s;
}

.opc-enter,
.opc-leave-to {
    opacity: 0;
}

.drop-enter-active {
    transition: all .4s cubic-bezier(.68, -0.47, .29, 1.41);
}

.drop-leave-active {
    transition: all .4s;
}

.drop-enter,
.drop-leave-to {
    top: -3.66rem;
}
</style>

