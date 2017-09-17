<template lang="html">
  <div class="panel panel-info userPolls">
    <div class="panel-heading">
      <div class="panel-title"><h3>Your Polls</h3></div>
    </div>
      <ul class="list-group">
        <li class="list-group-item" v-for="(id, index) in this.$store.state.ids">
          <div class="container-fluid">
          <div class="pull-left">
          <router-link tag="a" class="pointer" :to="/VotePoll/ + $store.state.usern.uid + '/'+ id">{{ $store.state.poll[id].title }}</router-link>
          </div>
          <div class="pull-right">
            <span class="glyphicon glyphicon-pencil pencil pointer" @click.prevent="editPoll(id)"></span></a>
            <span class="glyphicon glyphicon-trash trash pointer" @click.prevent="deletePoll(index)"></span></a>
          </div>
        </div>
        </li>
      </ul>


  </div>
</template>

<script>
import firebase from 'firebase';
import {config} from '../helpers/firebaseConfig';


export default {
  data(){
    return {
      polls: {}
    }
  },

  created(){
    var url = 'https://votingapp-coderhook.firebaseio.com/data/'+ this.$store.state.usern.uid + '.json';
    this.$http.get(url)
              .then(response => {
                return response.json();
              })
              .then(data => {
                console.log('data ', data);
                this.$store.state.poll = data;
                console.log("This are your polls", this.$store.state.poll);

                this.$store.commit('ids');
              });

    /*  firebase.initializeApp(config);

      var dbRef = firebase.database().ref().child('data');
      var dbRefUser = dbRef.child(this.$store.state.usern.uid)

      dbRefUser.on('value', snap => {
        this.$store.state.poll = snap.val();
      });
    this.$store.commit('ids');
    */
  },
  methods: {
    deletePoll(index){
      const dbRef = firebase.database().ref().child('data');
      const dbRefUser = dbRef.child(this.$store.state.usern.uid)

      var conf = confirm("Are you sure you want to delete it?");
        if(conf) {
          dbRefUser.child(this.$store.state.ids[index]).remove();
          dbRefUser.on('value', snap => {
            this.$store.state.poll = snap.val();
            //this.$store.state.ids.splice(index, 1);
            this.$store.commit('ids');
          });
          console.log('this.store.poll = ', this.$store.state.poll);
        }


    },
    editPoll(id) {
      console.log('Poll to edit: ',this.$store.state.poll[id]);
      this.$emit('idtoedit', id);
    }
  }


}
</script>

<style lang="css" scoped>

  .poll:hover {
    background-color: #e6ffff;
    font-size: 16px;
  }
  .glyphicon {
    margin-left: 22px;
  }

  .glyphicon:hover {
    font-size: 17px;
    color: lightblue;
  }


  .trash { color:rgb(209, 91, 71); }
  .pencil {color: green;}
  .panel-body { padding:0px;}
  .panel-footer .pagination { margin: 0; }
  .panel .glyphicon,.list-group-item .glyphicon { margin-right:0px; }
  .panel-body .radio, .checkbox { display:inline-block;margin:0px; }
  .list-group { margin-bottom:0px; }
</style>
