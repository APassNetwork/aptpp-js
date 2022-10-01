# Javascript SDK for Aptos Passport (APTPP)

[![Discord][discord-image]][discord-url]
[![NPM Package Version][npm-image-version]][npm-url]
[![NPM Package Downloads][npm-image-downloads]][npm-url]

## Install
```
npm install aptpp-js 
```
or
```
yarn aptpp-js
```

## Usage

```
const { AptDomain } = require('aptpp-js');


let opts={};
// opts format:
//     nodeUrl : string              // Node Url, for example 'https://fullnode.devnet.aptoslabs.com'
//     contractAddress : string      // Contract address is '0x7ce77452da809fbc4ef32596cf2be18ec6f252e1884b4eefa4d4349c2941923e'
//     aptosClientConfig : object

let aptdomain=new AptDomain(opts);
```

You can using in Promise:
```
const test_domain = 'test007.apt';
const test_address = '0xfee337d85041f23e4ce1964128034c67ccfe51de731aa331a8f1fa2abf51ac3d';	

let { address } = await aptdomain.lookup( test_domain);
console.log( `${test_domain} => ${address}` );

let { domain } = await aptdomain.reverse( test_address );
console.log( `${test_address} => ${domain}` );

let data = await aptdomain.getDomainData(test_domain);
console.log( `${test_domain} => ${JSON.stringify(data,null,'  ')}` );

```

Or you can using at Callback:
```
aptdomain.lookup(test_domain,(status,address)=>{
	console.log( `${test_domain} => ${address}` );
});

aptdomain.reverse(test_address,(status,domain)=>{
	console.log( `${test_address} => ${domain}` );
});

aptdomain.getDomainData(test_domain,(status,data)=>{
	console.log( `${test_domain} => ${JSON.stringify(data,null,'  ')}` );
});
```

Also you can check the examples to quickstart.

## Requirement
- [Aptos SDK](https://github.com/aptos-labs/aptos-core/tree/main/ecosystem/typescript/sdk)

## More infomation
- [Aptos Passport](https://aptpp.com)

