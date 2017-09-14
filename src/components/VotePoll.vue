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
        url: 'https://votingapp-coderhook.firebaseio.com/data/' + this.$route.params.id + '.json',
        poll: {},
        choosen: '',
        vote: '',
        voted: false
      };
    },
    beforeMount(){
      this.$http.get(this.url)
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

        /* Lets add this vote to our database */
        console.log('this is teh url', this.url)
        this.$http.put(this.url, this.poll);
      },
      getRandomColor(numColors) {
        var letters = '0123456789ABCDEF'.split('');
        var color = '#';
        var colorines = [];
        console.log(numColors);
        for (var j = 0; j < numColors; j++){
          for (var i = 0; i < 6; i++ ) {
              color += letters[Math.floor(Math.random() * 16)];
            }
            colorines.push(color);
            color = '#';
        }
        console.log("those are the colors", colorines);
        return colorines;
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
          type: 'doughnut',
          data: {
            labels: labels,
            datasets: [{
              label: this.poll.title,
              backgroundColor: this.getRandomColor(data.length),
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
