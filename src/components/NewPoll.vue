<template lang="html">
  <div class="row">
    <h1>Create New Poll</h1>
    <hr>
    <div class="col-md-4 col-xs-12">
        <user-polls></user-polls>
    </div>
    <div class="col-md-4 col-xs-12">

      <h2>Title</h2>
      <br></br>
      <p><input class="form-control" type="text" v-model="newPoll.title"></p>
      <h3> Option </h3>
      <input class="form-control" type="text" v-model="option">
      <span v-if="!created" @click="addOption" class="glyphicon glyphicon-plus-sign pointer"></span>
      <br></br>
      <button class="btn btn-primary" v-if="created == true" @click="resetCreated">New poll</button>
      <p>{{ created }}</p>
    </div>
    <div class="col-md-4 col-xs-12">
        <h3>{{ newPoll.title }} </h3>
        <br></br>
        <ul>
          <li v-for="(opt, index) in newPoll.options">
            {{ opt }}
            <span v-if="!created" @click="removeOption(index)" class="glyphicon glyphicon-minus-sign pointer"></span>

          </li>
        </ul>
        <div v-if="newPoll.options.length >= 2">
          <button class="btn btn-primary" @click="createPoll" v-if="!created">Save</button>
        </div>
          <div v-else>
            <p>Add some more options to the poll.</p>
          </div>
          <div v-if="created == true">
            <br></br>
              <p>You can Vote to your Poll in this link: <a :href="'http://localhost:8080/VotePoll/'+ this.$store.state.usern.uid + '/' + this.newPoll.id">http://localhost:8080/VotePoll/{{this.$store.state.usern.uid}}/{{newPoll.id}} </a></p>
              <br></br>
              <router-link tag="button"
               class="btn btn-action"
               :to="/VotePoll/ + this.$store.state.usern.uid + '/'+ this.newPoll.id">Lets Vote</router-link>
          </div>
      </div>
  </div>
</template>

<script>

import firebase from 'firebase';
import {config} from '../helpers/firebaseConfig';
import UserPolls from './UserPolls.vue';



export default {
  data(){
    return {
      option: '',
      newPoll: {
        title: 'New Poll',
        options: [],
        id: ''
      },

      created: ''
    };
  },
  components: {
    userPolls: UserPolls
  },
  beforeMount(){
    var vm = this;
    firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
        // User is signed in.
        firebase.initializeApp(config);
        console.log('user is signed in newPoll', vm.$store.state.usern.email);
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
    resetCreated(){
      this.created = '';
      this.newPoll = {
        title: 'New Poll',
        options: [],
        id: ''
      }
    },
    createPoll(){
      var vm = this;
      var poll = {
        title: this.newPoll.title,
        options: {}
      };
      var opt = this.newPoll.options;
      for (var p of opt) {
        poll.options[p] = 0;
      };
    //  this.$store.state.poll = this.newPoll;
      let url = ['https://votingapp-coderhook.firebaseio.com/data/' + this.$store.state.usern.uid + '.json'];
      this.$http.post(url[0], poll)
                .then(response => {
                  this.newPoll.id = response.body.name;
                  console.log(this.newPoll.id)
                }, error => {
                  console.log(error);
                });

                this.created = true;
/* Esta parte no funciona porque data aun no recoge los datos que se han subido de la ultima encuesta, la db de firebase si la tiene.
                var url2 = ['https://votingapp-coderhook.firebaseio.com/data/' + this.$store.state.usern.uid + '.json']
                this.$http.get(url2[0])
                          .then(response => {
                            return response.json();
                          })
                          .then(data => {
                            vm.$store.state.poll = data;
                            console.log("/newPoll ->created() $store.state.poll", data)
                            this.$store.commit('ids');
                            console.log('this are the ids after creating a new poll', this.$store.getters.ids);
                          }); */
          //Lets try to extract somethign from the database
          const dbRef = firebase.database().ref().child('data');
          const dbRefUser = dbRef.child(this.$store.state.usern.uid)

          var poles = '';
          dbRefUser.on('value', snap => {
            this.$store.state.poll = snap.val();
            this.$store.commit('ids');
          });


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
