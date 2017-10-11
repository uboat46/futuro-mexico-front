<template>
  <div class="hello">
    <!-- Navbar (sit on top) -->
<div class="w3-top">
  <div class="w3-bar w3-white w3-card-2" id="myNavbar">
    <a class="w3-bar-item w3-button w3-wide">FUTURO MÉXICO</a>
    <!-- Right-sided navbar links -->
    <form @submit.prevent="login" class="w3-hide-small">
    <div class="w3-right w3-margin-right w3-hide-small">
      <a 
      class="w3-bar-item w3-button"
      @click.prevent>
        <input type="email" name="email" placeholder="Correo electrónico">
      </a>
      <a 
      class="w3-bar-item w3-button"
      @click.prevent>
        <input type="password" name="password" placeholder="Contraseña">
      </a>
      <a 
      class="w3-bar-item w3-button"
      @click.prevent>
        <input class="w3-round-large" type="submit" value="Inicia Sesión">
      </a>
      <a
      class="w3-bar-item w3-button"
      @click.prevent>
        ¿Has olvidado tu contraseña?
      </a>
    </div>
    </form>

    <!-- Hide right-floated links on small screens and replace them with a menu icon -->

    <a class="w3-bar-item w3-button w3-right w3-hide-large w3-hide-medium w3-text-black w3-padding-0" @click.prevent="w3_open">
      <i class="fa fa-bars"></i>
    </a>
  </div>
</div>

<!-- Sidebar on small screens when clicking the menu icon -->
<nav class="w3-sidebar w3-bar-block w3-black w3-card-2 w3-animate-left w3-hide-medium w3-hide-large" style="display:none" id="mySidebar">
  <a @click.prevent="w3_close" class="w3-bar-item w3-button w3-large w3-padding-16">Close ×</a>
  <form @submit.prevent="login">
    <div>
      <a 
      class="w3-bar-item w3-button"
      @click.prevent>
        <input type="email" name="email" placeholder="Correo electrónico">
      </a>
      <a 
      class="w3-bar-item w3-button"
      @click.prevent>
        <input type="password" name="password" placeholder="Contraseña">
      </a>
      <a 
      class="w3-bar-item w3-button"
      @click.prevent="w3_close">
        <input class="w3-round-large w3-text-white" type="submit" value="Inicia Sesión">
      </a>
      <a
      class="w3-bar-item w3-button"
      @click.prevent="w3_close">
        ¿Has olvidado tu contraseña?
      </a>
    </div>
    </form>
</nav>

<!-- Header with full-height image -->
<header class="bgimg-1 w3-display-container w3-grayscale-min" id="home">
  <div class="w3-card-4 w3-display-left w3-margin-left w3-white">
  <header class="w3-container w3-light-grey">
    <h3>Destaca tu ayuda, es gratis!</h3>
  </header>
  <div class="w3-container">
    <form @submit.prevent="login"> 
      <input class="w3-input" type="text" name="nombre" placeholder="Nombre" v-model="user.nombre"> <br>
      <input class="w3-input" type="text" name="apaellido" placeholder="Apellidos" v-model="user.ap"> <br>
      <input class="w3-input" type="email" name="email" placeholder="Correo eletrónico" v-model="user.pass"> <br>
      <input class="w3-input" type="password" name="password" placeholder="Contraseña" v-model="user.email"><br>
      <input class="w3-button w3-block w3-dark-grey" type="submit" value="Registrarse">
    </form>
  </div>
</div>
</header>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'Login',
  data () {
    return {
      user : {
        nombre : "",
        ap : "",
        pass : "",
        email : ""
      }
    }
  },
  methods : {
    login() {
      var vm = this;

      
      axios.post('http://104.236.149.67/graphql',
      {
       "query": `mutation createAccount($input: CreateAccountInput!){
              createAccount(input: $input){
                  account{
                    userId
                    username
                  }
                }
        }`,
      "operationName": "createAccount",
      "variables": { "input": {
        "account": {
            "username": vm.user.nombre + "-" + vm.user.ap,
            "password": vm.user.pass,
            "email": vm.user.email,
            "createdOn" : new Date()
          }
      }
      }
      })
  .then(function (response) {
    var user = response.data.data.createAccount.account;
    alert("Bienvenido " + user.username);
    vm.$router.push({ name: 'Perfil', params: { id: user.userId }})
  })
  .catch(function (error) {
    console.log(error.data[0]);
  });
    },
    w3_open() {
      var mySidebar = document.getElementById("mySidebar");
      if (mySidebar.style.display === 'block') {
          mySidebar.style.display = 'none';
      } else {
          mySidebar.style.display = 'block';
      }
    },
    w3_close() {
      var mySidebar = document.getElementById("mySidebar");
      mySidebar.style.display = "none";
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .hello{
    height: 100%;
    width: 100%;
  }
  /* Full height image header */
.bgimg-1 {
    background-position: center;
    background-size: cover;
    background-image: url("../assets/collage.jpg");
    min-height: 100%;
}
</style>
