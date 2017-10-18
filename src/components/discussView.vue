<template>
    <div class="discuss">
        <p class="title">评论列表</p>
        <div class="discuss_item" v-for="(item,index) in discussInfo" :key="index">
            <div class="user_info">
                <img class="headimg" :src="item.user.web_url" alt="">
                <span>{{item.user.user_name}}</span>
                <span class="timer">{{item.created_at}}</span>
            </div>
            <p class="discuss_quote" v-if="item.quote">
                {{item.touser.user_name}}: {{item.quote}}
            </p>
            <p class="discuss_content">{{item.content}}</p>
            <div class="discuss_icon">
                <img src="../assets/img/collect_dark@2x.png" alt="">
                <img src="../assets/img/like_dark@2x.png" alt="">
                <span>{{item.praisenum}}</span>
            </div>
        </div>
    </div>
</template>

<script>

export default {
    props: {
        discussInfo: null
    },
    data() {
        return {}
    },

}
</script>

<style scoped>
.discuss {
    font-size: .25rem;
}

.discuss .title {
    display: inline-block;
    margin-bottom: .16rem;
    padding-bottom: .13rem;
    width: 1.1rem;
    font-size: .27rem;
    border-bottom: .08rem solid #000;
}

.discuss_item {
    margin-top: .3rem;
    border-bottom: 1px solid #eee;
}

.discuss_item .headimg {
    width: .38rem;
    height: .38rem;
    border-radius: 50%;
}

.discuss_item .user_info span {
    margin-left: .18rem;
    font-size: .26rem;
    line-height: .38rem;
}

.discuss_item .user_info .timer {
    float: right;
}

.discuss_item .discuss_content {
    font-size: .25rem;
    margin: .35rem 0 .35rem .35rem;
}

.discuss_item .discuss_icon {
    margin-bottom: .24rem;
    text-align: right;
    font-size: .18rem;
    line-height: .36rem;
}

.discuss_item .discuss_icon span {
    margin-left: .17rem;
}

.discuss_item .discuss_icon img {
    margin-left: .35rem;
    width: .3rem;
}

.discuss_item .discuss_quote {
    margin: .17rem 0 .17rem .35rem;
    padding: .12rem .17rem .17rem .17rem;
    line-height: .52rem;
    display: -webkit-box;
    display: -moz-box;
    overflow: hidden;
    text-overflow: ellipsis;
    word-break: break-all;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    border: 1px solid #eee;
    font-size: .25rem;
}
</style>
