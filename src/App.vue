<template>
  <div id="app">

    <img height="48px" src="./assets/logo.png">
    <h2>{{ msg }}</h2>

    <h2>User: {{ keycloak.idTokenParsed.preferred_username }}</h2>
    <div>
      <button class="btn" @click="keycloak.logout()">Logout</button>
      <button class="btn" style="background-color: green; margin-left: 40px;" @click="callApi()">Call Api</button>
      <button class="btn" style="background-color: green; margin-left: 40px;" @click="callApiSecured()">Call Api Secured
      </button>
    </div>

    <div id="wrapper">
      <div class="jwt-token">
        <h3>JWT Token</h3>
        {{ keycloak.idToken }}
      </div>

      <div class="jwt-token">
        <h3>JWT Token Parsed</h3>
        <!--        boxed, sort-->
        <json-viewer
          :value="keycloak.tokenParsed"
          :expand-depth=1
          copyable>
        </json-viewer>
      </div>

      <div class="jwt-token">
        <h3>Info</h3>
        <ul>
          <li>clientId: {{ keycloak.clientId }}</li>
          <li>Auth Server Url: {{ keycloak.authServerUrl }}</li>
        </ul>
      </div>

    </div>
    <h2>Essential Links</h2>
    <ul>
      <li><a href="https://keycloak.org" target="_blank">Keycloak</a></li>
      <li><a href="https://github.com/keycloak/keycloak-quickstarts" target="_blank">Code Repo</a></li>
      <li><a href="https://twitter.com/keycloak" target="_blank">Twitter</a></li>
    </ul>
  </div>
</template>

<script>

import axios from 'axios'

export default {
  name: 'app',
  props: ['keycloak'],
  data() {
    return {
      msg: 'App - 1 Welcome to Your Secured Vue.js App - 1 with Keycloak',
      keycloakIdTokenJson: null
    }
  },
  methods: {
    callApi() {
      // console.log('api called')
      axios.get('https://jsonplaceholder.typicode.com/posts/1')
        .then(res => {
          if (res.data.body) {
            console.log(res.data.title)
          } else {
            console.log('error: ' + res)
          }
        })
        .catch(e => {
          // console.log('--039')
          context.dispatch('SET_ERROR', e)
          console.log('error- ' + e)
        })
    },
    callApiSecured() {
      // console.log('api called')

      axios.get('https://jsonplaceholder.typicode.com/posts/1')
        .then(res => {
          if (res.data.body) {
            console.log(res.data.title)
          } else {
            console.log('error: ' + res)
          }
        })
        .catch(e => {
          console.log('error- ' + e)
        })
    }
  }

}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 20px;
}

h1, h2 {
  font-weight: normal;
}

h3 {
  font-weight: normal;
  color: black;
  margin-top: 0;
  text-align: center;
  font-size: 18px;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: block;
  margin: 0 10px;
  color: #333;
  font-size: 20px;
}

a {
  color: #42b983;
}

#wrapper {
  display: flex;
  margin-top: 100px;
  margin-top: 15px
}

.jwt-token {
  width: 50%;
  display: block;
  padding: 20px;
  margin: 10px 0 10px;
  font-size: 13px;
  line-height: 1.42857143;
  word-break: break-all;
  word-wrap: break-word;
  background-color: #f5f5f5;
  border: 1px solid #ccc;
  border-radius: 4px;
  color: #d63aff;
  font-weight: bolder;
  text-align: left
}

.btn {
  color: #fff;
  background-color: #0088ce;
  border-color: #00659c;
  padding: 6px 10px;
  font-size: 14px;
  line-height: 1.3333333;
  border-radius: 1px;
  cursor: pointer
}

#wrapper {
  margin-top: 15px;
}


</style>
