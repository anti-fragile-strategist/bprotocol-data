<template>
    <div class="grid">
      <article >
          <h4>liquidations over time</h4>
          <LineChart :styles="{ }" :chart-data="overTime"/>
      </article>
  </div>
</template>

<script>
import LineChart from './charts/LineChart'

export default {
    props: ["data"],
    components: {
      LineChart
    },
    computed: {
        overTime: function () {
            const chartData = Object.values(this.data).map(liq=>{
                liq.x = liq.date.split(' ')[0]
                liq.y = liq.liquidation.debt
                debugger
                return liq
            })
            return {
              
              labels: chartData.map(liq => liq.x),
              datasets:[{
                label: '',
                backgroundColor: 'rgb(39, 216, 115)',
                data: chartData
              }]
            }
        }
    }
}
</script>

<style>

</style>
