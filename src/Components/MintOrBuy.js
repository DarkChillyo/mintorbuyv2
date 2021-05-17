import React, { useState, useEffect } from 'react';
import '../App.css'
import { ApolloClient } from '@apollo/client/apollo-client.cjs'
import { InMemoryCache}  from '@apollo/client/cache/inmemory/inMemoryCache'
import { HttpLink } from '@apollo/client/link/http/HttpLink'
import { useQuery } from '@apollo/client/react/hooks'
import gql from 'graphql-tag'
import Gecko from './CoinGecko'
import Component1 from './Component1'
import {fetchBSCData} from './Covalent'

//import { render } from '@testing-library/react'
//import NameForm from './MintCalc'

export const client = new ApolloClient({
  link: new HttpLink({
    uri: 'https://api.thegraph.com/subgraphs/name/uniswap/uniswap-v2'
  }),
  fetchOptions: {
    mode: 'no-cors'
  },
  cache: new InMemoryCache()
})

const ETH_PRICE_QUERY = gql`
  query pairs {
    pairs(where: { id: "0x347c280fa84363147441cae5cd28df1b596f2c1f" }) {
      reserveUSD
      totalSupply
      token0Price
      token1Price
    }
  }
`
/*
const PRISM_VOLUME_QUERY = gql`
  query pairDayDatas {
    pairDayDatas(first: 1000, skip:0, orderBy: date, orderDirection: asc, where: { pairAddress: "0xbd7326e81993e6783682a85bb6b7d2df82e17509" })
      id
      date
      dailyVolumeToken0
      dailyVolumeToken1
      dailyVolumeUSD
      reserveUSD
    }
  }
`
*/

const PRISM_PRICE_QUERY = gql`
query tokens {
  tokens(where: { id: "0xd46df541148932690b81092f600f35208afd4325" }) {
    derivedETH
    totalLiquidity
    totalSupply
    untrackedVolumeUSD
  }
}
`
const WETH_PRICE_QUERY = gql`
  query bundles {
    bundles(where: { id: "1" }) {
      ethPrice
    }
  }
`

const MintOrBuy = (props) => {
  const { loading: ethLoading, data: ethPriceData } = useQuery(ETH_PRICE_QUERY)
  const { loading: prismLoading, data: prismPriceData } = useQuery(PRISM_PRICE_QUERY)
  //const { loading: prismVolLoading, data: prismVolData } = useQuery(PRISM_VOLUME_QUERY)
  const { loading: wethLoading, data: wethPriceData } = useQuery(WETH_PRICE_QUERY)
 

  const ethPriceInUSD = ethPriceData && ethPriceData.pairs[0].reserveUSD
  const pairTotalSupply = ethPriceData && ethPriceData.pairs[0].totalSupply
  
  const wethPriceInUSD = wethPriceData && wethPriceData.bundles[0].ethPrice

  const prismPriceInETH = prismPriceData && prismPriceData.tokens[0].derivedETH
  //const totalPrismMinted = prismPriceData && prismPriceData.tokens[0].totalSupply
  const prismTradeVolume = prismPriceData && prismPriceData.tokens[0].untrackedVolumeUSD

  const buyPrismPrice = (parseFloat(prismPriceInETH) * parseFloat(wethPriceInUSD))

  const mintPrismPrice = ((ethPriceInUSD/pairTotalSupply)*0.000005)

 const prismAmountToMint = Number(props.formData)
const geckoNumber = (props.geckoData)

 let mintAmount
 if (Number(prismAmountToMint) == "0") {
     mintAmount = 1
 }
 else {
     mintAmount = Number(props.formData)

 }
 

 const yourPercentOfTotalPrism = (prismAmountToMint/((Number(geckoNumber)+prismAmountToMint)))

 const totalPrismAfterMint = (Number(prismAmountToMint)+Number(geckoNumber))

 const averagePercentageOfVolume = (yourPercentOfTotalPrism*(Number(prismTradeVolume)*0.0025))

const [bscPrice, setBscPrice] = useState([]);



const fetchBSCData = async () => {

 
const res = await fetch(`https://api.pancakeswap.info/api/v2/tokens/0x4cf12dd46bab9afc94e049342fd75a9eaff5d096`,
  { 'stale-while-revalidate': 'max-age=604800' }
);
const { data } = await res.json();
console.log(data.price)
setBscPrice(data.price)

}
fetchBSCData() 

let Conclusion
if (mintPrismPrice > buyPrismPrice && bscPrice) {
  Conclusion = "Currently cheaper to Buy Prism over Buying"
}
else {
  Conclusion ="Currently cheaper to Mint Prism over Minting"
}  



  return (

    



<div>

<br />
<br />
Your Percentage of Total After Mint: {(yourPercentOfTotalPrism * 100).toFixed(4)} %
<br />
<br />
Total Supply Before Your Mint: {geckoNumber}
<br />
<br />
Total Supply After Your Mint: {totalPrismAfterMint}
<br />
<br />
Potential Amount Earned if Minted From Beginning: ${averagePercentageOfVolume.toFixed(4)}
<br />
<br />
Total Volume: {Number(prismTradeVolume).toFixed(4)}
<br />
<br />
<br />
<br />
<br />

      <div>
   
Cost to Mint PRISM:{' '}
{ethLoading 
  ? 'Loading token data...'
  : '$' +
    // parse responses as floats and fix to 2 decimals
    ((mintAmount)*parseFloat(mintPrismPrice)).toFixed(4)}


<br />
<br />

Cost to Buy PRISM:{' '}
{prismLoading || wethLoading
  ? 'Loading token data...'
  : '$' +
    // parse responses as floats and fix to 2 decimals
    ((mintAmount)*parseFloat(buyPrismPrice)).toFixed(4)}

<br />
<br />

Cost to Buy bPrism {''}
{'$' + parseFloat(bscPrice).toFixed(4)}
    


<br />
<br />
<h3>
{Conclusion}

</h3>


      </div>
      
    </div>
  )
}



export default MintOrBuy