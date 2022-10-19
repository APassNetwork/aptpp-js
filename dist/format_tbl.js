'use strict';

const GroupList = ['address', 'dns', 'txt', 'sns'];

const FieldFormatTable = {

	1: {
		group: 'address',
		name: 'APT',
		type: 'string'
	},

	//////////////////////////////////
	400: {
		group: 'dns',
		name: 'A Record',
		type: 'string'
	},
	401: {
		group: 'dns',
		name: 'CNAME Record',
		type: 'string'
	},
	402: {
		group: 'dns',
		name: 'TXT Record',
		type: 'string'
	},
	403: {
		group: 'dns',
		name: 'IPFS CID',
		type: 'string'
	},
	//////////////////////////////////

	100: {
		group: 'address',
		name: 'ETH',
		type: 'string'
	},
	101: {
		group: 'address',
		name: 'BTC',
		type: 'string'
	},
	102: {
		group: 'address',
		name: 'BSC',
		type: 'string'
	},
	103: {
		group: 'address',
		name: 'Solana',
		type: 'string'
	},
	/*104:{
 		group:'address',
 		name:'Avalanche',
 		type:'string'
 	},
 	105:{
 		group:'address',
 		name:'TRON',
 		type:'string'
 	},
 	106:{
 		group:'address',
 		name:'Polygon',
 		type:'string'
 	},*/

	//////////////////////////////////

	201: {
		group: 'txt',
		name: 'email',
		type: 'email'
	},
	202: {
		group: 'txt',
		name: 'url',
		type: 'url'
	},
	203: {
		group: 'txt',
		name: 'avatar',
		type: 'url'
	},
	204: {
		group: 'txt',
		name: 'description',
		type: 'string'
	},
	/*205:{
 	group:'txt',
 	name:'notice',
 	type:'string'
 },
 206:{
 	group:'txt',
 	name:'keywords',
 	type:'string'
 },*/

	//////////////////////////////////

	301: {
		group: 'sns',
		name: 'com.discord',
		type: 'string'
	},
	302: {
		group: 'sns',
		name: 'com.github',
		type: 'string'
	},
	303: {
		group: 'sns',
		name: 'com.reddit',
		type: 'string'
	},
	304: {
		group: 'sns',
		name: 'com.twitter',
		type: 'string'
	},
	305: {
		group: 'sns',
		name: 'com.telegram',
		type: 'string'

		//////////////////////////////////
	} };

module.exports = {
	GroupList,
	FieldFormatTable
};