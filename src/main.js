import Vue from 'vue'
import App from './App.vue'

import * as Keycloak from 'keycloak-js';

import JsonViewer from 'vue-json-viewer'
import 'vue-json-viewer/style.css'

let initOptions = {
  // url: 'http://127.0.0.1:8080/auth', realm: 'smartgeo', clientId: 'web-app-vue-keycloak', onLoad: 'login-required'
  url: 'https://keycloak.smartgeo.uz:8443/auth/', realm: 'smartgeo', clientId: 'web-app-vue', onLoad: 'login-required'
}

let keycloak = Keycloak(initOptions);

Vue.use(JsonViewer)

keycloak.init({ onLoad: initOptions.onLoad }).then((auth) => {
  // console.log('init222')
  if (!auth) {
    // window.location.reload();
    // console.log("Authenticated");
  } else {
    // console.log("Authenticated");
    console.log(keycloak)
    // console.log(keycloak.hasRealmRole('full_access'))
    console.log(keycloak.realmAccess)
    console.log(keycloak.resourceAccess)
    // console.log(keycloak.loadUserInfo())
    new Vue({
      el: '#app',
      render: h => h(App, { props: { keycloak: keycloak} })
    })
  }

//Token Refresh
  setInterval(() => {
    keycloak.updateToken(70).then((refreshed) => {
      if (refreshed) {
        console.log('Token refreshed' + refreshed);
      } else {
        // console.log('Token not refreshed, valid for '
        //   + Math.round(keycloak.tokenParsed.exp + keycloak.timeSkew - new Date().getTime() / 1000) + ' seconds');
      }
    }).catch(() => {
      console.log('Failed to refresh token');
    });
  }, 6000)

}).catch(() => {
  console.log("Authenticated Failed");
});


