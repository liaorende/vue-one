<template>
    <div class="question" v-if="data">
        <div class="question_content">
            <h1 class="title">{{data.question_title}}</h1>
            <div class="questioner">
                {{data.asker.user_name}}问:
                <p class="ask_Content">{{data.question_content}}</p>
            </div>
            <div class="division">
                <span class="division-icon"></span>
            </div>
            <div class="author">
                {{data.author_list[0].user_name}}答:
            </div>
            <div v-html="data.answer_content" class="text-content"></div>
            <span class="edit">{{data.charge_edt}} {{data.charge_email}}</span>
        </div>
        <author-view :authorInfo="data"></author-view>
        <discuss-view :discussInfo="discuss"></discuss-view>
    </div>
</template>

<script>
import { questionContent, discussDatas } from '../service/getData'
import authorView from './authorView'
import discussView from './discussView'

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
        authorView, discussView
    },

    methods: {
        initData() {
            this.content_id = this.$route.query.id;
            questionContent(this.content_id).then(response => {
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
    },

}
</script>

<style lang="scss" scoped>
.question {
    margin-top: 14px;
    padding: 0 20px;
    background: #fff;
    font-size: .22rem;
    .question_content {
        margin-bottom: .4rem;
        .title {
            font-size: .45rem;
            font-weight: bold;
            margin-bottom: .3rem;
        }
        .author {
            margin-bottom: .3rem;
        }
        .edit {
            color: #999;
        }
        .ask_Content {
            margin-top: .3rem;
        }
        .division {
            position: relative;
            width: 100%;
            height: 0.02rem;
            margin: .5rem 0;
            background-color: #eee;
            .division-icon {
                position: absolute;
                top: -0.04rem;
                right: 45%;
                width: .1rem;
                height: .1rem;
                background-color: #eee;
                border-radius: 50%;
                border-left: .15rem solid #fff;
                border-right: .15rem solid #fff;
            }
        }
    }
}
</style>
