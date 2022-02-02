const fs = require('fs')
const Xray = require('x-ray')
const x = Xray()
  .concurrency(8)
  .throttle(100, '1s')

const network2ScraperMap = {
  arbitrum: arbitrumScraper,
  fantom: fantomScraper
}

const assetList = [
  "USDC",
  "MIM",
  "SPELL",
  "ETH",
  "DAI",
]

function extractAsset (str) {
  for (asset of assetList) {
    debugger
    if(str.indexOf(asset) > -1){
      return asset
    }
  }
}

async function fantomScraper (url, network, platform) {
  console.log(url)
  return x(url, "tbody tr", [
    {
      link: ".myFnExpandBox_searchVal@href",
      method: '.u-label--info',
      date: ".showDate",
      liquidation: x(".myFnExpandBox_searchVal@href", {
        status: "#ContentPlaceHolder1_maintable > div:nth-child(3) > div.col.col-md-9 > span",
        debt: "#wrapperContent li:nth-child(1) > div > span:nth-child(6) > span",
        debtAsset: "#wrapperContent > li:nth-child(1) > div > a",
        collAsset: "#wrapperContent > li:nth-child(2) > div > a",
      })
    }
  ])
  .paginate('#ctl00 > div.d-md-flex.justify-content-between.my-3 > ul > li:nth-child(4) > a@href')
  .limit(10)
  .then(res=>{
    console.log(`fetched ${res.length} items`)
    const resultsObj = {}
    res = res
      .filter(({method, liquidation})=> method === "Liquidate Borrow" && liquidation.status === "Success")
      .map(liq=> {
        liq.platform = platform
        liq.network = network
        liq.liquidation.debt = liq.liquidation.debt.split(" ")[0].replace(",", "")
        liq.liquidation.collAsset = extractAsset(liq.liquidation.collAsset)
        liq.liquidation.debtAsset = extractAsset(liq.liquidation.debtAsset)
        const {link} = liq
        delete liq.link
        resultsObj[link] = liq
        return liq
      })
    console.log(`after filtering ${res.length} items`)
    return resultsObj
  })
}

async function arbitrumScraper (url, network, platform) {
  console.log(url)
  return x(url, "tbody tr", [
    {
      link: ".myFnExpandBox_searchVal@href",
      method: '.u-label--info',
      date: ".showDate",
      liquidation: x(".myFnExpandBox_searchVal@href", {
        status: "#ContentPlaceHolder1_maintable > div:nth-child(3) > div.col.col-md-9 > span",
        debt: "#wrapperContent li:nth-child(1) > div > span:nth-child(6) > span",
        debtAsset: "#wrapperContent > li:nth-child(1) > div > a",
        collAsset: "#wrapperContent > li:nth-child(2) > div > a",
      })
    }
  ])
  .paginate('#ctl00 > div.d-md-flex.justify-content-between.my-3 > ul > li:nth-child(4) > a@href')
  .limit(10)
  .then(res=>{
    console.log(`fetched ${res.length} items`)
    const resultsObj = {}
    res = res
      .filter(({method, liquidation})=> method === "Liquidate Borrow" && liquidation.status === "Success")
      .map(liq=> {
        liq.platform = platform
        liq.network = network
        liq.liquidation.debt = liq.liquidation.debt.split(" ")[0].replace(",", "")
        liq.liquidation.collAsset = extractAsset(liq.liquidation.collAsset)
        liq.liquidation.debtAsset = extractAsset(liq.liquidation.debtAsset)
        const {link} = liq
        delete liq.link
        resultsObj[link] = liq
        return liq
      })
    console.log(`after filtering ${res.length} items`)
    return resultsObj
  })
}



const fetchLiquidations = (url, network, platform) => {
  const scraper = network2ScraperMap[network]
  return scraper(url, network, platform)
}

module.exports = fetchLiquidations