<template>
  <div id="app">
    <header class="container">
      <h1>Liquidations Dashboard</h1>
    </header>
    <main class="container">
      <Totals :data="data"/>
      <Distrobutions :data="data"/>
      <MainGraph :data="data"/>
    </main>
    <footer class="container">
      <small>all rights reserved</small>
    </footer>
  </div>
</template>

<script>
import "@picocss/pico"
import Totals from './components/Totals.vue'
import Distrobutions from './components/Distrobutions.vue'
import MainGraph from './components/MainGraph.vue'
import json from '../../data/liquidation.json'

export default {
  name: 'App',
  components: {
    Totals,
    Distrobutions,
    MainGraph
  },
  data(){
      return{
          data: json
      }
  }
}
</script>

<style>
  body{
     text-align: center;
  }
  main {
    min-height: 90vh;
  }
</style>
