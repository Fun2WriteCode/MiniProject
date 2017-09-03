var co=angular.module("co",["ui.router","restangular" ]);
//for Customers
co.config(function($stateProvider){
	$stateProvider
		

//for Employees 


		.state("addAnEmployee",{
			url:"/addEmployee",
			templateUrl:"templates/Employee/addEmployee.html",
			controller:function($scope, Restangular,$state){
				$scope.addEmployee=function(){
					
					var employee={
						name:$scope.name,
						address:$scope.address,
						cnic:$scope.cnic,
						phno:$scope.phno
					}
					Restangular.all("employee").post(employee);
					$state.go("seeAllEmployees");
				}
			}
		})
		.state("seeAllEmployees",{
			url:"/allEmployees",
			templateUrl:"templates/Employee/allEmployees.html",
			controller:function ($scope, Restangular,$state){
				Restangular.all("employee").getList().then(function(employees){ 
					$scope.employees=employees;
				});
				$scope.deleteEmployee=function(id){
                       $scope.employees=$scope.employees.filter(function(emp) {
                           return id !== emp.id;
                        });
					Restangular.one("employee",id).remove();
				   // $state.go("");
				}

			}
		})
		.state("singleEmployee",{
			url: "/profileOfSingleEmployee/:id",
			templateUrl:"templates/Employee/singleEmployee.html",
			controller: function ($stateParams, $scope, Restangular,$state){
				Restangular.one("employee",$stateParams.id).get().then(function (employee){
					$scope.employee=employee;
				});
			}
		})
		.state("editEmployee",{
			url: "/editEmployee/:id",
			templateUrl:"templates/Employee/editEmployee.html",
			controller: function ($stateParams, $scope, Restangular,$state){
				Restangular.one("employee",$stateParams.id).get().then(function (employee){
					$scope.employee=employee;
					$scope.updateEmployee=function(){
						employee.put();
						$state.go("seeAllEmployees");
					}
				});
			}
		})
				
				
				
				
				
				
				
				
				
				
//for product
		
		.state("addProduct",{
			url:"/addProduct",
			templateUrl:"templates/Product/addProduct.html",
			controller:function($scope, Restangular,$state){
				$scope.addProduct=function(){
					
					var product={
						type:$scope.type,
						color:$scope.color,
						size:$scope.size,
						price:$scope.price
					}
					Restangular.all("product").post(product);
					$state.go("seeAllProducts");
				}
			}
		})
		.state("seeAllProducts",{
			url:"/allProducts",
			templateUrl:"templates/Product/allProducts.html",
			controller:function ($scope, Restangular,$state){
				Restangular.all("product").getList().then(function(product){ 
					$scope.products=product;
				});
				$scope.deleteProduct=function(id){
					Restangular.one("product",id).remove();
				   // $state.go("");
				}
			}
		})
		.state("singleProduct",{
			url: "/SingleProduct/:id",
			templateUrl:"templates/Product/singleProduct.html",
			controller: function ($stateParams, $scope, Restangular,$state){
				Restangular.one("product",$stateParams.id).get().then(function (product){
					$scope.product=product;
				});
			}
		})
		.state("editProduct",{
			url: "/editProduct/:id",
			templateUrl:"templates/Product/editProduct.html",
			controller: function ($stateParams, $scope, Restangular,$state){
				Restangular.one("product",$stateParams.id).get().then(function (product){
					$scope.product=product;
					$scope.updateProduct=function(){
						product.put();
						$state.go("seeAllProducts");
					}
				});
			}
		})
		
		
		
		
		
		
		
		
		
		
		
		
		

		
		.state("signup" ,{
		url: "/signup",
		templateUrl:"templates/User/signup.html",
		controller: function ($stateParams, $scope, Restangular,$state){
			
			$scope.signup  = function(){
				var data = {
							name : $scope.name,
							username : $scope.username,
							password : $scope.password
							}
					if(!data.name || !data.username || !data.password){
						console.log("please fill out all the fields");
					}else{
						Restangular.all('register').post(data).then(function(res){
 													console.log(res);
													});
					}
			}
		
		}

		
		})
		
		
		
		
});