<template lang="html">
  <div id="header">
    <nav class="navbar navbar-default navbar-fixed-top">
      <div class="container">
          <!-- Brand and toggle get grouped for better mobile display -->
          <div class="navbar-header page-scroll">
              <button type="button" class="navbar-toggle" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1">
                  <span class="sr-only">Voting App</span>
                  <span class="icon-bar"></span>
                  <span class="icon-bar"></span>

              </button>
              <router-link tag="a" class="navbar-brand" to="/">Voting App</router-link>
          </div>
          <!-- Collect the nav links, forms, and other content for toggling -->
          <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
              <ul class="nav navbar-nav navbar-right">
                  <li class="hidden">
                      <a href="#page-top"></a>
                  </li>
                  <li class="page-scroll" >
                      <a class="pointer" @click="signUp" v-if="!this.$store.state.usern">Sign Up</a>
                      <a class="pointer" v-else> Hi {{ this.$store.state.usern.displayName }}!</a>
                  </li>
                  <li class="page-scroll" v-if="this.$store.state.usern">
                    <a class="pointer" @click="logOut">Log out!</a>
                  </li>


              </ul>
          </div>
          <!-- /.navbar-collapse -->
      </div>
      <!-- /.container-fluid -->
  </nav>
  <!-- end of navbar -->

  <div class="page-header text-center row">
    <div class="col-md-12 container">
      <h2>Voting App</h2>
      <h3>Create a custom poll</h3>
      <button @click="signUp" class="btn btn-success" v-if="!this.$store.state.usern">Sign Up!</button>

    </div>
  </div>
</div>
</template>

<script>

import * as firebase from 'firebase';
import {config} from '../helpers/firebaseConfig';

firebase.initializeApp(config);

export default {

  methods: {
    signUp(){
      var vm = this;
      var provider = new firebase.auth.GoogleAuthProvider();

      firebase.auth().signInWithPopup(provider).then(function(result) {
        // This gives you a Google Access Token. You can use it to access the Google API.
        var token = result.credential.accessToken;
        // The signed-in user info.
        var user = result.user;

        // Lets centralized he logged user storing it with vuex.
        vm.$store.state.usern = user;

        if(user){
          console.log('Looged as: ', vm.$store.state.usern);
          vm.$router.push('/newPoll');
        }
        else {console.log('no user')}
        // ...
      }).catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // The email of the user's account used.
        var email = error.email;
        // The firebase.auth.AuthCredential type that was used.
        var credential = error.credential;
        // ...
      });

    },
    logOut(){
      var vm = this;
      firebase.auth().signOut().then(function() {
        // Sign-out successful.
        vm.$store.state.usern = '';
        vm.$router.push('/');

        }).catch(function(error) {
          // An error happened.
        });
    }

  } /* End Methods */
}
</script>

<style>
.page-header{
  background-color: #5bc0de;
  padding: 34px 0 34px 0;
  color: white;
}
  #header ul li:hover a{
    color:  #5bc0de;
  }

  .pointer {
    cursor: pointer;
  }
</style>
