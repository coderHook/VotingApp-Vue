<template lang="html">
  <div class="row container-fluid">
    <h1>Create New Poll</h1>
    <hr>
    <div class="col-md-4 col-sm-12 col-xs-12">
        <user-polls @idtoedit="idtoedit"></user-polls>
    </div>
    <div class="col-md-4 col-sm-6 col-xs-12">
      <h2>Title</h2>
      <p><input class="form-control" type="text" v-model="newPoll.title"></p>
      <br></br>
      <h3> Option </h3>
      <input class="form-control" type="text" v-model="option">
      <span v-if="!created" @click="addOption" class="glyphicon glyphicon-plus-sign pointer addreset"></span>
      <span v-if="!created" @click="resetCreated" class="glyphicon glyphicon-remove-circle pointer addreset"></span>

      <br></br>
      <button class="btn btn-primary" v-if="created == true" @click="resetCreated">New poll</button>
      <p>{{ created }}</p>
    </div>
    <div class="col-md-4 col-sm-6 col-xs-12">
        <h3>{{ newPoll.title }} </h3>
        <br></br>
        <ul>
          <li v-for="(opt, index) in newPoll.options">
            <div class="container-fluid result">
              <div class="pull-left">
                {{ opt }}
              </div>
              <div class="pull-right">
                <span v-if="!created" @click="removeOption(index)" class="glyphicon glyphicon-minus-sign pointer minus"></span>
              </div>
            </div>

          </li>
        </ul>
        <div v-if="newPoll.options.length >= 2">
          <button class="btn btn-primary" @click="save" v-if="!created">Save</button>
        </div>
          <div v-else>
            <p>Add some more options to the poll.</p>
          </div>
          <div v-if="created == true" class="container-fluid">
            <div class="panel panel-default">
              <div class="panel-body">You can Share your Poll with this link</div>
              <div class="panel-footer">
                <a id="pollink" class="pollink" target="_blank" :href="'https://votingapp-coderhook.firebaseapp.com/VotePoll/'+ this.$store.state.usern.uid + '/' + this.newPoll.id">
                    https://votingapp-coderhook.firebaseapp.com/VotePoll/{{this.$store.state.usern.uid}}/{{newPoll.id}}
                </a>

              </div>
            </div>

              <router-link tag="button"
               class="btn btn-success"
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
    idtoedit(value){
      this.newPoll.title = this.$store.state.poll[value].title;
      this.newPoll.options = Object.keys(this.$store.state.poll[value].options);
      this.newPoll.id = value;
    },
    save(){
      if(this.$store.state.ids.includes(this.newPoll.id)){
        console.log('id is in da HOUSE');
        let url = ['https://votingapp-coderhook.firebaseio.com/data/'+ this.$store.state.usern.uid + '/' + this.newPoll.id + '.json'];

        var poll = {
          title: this.newPoll.title,
          options: {}
        };

        var array = Object.keys(this.$store.state.poll[this.newPoll.id].options);
        for( var opt of this.newPoll.options){
          if(!array.includes(opt)){
            poll.options[opt] = 0;
          } else {
            poll.options[opt] = this.$store.state.poll[this.newPoll.id].options[opt];
          }


          console.log("for loop: ", poll.options[opt]);
        }

        console.log('This is the poll that youa re going to save: ', poll);

        this.$http.put(url[0], poll);
        this.refresh();
        this.created = true;

      } else {

        console.log('is not :(, so, lets go and CREATE it');
        this.createPoll();
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
                this.refresh()
    },
    refresh(){
      //With this we update our state.poll
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

input {
    width: 60%;
    margin: auto;
}

.result {
  margin-left: 30%;
  margin-right: 30%;
}

.pointer {
  cursor: pointer;
}

.minus {
  color: #5bc0de;
  font-size: 15px;
}
.minus:hover {
  font-size: 18px;
  color: red;
}

.addreset {
  color: #5bc0de;
  font-size: 25px;
  margin: 30px 10px 0px 10px;
}

.addreset:hover{
  font-size: 30px;
}

.pollink {
  font-size: 80%;
}

</style>
