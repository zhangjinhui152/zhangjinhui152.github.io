<template>
    <div>
        <div id="header">
            <div id="header__content">
                <div id="header__info">
                    <h1><a href="/Mekyll/">zhangjinhui152</a></h1>
                    <p>test</p>
                    <img
                        src="https://s3.bmp.ovh/imgs/2024/08/05/dc7a1c812d05c934.png"
                        alt="avatar"
                    />
                </div>
                <ul id="header__nav">
                    <li><a href="/" class="">Main</a></li>
                    <li><a href="/about" class="">About</a></li>
                    <li><a href="/archive" class="">Archive</a></li>
                </ul>
            </div>
        </div>
        <textarea name="" id="test">

        </textarea>
        <div id="content">

        </div>
        <div id="footer">
            Powered by <a href="http://jekyllrb.com" target="_blank">Jekyll</a> ·
            <a href="https://github.com/ifedyukin/Mekyll">Mekyll</a> theme <br />
        </div>
    </div>
</template>

<script lang="ts" setup>
import { marked } from "marked";
import { onMounted } from "vue";
import blog from '../assets/data.json';
import { useRouter } from 'vue-router'
const router = useRouter()
onMounted(async () => {
    console.log('router.currentRoute.value.query :>> ', router.currentRoute.value.query);
    let currentBlog = blog.blog.filter(item => item.id == router.currentRoute.value.query.id)[0]
    let res = await marked.parse(decodeURIComponent(atob(currentBlog.content)).trim());
    document.getElementById("content")!!.innerHTML = res;
    
    document.getElementById("test")?.addEventListener("input", function () {
        let test = document.getElementById("test") as HTMLInputElement
        console.log( btoa(encodeURIComponent(test?.value)));
    });
});
</script>
<style lang="scss">
@import url(../assets/css/Mekyll-main-css.css);

#content{
    width: 80%;
    margin: 0 auto;
}
</style>
