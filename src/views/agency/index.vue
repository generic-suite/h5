<!--
 * @Descripttion: 
 * @Author: harley
 * @Date: 2023-10-05 20:01:30
 * @LastEditors: harley
 * @LastEditTime: 2023-10-06 13:26:56
-->
<template>
  <van-nav-bar title="USDT" fixed left-arrow @click-left="onClickLeft"> </van-nav-bar>
  <div class="main">
    <div class="text" v-html="html"></div>
  </div>
</template>

<script setup>
const onClickLeft = () => history.back();
const html = `<p style="white-space: pre-line;" class="ng-binding">What is cryptocurrency?
Cryptocurrency is a digital currency that allows quick and secure online payments. It doesn't rely on banks to verify transactions and enables anyone anywhere to send and receive payments.

In the below countries, FARFETCH accepts cryptocurrency as a direct payment method at checkout.

North and South America

USA
Brazil
Canada
Mexico
Argentina
Colombia
El Salvador
Europe

UK
Italy
France
Switzerland
Germany
Portugal
Malta
Spain (Mainland)
Netherlands
Denmark
Austria
Romania
Africa

Nigeria
South Africa
Middle East

Saudi Arabia
Kuwait
U.A.E.
Qatar
Turkey
Asia and Australia

Australia
Korea
Hong Kong
Japan
Singapore
Philippines
Taiwan
Thailand
Indonesia
India
Vietnam


How to pay with cryptocurrency
Here's how you'll be able to place an order:

Add your items to your shopping bag

Head to checkout and select the cryptocurrency payment method

Confirm your order details and click Place Order — you'll be redirected to our payment provider, TripleA

On the TripleA payment provider page, select your preferred cryptocurrency and confirm the final amount. You may need to pay blockchain fees but you don't need to create an account with TripleA to pay with crypto

Scan the QR code or copy the wallet address and amount displayed on the screen and send the cryptocurrency of your choice from your wallet

Place your order within 25 minutes to confirm the current cryptocurrency exchange rate

When our payment provider, TripleA quotes a price in any cryptocurrency they can only honour it for 25 minutes. If the 25 minutes run out, just reload the page. TripleA will give you a new address and an updated cryptocurrency exchange rate for your payment, with another 25 minute payment window to place your order.

Once the payment is confirmed you will be redirected to the FARFETCH order confirmation page. The confirmation is usually fast, but sometimes it may take longer than traditional payment methods — while the payment is being confirmed, please don't close the browser window

If you don't send enough crypto to place your order, don't worry. You'll be notified immediately so you can send the remaining amount to complete your order.

If you send more than the necessary amount, you'll be able to complete your order and our payment provider, TripleA will email you to claim your refund. For more information, view the refunds in cryptocurrency section below.

Sending cryptocurrency to the wrong address

If you send crypto to the wrong address there is a high likelihood that it will be lost forever. Please make sure you scan the QR code with your wallet to minimise this risk.

You can also copy the entire text string of characters of the wallet address and double check the amount is correct before sending a crypto payment.

When you're sending or receiving crypto, always check the characters at the beginning and end of the address. These should be exactly the same as the address you're sending to, or receiving from.

Neither FARFETCH or TripleA will be responsible if an incorrect wallet address, network or other wrong parameters are used for payment. Crypto cannot be retrieved in those scenarios due to the irreversible nature of blockchain transactions.



Cryptocurrency payment methods
In selected countries, we'll accept the below cryptocurrencies from any wallet:

Ethereum ETH
Bitcoin BTC
Bitcoin Lightning LN BTC
Tether USDT
USD Coin USDC
BinancePay
Keep an eye on this list as we'll be adding more cryptocurrencies.</p>`;
</script>

<style scoped lang="scss">
.main {
  margin: 0 auto;
  margin-top: 50px;
  width: calc(100% - 20px);
  .text {
    padding: 20px;
  }
}
</style>
