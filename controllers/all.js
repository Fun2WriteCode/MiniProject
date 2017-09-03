var express=require("express");
var routerForAll=express.Router();






//for employee routing
routerForAll.route("/employee")
	.get(function (req,res){
		db("employee").find().exec(function(err,employees){ 
			res.json(employees);
			console.log("Got All Data");
		});
	})
	.post(function(req,res){
		db("employee").create(req.body).exec(function(err,record){
			console.log("Employee added.");
			res.send("Employee has been Added.");
		});
	});
	
routerForAll.route("/employee/:id")
	.get(function (req,res){
		db("employee").findOne({"id":req.params.id}).exec(function (err,employee){
			res.json(employee);
			console.log("Got Single employee.");
		});
	})
	.put(function(req,res){
		db("employee").update(req.body.id,req.body).exec(function (err,employee){
			
			console.log("Employee has been updated.");
		});
	})
	.delete(function(req,res){
		db("employee").destroy({id:req.params.id}).exec(function(err,employee){
			console.log("deleted");
		});
	});
	
	
	
	
	
	
	
	
		//for product
routerForAll.route("/product")
	.get(function (req,res){
		db("product").find().exec(function(err,products){ 
			res.json(products);
		});
	})
	.post(function(req,res){
		db("product").create(req.body).exec(function(err,record){
			
		});
	});
	
routerForAll.route("/product/:id")
	.get(function (req,res){
		db("product").findOne({"id":req.params.id}).exec(function (err,product){
			res.json(product);
			
		});
	})
	.put(function(req,res){
		db("product").update(req.body.id,req.body).exec(function (err,product){
			
			
		});
	})
	.delete(function(req,res){
		db("product").destroy({id:req.params.id}).exec(function(err,product){
		
		});
	});




routerForAll.route("*")
	.all(function (req,res){
		res.redirect("./");
	});
	
module.exports=routerForAll;