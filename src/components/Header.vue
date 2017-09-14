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
                  <li class="page-scroll">
                      <a href="">Sign Up</a>
                  </li>
                  <li class="page-scroll">
                      <a href="">Login</a>
                  </li>

              </ul>
          </div>
          <!-- /.navbar-collapse -->
      </div>
      <!-- /.container-fluid -->
  </nav>
  <!-- end of navbar -->

  <div class="page-header text-center">
      <h2>Voting App</h2>
      <h3>Create a custom poll</h3>
      <button class="btn btn-success">Sign Up!</button>
      <br></br>
      <router-link tag="button" class="btn btn-success" to="/newPoll">Create poll!</router-link>
  </div>
</div>
</template>

<script>
export default {
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

</style>
