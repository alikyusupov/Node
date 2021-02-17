<template>
    <main class="parent">
        <gallery-item v-for="(item, index) in items" :key="index" :item="item"></gallery-item>
    </main>
</template>

<script>
import GalleryItem from './GalleryItem.vue'
export default {
    components:{GalleryItem},
    name:"Gallery",
    data(){
        return {
        }
    },
    mounted(){
        console.log("Gallery is loaded")
    },
    computed:{
        items(){
            return this.$store.state.images
        }
    },
    methods:{

    }
}
</script>

<style scoped>
    .parent{
        display: flex;
        justify-content: space-around;
    }
</style>