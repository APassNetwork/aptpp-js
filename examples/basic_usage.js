const { AptDomain } = require('../src/index');

(async()=>{
	
	let opt={
		//nodeUrl:'https://fullnode.devnet.aptoslabs.com',
		//contractAddress:'0x7ce77452da809fbc4ef32596cf2be18ec6f252e1884b4eefa4d4349c2941923e',
		//aptosClientConfig:{},
	};

	let aptdomain=new AptDomain(opt);

	const test_domain = 'test007@apt';
	const test_address = '0x879b4e92b720ead64a8218e9b4cced26825e88e9923ef8b5eb4d610967433c45';
	
	///////////////////////////////////////////
    // basic using on promise

	let { address } = await aptdomain.lookup( test_domain);
	console.log( `[promise] ${test_domain} => ${address}` );

	let { domain } = await aptdomain.reverse( test_address );
	console.log( `[promise] ${test_address} => ${domain}` );

	let data = await aptdomain.getDomainRecord(test_domain);
	console.log( `[promise] ${test_domain} => ${JSON.stringify(data,null,'  ')}` );

	///////////////////////////////////////////
	 // basic using on callback

	aptdomain.lookup(test_domain,(status,address)=>{
		console.log( `[callback] ${test_domain} => ${address}` );
	});

	aptdomain.reverse(test_address,(status,domain)=>{
		console.log( `[callback] ${test_address} => ${domain}` );
	});

	aptdomain.getDomainRecord(test_domain,(status,data)=>{
		console.log( `[callback] ${test_domain} => ${JSON.stringify(data,null,'  ')}` );
	});
	
	///////////////////////////////////////////
	// domain object

	let domainObj = await aptdomain.getDomainObj(test_domain);

	//console.log(domain);

	console.log("domainObj.address(): ",		domainObj.address());
	console.log("domainObj.avatar(): ",			domainObj.avatar());
	console.log("domainObj.url(): ",			domainObj.url());
	console.log("domainObj.email(): ",			domainObj.email());
	
	console.log("domainObj.discord(): ",		domainObj.discord());
	console.log("domainObj.github(): ",			domainObj.github());
	console.log("domainObj.reddit(): ",			domainObj.reddit());
	console.log("domainObj.twitter(): ",		domainObj.twitter());
	console.log("domainObj.telegram(): ",		domainObj.telegram());

	console.log("domainObj.record('APT'): ",	domainObj.record('APT'));
	console.log("domainObj.record('ETH'): ",	domainObj.record('ETH'));
	console.log("domainObj.record('BTC'): ",	domainObj.record('BTC'));
	console.log("domainObj.record('Solana'): ",	domainObj.record('Solana'));
    
})();
