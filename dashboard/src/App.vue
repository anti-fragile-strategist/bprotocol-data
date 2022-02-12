<template>
  <div id="app">
    <header class="container">
      <h1>B.Protocol</h1>
    </header>
    <main class="container">
        <h3>Liquidations</h3>
        <Totals :data="data"/>
        <Distrobutions :data="data"/>
        <!-- <MainGraph :data="data"/> -->

        <h3>Rebalancing</h3>
    </main>
    <footer class="container">
      <section></section>
      <p>
        <hgroup>
          <h5>made with <strong style="color:red">&#9829;</strong> by the <span style='font-family:"Bradley Hand"'>Anti-Fragile-Strategiest</span></h5>
          <h6>more data comming soon&#8482;</h6>
        </hgroup>
      <p/>
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
