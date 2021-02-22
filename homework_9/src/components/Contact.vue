<template>
        <div class="container">
            <section class="avatarHolder">
                <img class="avatar" :class="{active:isActive}" :src="person.avaPath" @click="handleChange($event, person._id)">
                <br>
                <span class="btn" @mousedown="start" @mouseup="end">{{person.name}}</span>
            </section>
            <section class="infoHolder">
                <div class="details">
                    <p>Name <span>{{index}}</span></p>
                    <p @click="edit = true"  v-show="!edit">{{person.name}}</p>
                    <input style="width:10em" v-show="edit" :value="person.name" @change="updateName($event, person._id)">
                    <span @click="edit = true" v-show="!edit" class="btn">edit</span>
                    <span @click="edit = false" v-show="edit" class="btn">save</span>
                </div>
                <div class="details">
                    <p>Phone</p>
                    <p @click="edit2 = true" v-show="!edit2">{{person.phone}}</p>
                    <input style="width:10em" v-show="edit2" :value="person.phone" @change="updatePhone($event, person._id)">
                    <span @click="edit2 = true" v-show="!edit2" class="btn">edit</span>
                    <span @click="edit2 = false" v-show="edit2" class="btn">save</span>
                </div>
                <div class="details">
                    <p>Address</p>
                    <p @click="edit3 = true" v-show="!edit3">{{person.address}}</p>
                    <input style="width:10em" v-show="edit3" :value="person.address" @change="updateAddress($event, person._id)">
                    <span @click="edit3 = true" v-show="!edit3" class="btn">edit</span>
                    <span @click="edit3 = false" v-show="edit3" class="btn">save</span>
                </div>
            </section>
            <section class="btn dt-btn">
                <router-link :to="'/contacts/' + person._id">
                    <p>Details</p>
                </router-link>
            </section>
        </div>
</template>

<script>

//import { mapState } from 'vuex';

export default {
    name: 'Contact',
    props:["person","index"],
    data(){
        return {
            edit:false,
            edit2:false,
            edit3:false,
            counter:0,
            timeout:null,
            showDeleteBTN:false,
            isActive:false
        }
    },
    methods:{
        updateName (e, index) {
            this.$store.commit("updateName",{
                newName:e.target.value,
                position:index
                })
        },
        updatePhone (e, index) {
            this.$store.commit("updatePhone",{
                newPhone:e.target.value,
                position:index
                })
        },
        updateAddress (e, index) {
            this.$store.commit("updateAddress",{
                newAddress:e.target.value,
                position:index
                })
        },
        handleChange(_, index){
            this.isActive = !this.isActive
            this.$store.commit("switchDeleteBtn")
            this.$store.commit("addToRemove",{
                idx:index
            })
        },
        start(){
            this.timeout = setInterval(()=>{
                this.counter++;
                if(this.counter > 5)
                    this.$store.commit("switchDeleteBtn")
            },100)
            
        },
        end(){
                clearInterval(this.timeout);
                this.counter = 0;  
        }
    },
    mounted(){

    },
    computed:{
        contacts(){
            return this.$store.state.contacts
        },
         deleteBtnState(){
            return this.$store.state.showDeleteBtn
    } 
}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    .active{
        box-shadow: inset 0px 0px 22px 1px rgba(196, 40, 40, 0.75);;
    }
    section{
        margin-bottom: 8px;
    }
    .container{
        display: flex;
        flex-wrap: wrap;
        justify-content: space-around;
        cursor: pointer;
    }
    .container:hover img{
        cursor: pointer;
        transform: scale(1.1);
        transition: .2s ease-in-out;
        border: 2px solid lightsalmon;
        border-radius: 10px;
        box-shadow: 6px 6px 5px 0px rgba(50, 50, 50, 0.48);
        animation: spark .3s forwards;
    }
    p{
        font-weight: bold;
    }
    .avatarHolder{
        text-align: center;
    }
    .infoHolder{
        display: flex;
        flex-direction: column;
        justify-content: space-evenly;
        width: 50%;
        border-radius: 10px;
        margin-top: 10px;
    }
    .avatar{
        max-width: 100px;
        padding: 3px;
    }
    .details{
        display: flex;
        justify-content: space-between;
        
    }
    .details p{
        padding-right: 5px;
    }
    .dt-btn{
        max-width: 150px;
        display: flex;
        flex-direction: column-reverse;
        justify-content: center;
    }

    @media (max-width: 960px){
        .avatarHolder, .infoHolder{
            width: 100%;
        }
        .details{
            padding: 15px;
        }
    }
    
    @keyframes spark {
        0%, 100% {
            transform: scale(1);
        }
        50% {
            transform: scale(1.1);
        }
    }
</style>
