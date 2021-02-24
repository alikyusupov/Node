import { createStore } from 'vuex'
import axios from 'axios'

const store = createStore({
    state(){
        return {
            images:[]
        }
    },
    mutations:{
        _getImages(state, images){
            state.images = images
        }
    },
    actions:{
        getImages(context){
            //axios.get('https://jsonplaceholder.typicode.com/todos/1')
            axios.get('http://localhost:3000/serveImages')
            .then(res=>{
            context.commit('_getImages', res.data.data)
            })
            .catch(err=>{
                console.log(err)
            })
        }
    },
    getters:{

    }
})

export default store;