<template>
    <div class="wrap">
        <div class="scroll" v-if="data" :class="{'noscroll':show}">
            <div class="music">
                <div :style="`background-image:url(${data.feeds_cover})`" class="header">
                    <div class="musicInfo">
                        <img class="singerImg" :src="data.cover" alt="">
                        <img class="cdImg" :class="{'play':!musicAudioStatus,'pause':musicAudioStatus}" src="../assets/img/MusicFeedsPlaceHolder@2x.png" alt="">
                        <span :class="{'playicon':!musicAudioStatus,'pauseicon':musicAudioStatus}" @click="playMusic"></span>
                        <p class="singerInfo">·{{data.title}}·{{data.author.user_name}} | {{data.album}}</p>
                    </div>
                </div>
                <div class="content">
                    <div class="music_content">
                        <p class="title">{{data.story_title}}</p>
                        <div class="author">
                            文 / {{data.author_list[0].user_name}}
                            <img @click="show=!show" class="detailIcon" src="../assets/img/MusicBarDetail@2x.png" alt="">
                        </div>
                        <div v-html="data.story" class="text-content"></div>
                        <span class="edit">{{data.hp_author_introduce}} {{data.editor_email}}</span>
                    </div>
                    <author-view :authorInfo="data"></author-view>
                    <discuss-view :discussInfo="discuss"></discuss-view>
                </div>
            </div>
            <detail-dialog :dialogInfo="data" :show="show" @show="_show"></detail-dialog>
        </div>
    </div>
</template>

<script>

import { mapMutations, mapState } from 'vuex'
import { musicContent, discussDatas } from '../service/getData'
import authorView from './authorView'
import discussView from './discussView'
import detailDialog from './detailDialog'

export default {
    data() {
        return {
            data: '',
            discuss: '',
            timeCount: 0,
            show: false,
            music: 'https://m128.xiami.net/263/7263/2102736824/1795811213_1493002977979.mp3',

        }
    },
    created() {
        this.initData();
        console.log('currentMusic-', this.currentMusic)
    },
    components: {
        authorView, discussView, detailDialog
    },
    computed: {
        ...mapState([
            'musicAudioStatus'
        ])
    },
    methods: {
        ...mapMutations([
            'GAIN_AUDIO', 'GAIN_AUDIO_NAME', 'GAIN_AUDIO_AUTHOR', 'MUSIC_AUDIO_STATUS'
        ]),
        initData() {
            this.content_id = this.$route.query.id;
            musicContent(this.content_id).then(response => {
                return response.json();
            }).then(result => {
                this.data = result.data;

            });
            discussDatas(this.content_id, this.$route.path).then(response => {
                return response.json();
            }).then(result => {
                this.discuss = result.data.data;
            });
        },
        playMusic() {
            this.GAIN_AUDIO(this.music)
            this.GAIN_AUDIO_NAME(this.data.author.user_name)
            this.GAIN_AUDIO_AUTHOR(this.data.title)
            this.MUSIC_AUDIO_STATUS(!this.musicAudioStatus)
        },
        _show(v) {
            this.show = v
        }
    }
}
</script>

<style lang="scss" scoped>
.wrap {
    width: 100%;
    height: 13.34rem;
    overflow: hidden;
    .scroll {
        overflow: auto;
        -webkit-overflow-scrolling: touch; //overflow: auto 导致ios滑动卡顿
        height: 13.34rem
    }
    .noscroll {
        height: 100%;
        overflow: hidden;
    }
}

.music {
    background: #fff;
    .header {
        position: relative;
        width: 100%;
        height: 4.8rem;
        background-repeat: no-repeat;
        background-size: cover;
        z-index: 1;
        span {
            position: absolute;
            top: calc( 40% - .4rem);
            left: calc( 50% - .4rem);
            width: .8rem;
            height: .8rem;
            border-radius: 50%;
            z-index: 9;
        }
        .musicInfo {
            position: absolute;
            margin: 0 auto;
            width: 100%;
            top: 1.7rem;
            .cdImg {
                position: absolute;
                margin: 0 auto;
                width: 2.18rem;
                top: 0;
                z-index: -1;
                transition: all .2s;
            }
            .play {
                left: calc( 50% - 1.09rem);
            }
            .pause {
                left: calc( 50% - 1.09rem + 0.6rem);
            }
            .singerImg {
                display: block;
                margin: 0 auto;
                width: 2.18rem;
                left: calc( 50% - 1.09rem);
                z-index: 9;
            }
            .playicon {
                background: rgba(0, 0, 0, .5) url('../assets/img/audioPlayIcon@2x.png') no-repeat .25rem;
                background-size: .3rem
            }
            .pauseicon {
                background: rgba(0, 0, 0, .5) url('../assets/img/audioPauseIcon@2x.png') no-repeat .25rem;
                background-size: .3rem
            }
            .singerInfo {
                margin-top: .27rem;
                font-size: .2rem;
                text-align: center;
                color: #eee;
            }
        }
    }
    .content {
        margin-top: 14px;
        padding: 0 20px;
        .music_content {
            .audio_read {
                margin-bottom: .5rem;
                padding: .26rem;
                font-size: .29rem;
                border: 1px solid #6e6e6e;
                border-radius: .1rem;
            }
            .audio_time {
                float: right;
            }
            .title {
                font-size: .45rem;
                font-weight: bold;
            }
            .author {
                margin: .8rem 0;
                font-size: .2rem;
                .detailIcon {
                    float: right;
                    height: .4rem;
                }
            }
            .edit {
                font-size: .2rem;
                color: #999;
            }
        }
    }
}
</style>
