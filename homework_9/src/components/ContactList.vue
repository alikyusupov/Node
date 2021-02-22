<template>
        <div class="wrapper">
            <transition name="animModal" mode="out-in">
                <modal v-if="show"></modal>
            </transition>

            <h2 align="center">Мои контакты</h2>
            <main class="wrapper">
                <transition-group name="list">
                    <contact v-for="(person,index) in contacts" :key="person.id" :person="person" :index="index">

                    </contact>
                </transition-group>
            </main> 
            <section class="iconWrapper">
            <img src="img/bin.png" v-if="removedContacts.length" @click="removeContacts"/>
            </section>
            <hr>
            <add-form></add-form>
            <section class="iconWrapper">
            <img v-if="reserveState.length > 0" src="img/undo.png" @click="getReserveState"/>
            </section>
        </div>
</template>

<script>
import Contact from './Contact.vue'
import AddForm from './AddForm.vue'
import Modal from './Modal.vue'
export default {
  components: { Contact, AddForm, Modal },
  name: 'ContactList',
    data(){
        return{
        }
    },
    methods:{
        removeContacts(){
            this.$store.commit("removeContacts")
        },
        getReserveState(){
            this.$store.commit("getReserveState")
        }
    },
    computed:{
        contacts(){
            return this.$store.state.contacts
        },
        deleteBtnState(){
            return this.$store.state.showDeleteBtn
        },
        removedContacts(){
            return this.$store.state.removedContacts
        },
        show(){
            return this.$store.state.showModal
        },
        reserveState(){
            return this.$store.state._contacts
        }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    .wrapper{
        max-width: 1280px;
        margin:0 auto;
    }
    .iconWrapper{
        display: flex;
        justify-content: center;
    }
    p{
        font-weight: bold;
    }
    .page{
        position: absolute;
    }
    .list-enter-active, .list-leave-active {
    transition: all 1s;
    }
    .list-enter, .list-leave-to /* .list-leave-active до версии 2.1.8 */ {
    opacity: 0;
    transform: translateY(30px);
    }

    .animModal-enter-active, .animModal-leave-active {
    transition: opacity .65s ease-in-out;
    }
    .animModal-enter-from, .animModal-leave-to {
    opacity: 0;
    }


</style>
