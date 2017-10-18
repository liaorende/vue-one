<template>
    <div>
        <transition name="opc">
            <div v-show="show" class="warp" @touchmove.prevent @click="hideView"></div>
        </transition>
        <transition name="drop">
            <div v-show="show" class="miniPlayer">
                <p class="audioName">附近的人</p>
                <audio ref="audio" :src="audioSrc" @timeupdate="timeupdate"></audio>
            </div>
        </transition>
    </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
export default {
    data() {
        return {
            // show: false
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
            if (!this.readAudioStatus) return;
            this.GET_AUDIO_CURRENTTIME(this.$refs.audio.currentTime)
        },
        hideView() {
            this.$emit('showPlayer', false)
        }
    },
    computed: {
        ...mapState([
            'audioSrc', 'musicAudioStatus', 'readAudioStatus'
        ])
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
    top: 0;
    width: 100%;
    height: 3.66rem;
    z-index: 999;
    background: #fff;
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

