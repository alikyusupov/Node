<template>
<section>
    <h4 @click="edit=true">Add contact</h4>
    <img src="img/plus.png" v-if="edit" @click="addContact">
</section>
<section id="inputs" v-if="edit">
    <div>
        <label for="name">Имя</label>
        <input name="name" v-model="uName" type="text">
    </div>
    <div>
        <label for="age">Возраст</label>
        <input name="age" v-model="uAge" type="number">
    </div>
    <div>
        <label for="status">Статус</label>
        <input name="status" v-model="uStatus" type="text">
    </div>
    <div>
        <label for="phone">Номер телефона</label>
        <input name="phone" v-model="uPhone" type="phone">
    </div>
    <div>
        <label for="address">Адрес</label>
        <input name="address" v-model="uAddress" type="text">
    </div>
    <div>
        <label for="path">URL картинки</label>
        <select name="path" v-model="uPath">
            <option v-for="(path, index) in paths" :key="index">{{path}}</option>
        </select>
    </div>
    <div>
        <label for="desc">Характеристика</label>
        <textarea name="desc" v-model="uDesc"></textarea>
    </div>
    <span class="btn" @click="edit = false">Скрыть</span>
</section>

</template>

<script>


export default {
    name: 'AddForm',
    data(){
        return {
            paths:["img/boy.png","img/hacker.png","img/woman.png","img/man_.png","img/girl.png"],
            edit:false,
            /*uId:null,
            uName:null,
            uAge:null,
            uStatus:null,
            uPhone:null,
            uAddress:null,
            uPath:null,
            uDesc:null*/
        }
    },
    methods:{
        addContact(){
            this.$store.dispatch("addContact",{
                name:       this.uName,
                age:        this.uAge,
                status:     this.uStatus,
                phone:      this.uPhone,
                address:    this.uAddress,
                avaPath:    this.uPath,
                description:this.uDesc
            })
            this.edit = false
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
   *{
       text-align: center;
   }
   img{
       width:50px;
       margin:0 auto;
   }
   img:hover{
       cursor: pointer;
   }
   #inputs{
       max-width: 400px;
       margin:0 auto;
   }
   #inputs div{
       display: flex;
       justify-content: space-between;
       margin-top:8px;
   }
   input{
       font-size: 1.2rem;
   }


</style>
