<template>
    <div class="grid">
      <article>
        <hgroup>
          <h4>Liquidations</h4>
          <h4>by network</h4>
        </hgroup>
        <DoughnutChart :chart-data="byNetwork"/>
      </article>
      <article>
        <hgroup>
          <h4>Liquidations</h4>
          <h4>by platform</h4>
        </hgroup>
        <doughnut-chart :chart-data="byPlatform"/>
      </article>
      <article>
        <hgroup>
          <h4>Liquidations</h4>
          <h4>by collateral</h4>
        </hgroup>
        <doughnut-chart :chart-data="byCollateral"/>
      </article>
  </div>
</template>

<script>
import DoughnutChart from './charts/DoughnutChart'

export default {
    props: ["data"],
    components: {
      DoughnutChart
    },
    computed: {
        byNetwork: function () {
            const networks = {}
            let total = 0
            Object.values(this.data).forEach(({network, liquidation})=>{
                const { debt  } = liquidation 
                if (!networks[network]){
                    networks[network] = 0
                }
                networks[network] = networks[network] + parseFloat(debt)
                total = total + parseFloat(debt)
            })
            return {
              labels: Object.keys(networks),
              datasets:[{
                label: 'Data One',
                backgroundColor: [
                  'rgb(39, 216, 115)',
                  'rgb(39, 52, 216)',
                  'rgb(216, 39, 140)',
                  'rgb(216, 203, 39)'],
                data: Object.values(networks).map(v=> (v/total*100).toFixed(2))
              }]
            }
        },
        byPlatform: function () {
            let total = 0
            const platfroms = {}
            Object.values(this.data).forEach(liq=>{
                if (!platfroms[liq.platform]){
                    platfroms[liq.platform] = 0
                }
                platfroms[liq.platform] = platfroms[liq.platform] + parseFloat(liq.liquidation.debt)
                total = total + parseFloat(liq.liquidation.debt)
            })
            return {
              labels: Object.keys(platfroms),
              datasets:[{
                label: 'Data One',
                backgroundColor: [
                  'rgb(39, 216, 115)',
                  'rgb(39, 52, 216)',
                  'rgb(216, 39, 140)',
                  'rgb(216, 203, 39)'],
                data: Object.values(platfroms).map(v=> (v/total*100).toFixed(2))
              }]
            }
        },
        byCollateral: function () {
            let total = 0
            const platfroms = {}
            Object.values(this.data).forEach(({liquidation})=>{
              debugger
              const { collAsset, debt } = liquidation 
                if (!platfroms[collAsset]){
                    platfroms[collAsset] = 0
                }
                platfroms[collAsset] = platfroms[collAsset] + parseFloat(debt)
                total = total + parseFloat(debt)
            })
            return {
              labels: Object.keys(platfroms),
              datasets:[{
                label: 'Data One',
                backgroundColor: [
                  'rgb(39, 216, 115)',
                  'rgb(39, 52, 216)',
                  'rgb(216, 39, 140)',
                  'rgb(216, 203, 39)'],
                data: Object.values(platfroms).map(v=> (v/total*100).toFixed(2))
              }]
            }
        }
    }
}
</script>

<style>

</style>
