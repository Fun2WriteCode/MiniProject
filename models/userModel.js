module.exports = {
	identity: 'user',
	
	connection: 'mysqlDB',
	schema:true,
	migrate: 'alter',
	
	attributes: {
		name: 'string',
		username: 'string',
		password:'string'		

}
};

module.exports.getUserById = function(id, callback){
  db('user').findById(id, callback);
};
module.exports.getUserByUsername = function(username, callback){
  var query = {username: username};
   db('user').findOne(query, callback);
};

module.exports.addUser = function(newUser, callback){
  bcrypt.genSalt(10, function(err, salt) {
    bcrypt.hash(newUser.password , salt, function(err, hash) {
      if(err) throw err;
        newUser.password= hash;
        newUser.save(callback);

        // Store hash in your password DB. 
    });
});

};

module.exports.comparePassword = function(candidatePassword, hash, callback){
bcrypt.compare(candidatePassword, hash, function(err, isMatch){
  if(err) throw err;
  callback(null, isMatch);
});
}