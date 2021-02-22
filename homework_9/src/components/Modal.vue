<template>
    <div id="myModal" class="modal">
        <!-- Modal content -->
        <div class="modal-content">
            <p>Подтвердите удаление <span @click="removeContacts" class="btn">OK</span> <span class="btn" @click="abortRemove">Отмена</span></p>
        </div>
    </div>
</template>

<script>


export default {
    name: 'Modal',
    data(){
        return {
          
        }
    },
    methods:{
        removeContacts(){
            this.$store.commit("removeContacts")
        },
        abortRemove(){
            this.$store.commit("abortRemove")
        }
    },
    mounted(){
    },
    computed:{

    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

.modal {
        position: fixed; /* Stay in place */
        z-index: 1; /* Sit on top */
        left: 0;
        top: 0;
        width: 100%; /* Full width */
        height: 100%; /* Full height */
        overflow: auto; /* Enable scroll if needed */
        background-color: rgb(0,0,0); /* Fallback color */
        background-color: rgba(0,0,0,0.4); /* Black w/ opacity */
}

/* Modal Content/Box */
.modal-content {
        background-color: #fefefe;
        margin: 30vh auto; /* 15% from the top and centered */
        padding: 20px;
        border: 1px solid #888;
        width: 40vh; /* Could be more or less, depending on screen size */
    }

</style>
