var mysqlAdapter = require('sails-mysql');
var mongoAdapter = require('sails-mongo');

module.exports = {
	adapters: {
		mongoAdapt: mongoAdapter,
		mysqlAdapt: mysqlAdapter
	},

  connections: {

    mysqlDB: {
		adapter: 'mysqlAdapt',
		host: 'localhost',
		database: 'mini',
		user:'root',
		password:'',
		supportBigNumbers:true,
		debug:['ComQueryPacket'],
		trace:true 
    } 
  },
  
  secret:"yoursecret"
};
