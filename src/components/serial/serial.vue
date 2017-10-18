<template>
    <div class="serial" v-if="data">
        <div class="serial_content">
            <p class="title">{{data.title}}</p>
            <div class="author">
                文 / {{data.author.user_name}}
                <img class="chapterList" src="../../assets/img/chapterListIcon@2x.png" alt="">
            </div>
            <div v-html="data.content" class="text-content"></div>
            <span class="edit">{{data.hp_author_introduce}} {{data.editor_email}}</span>
        </div>
        <!-- <chapterlist></chapterlist> -->
        <author-view :authorInfo="data"></author-view>
        <discuss-view :discussInfo="discuss"></discuss-view>
    </div>
</template>

<script>

import { serialContent, discussDatas } from '../../service/getData'
import authorView from '../authorView'
import discussView from '../discussView'
import chapterlist from './chapterlist'

export default {
    data() {
        return {
            data: '',
            discuss: '',
        }
    },
    created() {
        this.initData();
    },
    components: {
        authorView, discussView, chapterlist
    },
    methods: {
        initData() {
            this.content_id = this.$route.query.id;
            serialContent(this.content_id).then(response => {
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
        playAudio() {
            if (this.$refs.readAudio.paused) {
                this.$refs.readAudio.play();
                this.isPlay = 1;
            } else {
                this.$refs.readAudio.pause();
                this.isPlay = 0;
            }
        },
        add2Zero(v) {
            let m = v / 60 | 0
            m = m < 10 ? '0' + m : '' + m
            let s = v % 60
            s = s < 10 ? '0' + s : '' + s
            return m + ":" + s
        },
        timeupdate() {
            this.timeCount = Math.floor(this.data.audio_duration - this.$refs.readAudio.currentTime);
        }
    },
    computed: {
        audioTime() {
            if (this.timeCount) {
                return this.add2Zero(this.timeCount)
            } else {
                return this.add2Zero(this.data.audio_duration)
            }
        },
    }
}
</script>

<style scoped>
.serial {
    margin-top: 14px;
    padding: 0 20px;
    background: #fff;
}

.serial .title {
    font-size: .45rem;
    font-weight: bold;
}

.serial .author {
    margin: .86rem 0;
    font-size: .2rem;
}

.serial .edit {
    font-size: .2rem;
    color: #999;
}

.serial .text-content img {
    width: 100%;
}

.serial .serial_content .chapterList {
    float: right;
    height: .4rem;
}

.serial .serial_content .audio_time {
    float: right;
}
</style>
