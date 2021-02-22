import { createApp } from 'vue'
import { createStore } from 'vuex'
import App from './App.vue'
import router from './router'


const store = createStore({
    state(){
        return {
            contacts:[],
            _contacts:[],
            removedContacts:[],
            showDeleteBtn:false,
            showModal:false
        }
    },
    mutations:{
        _getContacts(state, data){
            state._contacts = [...state.contacts]
            state.contacts = data.contacts
        },
        updateName(state, data){
            state._contacts = [...state.contacts]
            //state.contacts[data.position].name = data.newName
            fetch("http://localhost:3000/updateName",{
                method: "POST",
                headers: {
                    "Accept": "application/json",
                    'Content-Type': 'application/json;charset=utf-8',
                    "Access-Control-Origin": "*"
                },
                body: JSON.stringify({
                    name:   data.newName,
                    id:     data.position
                })
            })
            .then(()=>{
                window.location.reload()
            })
            .catch(err=>{
                console.log(err)
            })
        },
        updatePhone(state, data){
            state._contacts = [...state.contacts]
            //state.contacts[data.position].phone = data.newPhone
            fetch("http://localhost:3000/updatePhone",{
                method: "POST",
                headers: {
                    "Accept": "application/json",
                    'Content-Type': 'application/json;charset=utf-8',
                    "Access-Control-Origin": "*"
                },
                body: JSON.stringify({
                    phone:   data.newPhone,
                    id:     data.position
                })
            })
            .then(()=>{
                window.location.reload()
            })
            .catch(err=>{
                console.log(err)
            })
        },
        updateAddress(state, data){
            state._contacts = [...state.contacts]
            //state.contacts[data.position].address = data.newAddress
            fetch("http://localhost:3000/updateAddress",{
                method: "POST",
                headers: {
                    "Accept": "application/json",
                    'Content-Type': 'application/json;charset=utf-8',
                    "Access-Control-Origin": "*"
                },
                body: JSON.stringify({
                    address:   data.newAddress,
                    id:     data.position
                })
            })
            .then(()=>{
                window.location.reload()
            })
            .catch(err=>{
                console.log(err)
            })
        },
        _addContact(state, data){
            state._contacts = [...state.contacts]
            state.contacts.push(data)
            fetch("http://localhost:3000/create",{
                method: "POST",
                headers: {
                    "Accept": "application/json",
                    'Content-Type': 'application/json;charset=utf-8',
                    "Access-Control-Origin": "*"
                },
                body: JSON.stringify({contact : data})
            })
            .then(res=>{
                res.json()
                .then(result=>{
                    state.contacts = result.contacts
                    console.log(state.contacts)
                })
                .catch(err=>{
                    console.log(err)
                })
            })
            .catch(err=>{
                console.log(err)
            })
        },
        _signup(state, data){
            state.isAuth = data.isAuth
        },
        addToRemove(state, data){
            if(state.removedContacts.indexOf(data.idx) < 0){
                state.removedContacts.push(data.idx)
            }
            else{
                let tar = state.removedContacts.indexOf(data.idx)
                state.removedContacts.splice(tar,1)
            }
        },
        switchDeleteBtn(state){
            state.showDeleteBtn = true
        },
        switchModal(state){
            state.showModal = true;
            console.log("modal is switched to " + state.showModal)//TRUE
        },
        abortRemove(state){
            state.showModal = false;
        },
        getReserveState(state){
            state.contacts = state._contacts;
            state._contacts  = []
        },
        removeContacts(state){
            fetch("http://localhost:3000/delete",{
                method: "POST",
                headers: {
                    "Accept": "application/json",
                    'Content-Type': 'application/json;charset=utf-8',
                    "Access-Control-Origin": "*"
                },
                body: JSON.stringify({data:state.removedContacts})
            })
            .then(()=>{
                console.log("Удаление выполнено")
            })
            .catch(err=>{
                console.log(err)
            })
            state._contacts = [...state.contacts]
            state.removedContacts.forEach(element => {
                state.contacts.forEach(c=>{
                    if(element===c._id){
                            let tar = state.contacts.indexOf(c)
                            state.contacts.splice(tar,1)
                    }
                })
                state.removedContacts = []
                //state.showModal = false;
            });

        }
    },
    actions:{
        getContacts(context){
            fetch("http://localhost:3000/contacts")
            .then(res=>res.json())
            .then(data=>{
                context.commit('_getContacts', data)
            })
            .catch(err=>console.log(err))
        },
        addContact(context, data){
            context.commit('_addContact', data)
        },
        signup(context, data){
            fetch("http://localhost:3000/signup",{
                method:"POST",
                headers: {
                    "Accept": "application/json",
                    'Content-Type': 'application/json;charset=utf-8',
                    "Access-Control-Origin": "*"
                },
                body: JSON.stringify(data)
            })
            .then(function(serverPromise){ 
                serverPromise.json()
                .then((cb)=> {
                    context.commit('_signup', cb)
                    window.location.href = '/';
                })
                .catch(function(e){
                    console.log(e);
                });
            })
            .catch(function(e){
                console.log(e);
            });
        },
        login(){

        }
    },
    getters:{
        contacts: state => {
            return state.contacts
          },
        authStatus: state=>{
            return state.isAuth
        }
    }
})

const app = createApp(App).use(router)

app.use(store)

app.mount('#app')
