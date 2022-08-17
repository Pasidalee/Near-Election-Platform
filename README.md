# NEAR Election Platform

[link to dapp](https://Pasidalee.github.io/Near-Election-Platform)

## 1. Tech Stack

This boilerplate uses the following tech stack:

 [React](https://reactjs.org/) - A JavaScript library for building user interfaces.    
[near-sdk-as](https://github.com/near/near-sdk-as) - A frontend library for interacting with the Near Protocol Testnet.
 [Bootstrap](https://getbootstrap.com/) - A CSS framework that provides responsive, mobile-first layouts.

## 2. Quick Start

To get this project up running locally, follow these simple steps:


### 2.1 Clone the repository:

    git clone https://github.com/Pasidalee/Near-Election-Platform.git

### 2.2 Navigate to the directory:

    cd Near-Election-Platform

### 2.3 Install the dependencies:

    npm install

### 2.4 Run the dapp:

    npm start

To properly test the dapp you will need to have a Near testnet account. [Create Account](https://wallet.testnet.near.org/)

## 3. Smart-Contract Deployment

### 3.1 Navigate to the contract directory:

    cd contract

### 3.2 Install the dependencies:

    yarn install
    npm install near-cli

### 3.3 Compile the smart contract

    yarn asb

### 3.4 Deploy the smart contract to the Near Protocol Testnet

    near deploy --accountId={ACCOUNT_ID} --wasmFile=build/release/near-marketplace-voting.wasm

This command will deploy the contract to the accountId on the testnet. The accountId now becomes the contract name

## Admin Section 

This section contains node-js terminal scripts to be run to control the operation of the voting platform.

### 4.1 Setting the admin

    near call {contractname} init '{"admin":"{adminAccount}"}' --accountId={contractname}

This sets the admin account giving that account access for functions like registering voters and adding new election candidates to the platform.
