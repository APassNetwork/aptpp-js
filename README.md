# SDK for Aptos Passport (APTPP)

## Install
```
npm install aptpp-js 
```
or
```
yarn add aptpp-js
```

## Usage

```
const { AptDomain } = require('aptpp-js');

// opts format:
//     nodeUrl : string              // Node Url, for example 'https://fullnode.devnet.aptoslabs.com'
//     contractAddress : string      // Contract address is '0x7ce77452da809fbc4ef32596cf2be18ec6f252e1884b4eefa4d4349c2941923e'
//     aptosClientConfig : object

let opts={};
let aptdomain=new AptDomain(opts);
```

### Basic

You can using in Promise:
```
const test_domain = 'test007.apt';
const test_address = '0xfee337d85041f23e4ce1964128034c67ccfe51de731aa331a8f1fa2abf51ac3d';	

let { address } = await aptdomain.lookup( test_domain);
console.log( `${test_domain} => ${address}` );

let { domain } = await aptdomain.reverse( test_address );
console.log( `${test_address} => ${domain}` );

let record = await aptdomain.getDomainRecord(test_domain);
console.log( `${test_domain} => ${JSON.stringify(record,null,'  ')}` );

```

Or you can using at Callback:
```
aptdomain.lookup(test_domain,(status,address)=>{
	console.log( `${test_domain} => ${address}` );
});

aptdomain.reverse(test_address,(status,domain)=>{
	console.log( `${test_address} => ${domain}` );
});

aptdomain.getDomainRecord(test_domain,(status,record)=>{
	console.log( `${test_domain} => ${JSON.stringify(record,null,'  ')}` );
});
```

### Domain Object

Create a object of domain, get more formated data.

Here is the sample:
```
let domainObj = await aptdomain.getDomainObj('test007.apt');

console.log("domainObj.address(): ",        domainObj.address());
console.log("domainObj.avatar(): ",         domainObj.avatar());
console.log("domainObj.url(): ",            domainObj.url());
console.log("domainObj.email(): ",          domainObj.email());
	
console.log("domainObj.discord(): ",        domainObj.discord());
console.log("domainObj.github(): ",         domainObj.github());
console.log("domainObj.reddit(): ",         domainObj.reddit());
console.log("domainObj.twitter(): ",        domainObj.twitter());
console.log("domainObj.telegram(): ",       domainObj.telegram());

console.log("domainObj.record('APT'): ",    domainObj.record('APT'));
console.log("domainObj.record('ETH'): ",    domainObj.record('ETH'));
console.log("domainObj.record('BTC'): ",    domainObj.record('BTC'));
console.log("domainObj.record('Solana'): ", domainObj.record('Solana'));
```

Also you can check the examples to quickstart.

## Requirement
- [Aptos SDK](https://github.com/aptos-labs/aptos-core/tree/main/ecosystem/typescript/sdk)

## More infomation
- [Aptos Passport](https://aptpp.com)

