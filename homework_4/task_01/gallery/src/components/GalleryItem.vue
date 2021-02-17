<template>
    <div>
       <img :src="item">
    </div>
</template>

<script>
export default {
    name:"GalleryItem",
    props:["item"]
  
}
</script>

<style scoped>
    img{
        max-width: 300px;
        padding: 15px;
    }
    div{
        border: 2px solid lightblue;
        border-radius:10px;
    }
</style>