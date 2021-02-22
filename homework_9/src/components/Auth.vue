<template>
    
    <main class="container">
        <h2>Регистрация</h2>
        <div class="row">
            <div class="col-4 col-lg-5"></div>
            <div class="col-4 col-lg-2">
                <div class="row">
                    <div class="col">
                        <input type="text" v-model="firstname" class="form-control" placeholder="First name" aria-label="First name">
                    </div>
                    <br>
                    <div class="col">
                        <input type="password" v-model="password" class="form-control" placeholder="Password" aria-label="Password">
                    </div>
                    <br>
                    <span @click="handleAuth" class="btn btn-primary">SIgn Up</span>
                </div>
            </div>
            <div class="col-4 col-lg-5"></div>
        </div>
        <h3 class="text-muted">У меня уже есть учетная запись</h3>
        <div class="row">
            <div class="col" style="width:200px;margin:0 auto">
                <input type="password" v-model="password_" class="form-control" placeholder="Password" aria-label="Password">
            </div>
            <br>
            <span @click="handleAuth_" class="btn btn-primary">Войти</span>
        </div>
    </main>
</template>

<script>


export default {
    name: 'Auth',
    data(){
        return {
          
        }
    },
    methods:{
        handleAuth(){
             this.$store.dispatch("signup",{
                firstname:this.firstname,
                password:this.password
            })
        },
        handleAuth_(){
            fetch("http://localhost:3000/login",{
                method:"POST",
                body:JSON.stringify({password: this.password_})
            })
            .then(res=>{
                console.log(res)
            })
            .catch(err=>{
                console.log(err)
            })
        },
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
   .container{
       margin-top:10%;
   }
   .centered{
       margin: 0 auto;
   }
</style>
