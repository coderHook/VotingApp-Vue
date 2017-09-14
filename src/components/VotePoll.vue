<template lang="html">
  <div class="row">
    <h1>Vote for the Poll</h1>
    <hr>
    <div class="col-md-6 col-xs-12">
      <div class="card">
        <h2 class="card-header"> {{ poll.title }}</h2>
        <br></br>
        <div class="card-block">
          <h4 class="card-title">Options</h4>
          <br></br>
          <div>
            <p v-for="(opt, i) in Object.keys(this.poll.options)">
              <input type="radio" name="option" :value="opt" v-model="vote"> {{ opt }}
            </p>
          </div>
          <a class="btn btn-primary" @click="addVote(value)" v-if="!voted">Vote!</a>
        </div>
    </div>

    </div>
    <div class="col-md-6 col-xs-12">
      <span v-if="!voted">Waiting for your vote...</span>
      <span v-else><h2>Results</h2></span>
      <div class="chart-responsive">
        <canvas id="pie-chart" width="800" height="450"></canvas>
      </div>
    </div>
  </div>
</template>

<script>

import { Pie } from 'vue-chartjs';

  export default {
    data(){
      return {
        poll: {},
        choosen: '',
        vote: '',
        voted: false
      };
    },
    beforeMount(){
      var url = 'https://votingapp-coderhook.firebaseio.com/data/' + this.$route.params.id + '.json';
      this.$http.get(url)
                .then(response => {
                  return response.json();
                })
                .then(data => {
                  console.log('Esta es la data extraida', data);
                  this.poll = data
                });
    },

    methods: {
      addVote(val){
        if (this.vote != ''){
          this.choosen = this.vote;
          this.poll.options[this.choosen]++;
          this.voted = true;
          this.createChart();
        } else { alert("First select your option.")}
      },
      createChart(){

        let labels = Object.getOwnPropertyNames(this.poll.options);
        labels.pop()

        let data = [];
        for (const p of labels) {
          data.push(this.poll.options[p]);
        }
        console.log("this data contains", data);
        new Chart(document.getElementById("pie-chart"), {
          type: 'pie',
          data: {
            labels: labels,
            datasets: [{
              label: this.poll.title,
              backgroundColor: ["#3e95cd", "#8e5ea2","#3cba9f","#e8c3b9","#c45850"],
              data: data
            }]
          },
          options: {
            title: {
              display: true,
              text: this.poll.title
            }
    }
});
      }
    }
  }
</script>

<style lang="css">
</style>
