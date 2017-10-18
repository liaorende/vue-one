<template>
    <div class="author">
        <p>作者</p>
        <div class="author_info">
            <img :src="authorInfo.author_list[0].web_url" alt="">
            <span class="nickname">{{authorInfo.author_list[0].user_name}} {{authorInfo.author_list[0].wb_name}}</span>
            <span class="follow">关注</span>
            <span class="introduce">{{authorInfo.author_list[0].desc}}</span>
        </div>
    </div>
</template>

<script>

export default {
    props: {
        authorInfo: {
            type: Object
        }
    },
    data() {
        return {}
    },

}
</script>

<style scoped>
.author {
    margin-bottom: .9rem;
}

.author .author_info {
    font-size: 0;
}

.author span {
    display: inline-block;
    margin-left: .2rem;
    width: 4.6rem;
    line-height: .37rem;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
}

.author p {
    display: inline-block;
    margin-bottom: .37rem;
    padding-bottom: .13rem;
    width: 1.1rem;
    font-size: .27rem;
    border-bottom: .08rem solid #000;
}

.author img {
    float: left;
    width: .74rem;
    height: .74rem;
    border-radius: 50%;
}

.author .nickname {
    font-size: .25rem;
    color: #585858;
}

.author .introduce {
    font-size: .24rem;
    color: #929292;
}

.author .follow {
    margin: 0;
    float: right;
    line-height: .6rem;
    width: .85rem;
    height: .6rem;
    font-size: .24rem;
    text-align: center;
    vertical-align: middle;
    border: 1px solid #aeaeae;
    border-radius: 3px;
}
</style>
