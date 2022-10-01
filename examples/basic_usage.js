const { AptDomain } = require('../dist/index');

(async()=>{

	let aptdomain=new AptDomain({
		//nodeUrl:'https://fullnode.devnet.aptoslabs.com',
		//contractAddress:'0x7ce77452da809fbc4ef32596cf2be18ec6f252e1884b4eefa4d4349c2941923e',
		//aptosClientConfig:{},
	});

	const test_domain = 'test007.apt';
	const test_address = '0xfee337d85041f23e4ce1964128034c67ccfe51de731aa331a8f1fa2abf51ac3d';
	
	///////////////////////////////////////////
    
	let { address } = await aptdomain.lookup( test_domain);
	console.log( `[promise] ${test_domain} => ${address}` );

	let { domain } = await aptdomain.reverse( test_address );
	console.log( `[promise] ${test_address} => ${domain}` );

	let data = await aptdomain.getDomainRecord(test_domain);
	console.log( `[promise] ${test_domain} => ${JSON.stringify(data,null,'  ')}` );

	///////////////////////////////////////////

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
    
})();
