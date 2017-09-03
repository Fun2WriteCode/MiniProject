module.exports = {
	identity: 'employee',
	
	connection: 'mysqlDB',
	schema:true,
	migrate: 'alter',
	
	attributes: {
		name: 'string',
		address: 'string',
		cnic:'string',
		phno:'string',
		
		

}
};