const networks = require('./config')
const fetchLiquidations = require('./getLiquidations')
const fs = require('fs').promises;
const liquidations = require('../data/liquidation.json')

const init = async () => {
  let newLiquidations = 0
  for (const network of networks) {
    const { bamms } = network
    for (const bamm of bamms){
      const fetchdLiquidations = await fetchLiquidations(`https://${network.scanner}/txs?a=${bamm.address}`, network.name, bamm.platform)
      Object.keys(fetchdLiquidations).forEach(k => {
        if(!liquidations[k]){
          liquidations[k] = fetchdLiquidations[k]
          newLiquidations++
        }
      })
    }
  }
  if(newLiquidations){
    console.log(`found ${newLiquidations} new liquidations`)
    await fs.writeFile(process.cwd() + `/data/liquidation.json`, JSON.stringify(liquidations, null, 2))
    console.log("all done!")
  } else{
    console.log(`no new liquidations found :(`)
  }
}

// kick it!
init()