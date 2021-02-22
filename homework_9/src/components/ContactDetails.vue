<template>
    <div>
        <h2>{{contact.name}}</h2>
        <img class="centered" :src="'/' + contact.avaPath">
        <h3>Возраст</h3>
        <h4>{{contact.age}}</h4>
        <br>
        <h3>Статус</h3>
        <h4>{{contact.status}}</h4>
        <br>
        <h3>Характер</h3>
        <h4>{{contact.description}}</h4>
    </div>
    


</template>

<script>


export default {
    name: 'ContactDetails',
    data(){
        return {
            contact:this.$store.state.contacts.filter(c=>c._id === this.$route.params.id)[0],
        }
    },
    methods:{

    },
    mounted(){
          
    },
    computed:{

    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
   *{
       text-align: center;
   }
   .centered{
       margin: 0 auto;
   }

</style>
