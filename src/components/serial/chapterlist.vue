<template>
    <div class="chapter">
        <div class="dialog">
            <p>相亲相亲</p>
            <ul>

            </ul>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {}
    },

    methods: {

    },
    computed: {

    }
}
</script>

<style scoped>
.chapter {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.2);
}

.chapter .dialog {
    width: 7.1rem;
    background-color: #fff;
    border-radius: .2rem;
}

.chapter .dialog p {
    padding: .3rem 0;
    text-align: center;
    border-bottom: 1px solid #eee;
}
</style>
