<template>
    <div class="essay" v-if="data">
        <div class="essay_content">
            <p class="title">{{data.hp_title}}</p>
            <div class="author">
                文 / {{data.author_list[0].user_name}}
            </div>
            <div class="audio_read" v-if="data.audio" @click="playAudio">
                <img class="isPlay" :src="iconPlay" alt="">
                <span>有声阅读 | {{data.anchor}}</span>
                <span class="audio_time">{{audioTime}}</span>
            </div>
            <div v-html="data.hp_content" class="text-content"></div>
            <span class="edit">{{data.hp_author_introduce}} {{data.editor_email}}</span>
        </div>
        <author-view :authorInfo="data"></author-view>
        <discuss-view :discussInfo="discuss"></discuss-view>
    </div>
</template>

<script>
import { mapMutations, mapState } from 'vuex'
import { essayContent, discussDatas } from '../service/getData'
import authorView from './authorView'
import discussView from './discussView'
import { add2Zero } from '../base/utils'

export default {
    data() {
        return {
            data: '',
            discuss: '',
            timeCount: 0,
            // iconPlay: '../static/img/contentAudioPause@2x.png',
            audio: ''
        }
    },
    created() {
        this.initData();
    },
    components: {
        authorView, discussView
    },
    computed: {
        ...mapState([
            'readAudioStatus', 'audioCurrentTime'
        ]),
        audioTime() {
            if (this.timeCount) {
                return add2Zero(this.timeCount)
            } else {
                return add2Zero(this.data.audio_duration)
            }
        },
        iconPlay() {
            return this.readAudioStatus ? '../static/img/contentAudioPlaying@2x.png' : '../static/img/contentAudioPause@2x.png'
        }
    },
    methods: {
        ...mapMutations([
            'GAIN_AUDIO', 'GAIN_AUDIO_NAME', 'GAIN_AUDIO_AUTHOR', 'READ_AUDIO_STATUS'
        ]),
        initData() {
            this.content_id = this.$route.query.id;
            essayContent(this.content_id).then(response => {
                return response.json();
            }).then(result => {
                this.data = result.data;
                this.audio = this.data.audio;
            });
            discussDatas(this.content_id, this.$route.path).then(response => {
                return response.json();
            }).then(result => {
                this.discuss = result.data.data;
            });
        },
        playAudio() {
            this.GAIN_AUDIO(this.audio)
            this.GAIN_AUDIO_NAME(this.data.anchor)
            this.GAIN_AUDIO_AUTHOR(this.data.hp_title)
            this.READ_AUDIO_STATUS(!this.readAudioStatus)
        },
    },
    watch: {
        audioCurrentTime() {
            this.timeCount = Math.floor(this.data.audio_duration - this.audioCurrentTime)
        }
    }

}
</script>

<style scoped>
.essay {
    margin-top: 14px;
    padding: 0 20px;
    background: #fff;
}

.essay .title {
    font-size: .45rem;
    font-weight: bold;
}

.essay .author {
    margin: .86rem 0;
    font-size: .2rem;
}

.essay .edit {
    font-size: .2rem;
    color: #999;
}

.essay .essay_content .audio_read {
    margin-bottom: .5rem;
    padding: .26rem;
    font-size: .29rem;
    border: 1px solid #6e6e6e;
    border-radius: .1rem;
}

.essay .essay_content .audio_time {
    float: right;
}

.audio_read .isPlay {
    vertical-align: middle;
    height: .26rem;
}
</style>
