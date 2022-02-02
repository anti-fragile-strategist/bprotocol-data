<template>
    <div class="grid">
      <article>
          <h3>total liquidations</h3>
          <h5>{{totalLiquidations}}</h5>
      </article>
      <article>
          <h3>debt paid</h3>
          <h5>${{totalLiquidationsAmount.toLocaleString('en-US')}}</h5>
      </article>
      <article>
          <h3>collateral collected</h3>
          <h5>${{totalCollateral.toLocaleString('en-US')}}</h5>
      </article>
  </div>
</template>

<script>

export default {
    props: ["data"],
    computed: {
        totalLiquidations: function(){
            return Object.keys(this.data).length
        },
        totalLiquidationsAmount: function(){
            debugger
            return (Object.values(this.data)
                .map(({liquidation:{debt}})=>parseFloat(debt)))
                .reduce((a, b)=> a + b)
        },
        totalCollateral:function(){
            return (this.totalLiquidationsAmount * 1.08)
        }
    }
}
</script>

<style>

</style>
