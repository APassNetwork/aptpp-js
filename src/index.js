"use strict";

// External Deps
const { AptosClient, TokenClient, HexString } = require("aptos");
const { GroupList, FieldFormatTable } = require("./format_tbl");

// Const
const DEFAULT_NODE_URL = 'https://fullnode.testnet.aptoslabs.com';
const BASE_CONTRACT_ADDRESS = '0x7ce77452da809fbc4ef32596cf2be18ec6f252e1884b4eefa4d4349c2941923e';
const BASE_SUFFIX = '@apt';

const ErrorOkay = 200;
const ErrorNotFound = 404;
const ErrorUnknow = 500;

class AptDomainObject {
	constructor(records) {
		this.records=records?records:{};
		this.fields={};
		
		if( this.records && this.records.data && this.records.data.data ){
			for( let cur of this.records.data.data ){
				this.fields[cur.name]=cur.value;
			}
		}
	}
	
	address()	{return this.record('APT');}
	avatar()	{return this.record('avatar')}
	url()		{return this.record('url')}
	email()		{return this.record('email')}
	
	discord()	{return this.record('com.discord')}
	github()	{return this.record('com.github')}
	reddit()	{return this.record('com.reddit')}
	twitter()	{return this.record('com.twitter')}
	telegram()	{return this.record('com.telegram')}

	record(name){
		return this.fields[name]?this.fields[name]:'';
	}

}

class AptDomain {

	constructor(opts = {}) {

		//Init params
		this._nodeUrl = opts && opts.nodeUrl ? opts.nodeUrl : DEFAULT_NODE_URL;
		this._contractAddress = opts && opts.contractAddress ? opts.contractAddress : BASE_CONTRACT_ADDRESS;

		//Init handles
		this._client = new AptosClient(this._nodeUrl, opts.aptosClientConfig);
		this._tokenClient = new TokenClient(this._client);
		this._globalMap = null;
	}

	_process_domain(domain) {
		return domain ? domain.toLowerCase().replace('.apt', '').replace(BASE_SUFFIX, '') : '';
	}

	format_domain_data(cur) {

		if (!cur || !cur.data || !cur.data.data) return cur;

		cur.addr = "0x0";
		for (let dt of cur.data.data) {
			let format = FieldFormatTable[dt.key];
			if (format) {
				dt.name = format.name;
				dt.type = format.type;
				dt.group = format.group;
				dt.value = Buffer.from(new HexString(dt.value).toUint8Array()).toString();

				switch (dt.type) {
					case 'string':
						break;
					case 'unixtime':
						dt.value = new Date(parseInt(dt.value) * 1000).format('Y-M-d h:m:s');break;
				}
			} else {
				dt.name = 'Unknow';
				dt.type = 'Unknow';
			}

			//this is APT address on key1
			if (dt.key == 1) {
				cur.addr = dt.value;
			}
		}

		if (cur.nft_meta) {
			for (let dt of cur.nft_meta.default_properties.map.data) {
				if (dt.key == "creator") {
					cur.creator = Buffer.from(new HexString(dt.value.value).toUint8Array()).toString();
				}
			}
		}

		return cur;
	}

	async _get_globalmap() {
		try {
			//If init
			if (this._globalMap) return this._globalMap;

			const res = await this._client.getAccountResources(this._contractAddress);
			for (let cur of res) {
				if (cur.type == `${this._contractAddress}::APDomain::GlobalMap`) {
					this._globalMap = cur.data;
					break;
				}
			}
			return this._globalMap;
		} catch (e) {
			//Failed to get global map
		}
		return null;
	}

	//domain => address
	async lookup(domain, cb) {
		let ret = { status: ErrorUnknow, address: null };

		try {
			let globalmap = await this._get_globalmap();

			domain = this._process_domain(domain);

			const addr = await this._client.getTableItem(globalmap.domain2addr.handle, {
				key: Buffer.from(domain).toString('hex'),
				key_type: "vector<u8>",
				value_type: "address"
			});

			if (!addr) {
				//not found
				ret = { status: ErrorNotFound, address: null };
			} else {
				//found
				ret = { status: 200, address: addr };
			}
		} catch (e) {
			//not found
			if (e.status == ErrorNotFound) ret = { status: ErrorNotFound, address: null };
		}
		if (cb) cb(ret.status, ret.address);
		return ret;
	}

	//address => domain
	async reverse(address, cb) {
		let ret = { status: ErrorUnknow, domain: null };

		try {
			let globalmap = await this._get_globalmap();

			const name = await this._client.getTableItem(globalmap.addr2domain.handle, {
				key: address,
				key_type: "address",
				value_type: "vector<u8>"
			});

			if (!name) {
				//not found
				ret = { status: ErrorNotFound, name: null };
			} else {
				let namt_str = Buffer.from(new HexString(name).toUint8Array()).toString();
				if (namt_str == "") ret = { status: 502, domain: null };else ret = { status: 200, domain: namt_str + BASE_SUFFIX };
			}
		} catch (e) {
			//not found
			if (e.status == ErrorNotFound) ret = { status: ErrorNotFound, domain: null };
		}
		if (cb) cb(ret.status, ret.domain);
		return ret;
	}

	async getDomainObj(domain, cb) {
		if( cb ){
			await this.getDomainRecord(domain,function(ret){
				cb( new AptDomainObject(ret.record) );
			});
		}
		else{
			let ret=await this.getDomainRecord(domain);
			return new AptDomainObject(ret.record);
		}
	}

	//get all records from domain
	async getDomainRecord(domain, cb) {
		try {
			let globalmap = await this._get_globalmap();

			domain = this._process_domain(domain);

			let domainObject = await this._client.getTableItem(globalmap.domains.handle, {
				key: Buffer.from(domain).toString('hex'),
				key_type: "vector<u8>",
				value_type: `${this._contractAddress}::APDomain::Domain`
			});

			if (!domainObject) {
				if (cb) cb(ErrorNotFound, null);
				return { status: ErrorNotFound, record: null };
			}

			try {
				domainObject.nft_meta=await this._tokenClient.getTokenData(
					domainObject.tokenid.token_data_id.creator,
					domainObject.tokenid.token_data_id.collection,
					domainObject.tokenid.token_data_id.name,
				);
			} catch (e) {
				if (e.status == ErrorNotFound) {
					if (cb) cb(ErrorNotFound, null);
					return { status: ErrorNotFound, record: null };
				}

				console.error(e);
			}

			domainObject = this.format_domain_data(domainObject);

			if (cb) cb(ErrorOkay, domainObject);
			return { status: ErrorOkay, record: domainObject };
		} catch (e) {
			if (e.status == ErrorNotFound) {
				if (cb) cb(ErrorNotFound, null);
				return { status: ErrorNotFound, record: null };
			}
			console.error(e);
		}
		return { status: ErrorUnknow, record: null };
	}

}

module.exports = {
	AptDomain,
	AptDomainObject
};