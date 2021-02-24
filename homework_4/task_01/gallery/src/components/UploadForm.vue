<template>
    <div>
        <label>File
            <input type="file" accept="image/*" id="file" ref="file" v-on:change="handleFileUpload()"/>
        </label>
        <button v-on:click="submitFile()">Submit</button>
    </div>
</template>

<script>
export default {
    name:"UploadForm",
    data(){
      return {
        file: ''
      }
    },
    methods:{
        submitFile(){
            let formData = new FormData();
            formData.append('file', this.file);
            const options = {
                method: 'POST',
                body: formData
        };
    
        fetch('http://localhost:3000/upload', options)
        .then(response => response.json())
        .then(() => {
            location.reload()
        })
        .catch(error => {
            console.error(error)
        })
      },
      handleFileUpload(){
        this.file = this.$refs.file.files[0];
      }
    }
}

</script>

<style scoped>
    div{
        width:250px;
        margin: 0 auto;
        border:1px solid green
    }
</style>