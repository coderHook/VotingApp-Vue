<template lang="html">
  <div class="row">
    <h1>Create New Poll</h1>
    <hr>
    <div class="col-md-6 col-xs-12">

      <h2>Title</h2>
      <p><input class="form-control" type="text" v-model="newPoll.title"></p>
      <h3> Option </h3>
      <input class="form-control" type="text" v-model="option">
      <span v-if="!created" @click="addOption" class="glyphicon glyphicon-plus-sign pointer"></span>

    </div>
    <div class="col-md-6 col-xs-12">
        <h3>{{ newPoll.title }} </h3>
        <ul>
          <li v-for="(opt, index) in newPoll.options">
            {{ opt }}
            <span v-if="!created" @click="removeOption(index)" class="glyphicon glyphicon-minus-sign pointer"></span>

          </li>
        </ul>
        <div v-if="newPoll.options.length >= 2">
          <button class="btn btn-primary" @click="createPoll">Create Poll</button>
        </div>
          <div v-else>
            <p>Add some more options to the poll.</p>
          </div>
          <span v-if="created == true">
            <br></br>
              <p>You can Vote to your Poll in this link: <a :href="'http://localhost:8080/VotePoll/'+ this.usern.uid + '/' + this.newPoll.id">http://localhost:8080/VotePoll/{{usern.uid}}/{{newPoll.id}} </a></p>
              <br></br>
              <router-link tag="button"
               class="btn btn-action"
               :to="/VotePoll/ + this.usern.uid + '/'+ this.newPoll.id">Lets Vote</router-link>
          </span>
      </div>
  </div>
</template>

<script>

import firebase from 'firebase';;
import {config} from '../helpers/firebaseConfig';

export default {
  data(){
    return {
      usern: '',
      option: '',
      newPoll: {
        title: 'New Poll',
        options: [],
        id: ''
      },
      created: false
    };
  },
  beforeMount(){
    var vm = this;
    firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
        // User is signed in.
        vm.usern = user;
        console.log('user is signed in newPoll', vm.usern.email);
      } else {
        // No user is signed in.
        console.log('User NOT SIGNED on /newPoll');
        vm.$router.push('/');
      }
    });
  },
  methods: {
    addOption(){
      if(this.option != ''){
        this.newPoll.options.push(this.option);
        this.option = ''
      }else { alert('Empty options are not allowed!')}

    },
    removeOption(i){
      this.newPoll.options.splice(i, 1);
    },
    createPoll(){
      var poll = {
        title: this.newPoll.title,
        options: {}
      };
      var opt = this.newPoll.options;
      for (var p of opt) {
        poll.options[p] = 0;
      };
      console.log(poll);
    //  this.$store.state.poll = this.newPoll;
      let url = ['https://votingapp-coderhook.firebaseio.com/data/' + this.usern.uid + '.json'];
      this.$http.post(url[0], poll)
                .then(response => {
                  this.newPoll.id = response.body.name;
                  console.log(this.newPoll.id)
                }, error => {
                  console.log(error);
                });

                this.created = true;
    }
  }
}
</script>

<style lang="css" scoped>
ul {
  list-style-type: none;
}

.pointer {
  cursor: pointer;
}

.glyphicon {
  color: #5bc0de;
  font-size: 25px;
}

</style>
