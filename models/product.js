module.exports = {
	identity: 'product',
	
	connection: 'mysqlDB',
	schema:true,
	migrate: 'alter',
	
	attributes: {
		type: 'string',       //size and price should be Int
		color:'string',
		size: 'string',
		price:'string',
	
}
};