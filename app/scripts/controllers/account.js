'use strict';

/**
 * @ngdoc function
 * @name eCommerceUserApp.controller:AccountCtrl
 * @description
 * # AccountCtrl
 * Controller of the eCommerceUserApp
 */
angular.module('eCommerceUserApp')
    .controller('AccountCtrl', ['$routeParams', 'Product', 'Main', 'Checkout', 'Account', 'Order', "$location", "sessionService", 'endpoint', "$scope", "fileUpload","$http", "Wishlist", 'DisputeService', function($routeParams, Product, Main, Checkout, Account, Order, $location, sessionService, endpoint, $scope, fileUpload,$http, Wishlist, DisputeService) {
    
    var _this = this;
    $scope.myImage='';
    $scope.myCroppedImage='';

    var handleFileSelect=function(evt) {
      var file=evt.currentTarget.files[0];
      var reader = new FileReader();
      reader.onload = function (evt) {
        $scope.$apply(function($scope){
          $scope.myImage=evt.target.result;
        });
      };
      reader.readAsDataURL(file);
    };

    angular.element(document.querySelector('#fileInput')).on('change',handleFileSelect);

    function urltoFile(url, filename, mimeType) {
        return (fetch(url)
          .then(function(res) {
            return res.arrayBuffer();
          })
          .then(function(buf) {
            return new File([buf], filename, {
              type: mimeType
            });
          })
        );
      }
      _this.crop = function() {
               urltoFile($scope.myCroppedImage, 'a.png', 'image/png')
                 .then(function(file) {
                   var fd = new FormData();
                   fd.append('image', file);
                   var uploadUrl = endpoint+"/images/upload-single-image";
                   $http.post(uploadUrl, fd, {
                       transformRequest: angular.identity,
                       headers: {
                         'Content-Type': undefined
                       }
                     })
                     .success(function(data) {
                        if(data.status == "success"){
                          _this.dataLoading = false;
                 			   user.logo=data.response._id;
                 			    var saveDetails = Account.saveDetails;
                             var save = new saveDetails(user);
                             save.$get().then(function(data) {
                                 if (data.status == "success") {
                                     _this.success = data;
                                 } else {
                                     _this.dataLoading = false;
                                     _this.error = data;
                                 }
                             });

                        }

                     })
                     .error(function(data, status) {
                     });
                 })
             }

        this.close = function() {
            _this.error = '';
            _this.success = '';
        }

   	// dispute management
   	this.dispute = function(productId, shopId, orderId) {
   		DisputeService.create({
   			shopId: shopId, 
   			productId: productId, 
   			ownerId: angular.fromJson(sessionService.get('user'))._id,
   			orderId: orderId
   		}).then(resp => {
   			if (resp.data.status==='success') {
   				alert('Create dispute successfully');
   			} else {
   				if (resp.data.statusCode===409) {
   					alert('This dispute was created');
   				} else {
   					alert('Error when create dispute');
   				}
   			}
   		});
   	};

   	this.dispute = {
   		page: 1
   	};
   	this.findMyDispute = function() {
   		DisputeService.findMyDispute({page: _this.dispute.page}).then(function(resp) {
   			if (resp.data.status==='success') {
   				_this.dispute.page++;
   				_this.dispute.totalItem = resp.data.response.totalItem;
   				_this.dispute.items = (_this.dispute.items) ? _this.dispute.items.concat(resp.data.response.items) : resp.data.response.items;
   			}
   		});
   	}

   	this.findMyDispute();
		// dispute management

		var getCountry = Main.getCountry;
        var gC = new getCountry();
        gC.$get(function(data) {
			_this.country=data.response;
		});


        var getDetails = Account.getDetails;
        var gD = new getDetails();
        gD
            .$get({
                guest_token: sessionService.get("token")
            }, function(data) {
									 
					if(data.statusMessage=='Unauthorized')
					$location.path("/login");
                if (data.status == "success") {
                    _this.ud = data.response;
					_this.view=true;
                }
            }, function(data) {
                if (data.status == "401") {
                    sessionService.get("token");
                }
            })
        var getOrder = Order.getOrder;
        var sO = new getOrder();
        sO
            .$get({
                guest_token: sessionService.get("token")
            }, function(data) {
                if (data.status == "success") {
                    _this.orders = data.response;

                }
            }, function(data) {
                if (data.status == "401") {
                    sessionService.get("token");
                }
            })
        this.updateUser = function(pid) {

            _this.dataLoading = true;
			var file = $scope.myFile;
			
		urltoFile($scope.myCroppedImage, 'a.png', 'image/png')
        .then(function(file) {
			var uploadUrl = endpoint+"/images/upload-single-image";
           fileUpload.uploadFileToUrl(file, uploadUrl,_this.ud,_this);
        })

        }
        this.updateAddress = function(aid) {
			$scope.header.pageLoading=true;
			var putAddress = Account.putAddress;
			var putAddress = new putAddress(_this.edit);
            putAddress.$get({
                guest_token: sessionService.get("token")
            }).then(function(data) {
				if (data.status == "success") {
					_this.csuccess=data;
					var getDetails = Account.getDetails;
					var gD = new getDetails();
					gD
						.$get({
							guest_token: sessionService.get("token")
						}, function(data) {
												
					if(data.statusMessage=='Unauthorized')
								$location.path("/login");
							if (data.status == "success") {
								_this.ud = data.response;
								$('#editaddress').trigger('click');
								$scope.header.pageLoading=false;
								_this.success=_this.csuccess;
							}
						}, function(data) {
							if (data.status == "401") {
								sessionService.get("token");
							}
						})
				}
			})
		}

		this.returnShow = function(pid,oid) {
			$scope.header.pageLoading=true;
			var CProduct = new Product.detailsReturnProduct({ id: pid, oid: oid });
        CProduct
            .$get(function(data) {
                if (data.status == "success") {
                    _this.rproduct = data.response.product;
					$scope.header.pageLoading=false;
                }
            }, function(data) {
                if (data.status == "401") {
                    sessionService.get("token");
                }
            })
		}

        this.addToReturn = function() {
			$scope.header.pageLoading=true;
            var addReturn = new Product.addReturn(_this.return);
            addReturn
                .$get({
                    id: pid,
                    oid: oid
                }, function(data) {
                    if (data.status == "success") {
						
                        _this.success = data;
						$scope.header.pageLoading=false;
                    } else
                        _this.error = data;
					$scope.header.pageLoading=false;
                }, function(data) {
                    if (data.status == "401") {
                        sessionService.get("token");
                    }
                })
        }
		
		this.editShow = function(aid) {
				$scope.header.pageLoading=true;
				var getSingleAddress = Account.getSingleAddress;
					var gD = new getSingleAddress({id:aid});
					gD
						.$get({
							guest_token: sessionService.get("token")
						}, function(data) {
					if(data.statusMessage=='Unauthorized')
								$location.path("/login");
							if (data.status == "success") {
								_this.edit = data.response.address[0];
								
								$scope.header.pageLoading=false;
							}
						}, function(data) {
							if (data.status == "401") {
								sessionService.get("token");
							}
						})
			
		}
		
		this.addAddress = function(aid) {
			$scope.header.pageLoading=true;
			var addAddress = Checkout.addAddress;
			var addAddress = new addAddress(_this.add);
            addAddress.$get({
                guest_token: sessionService.get("token")
            }).then(function(data) {
				if (data.status == "success") {
					_this.ssuccess=data;
					var getDetails = Account.getDetails;
					var gD = new getDetails();
					gD
						.$get({
							guest_token: sessionService.get("token")
						}, function(data) {
												
					if(data.statusMessage=='Unauthorized')
								$location.path("/login");
							if (data.status == "success") {
								_this.ud = data.response;
								_this.add='';
								$('#addaddress').trigger('click');
								
								$scope.header.pageLoading=false;
								_this.success=_this.ssuccess;
							}
						}, function(data) {
							if (data.status == "401") {
								sessionService.get("token");
							}
						})
				}
			})
		}

		this.removeAddress = function(aid) {
			$scope.header.pageLoading=true;
			var deleteAddress = Account.deleteAddress;
			var deleteAddress = new deleteAddress({id:aid});
            deleteAddress.$get({
                guest_token: sessionService.get("token")
            }).then(function(data) {
				if (data.status == "success") {
					_this.ssuccess=data;
					var getDetails = Account.getDetails;
					var gD = new getDetails();
					gD
						.$get({
							guest_token: sessionService.get("token")
						}, function(data) {
												
					if(data.statusMessage=='Unauthorized')
								$location.path("/login");
							if (data.status == "success") {
								_this.ud = data.response;
								_this.view=true;
								_this.cedit=false;
								_this.cadd=false;
								$scope.header.pageLoading=false;
								_this.success=_this.ssuccess;
							}
						}, function(data) {
							if (data.status == "401") {
								sessionService.get("token");
							}
						})
				}
			})
		}

        this.changePassword = function(pid) {
            _this.dataLoading = true;
            var updatePassword = Account.updatePassword;
            var cP = new updatePassword(_this.change);
            cP.$get().then(function(data) {
                if (data.status == "success") {
                    _this.dataLoading = false;
                    _this.success = data;
                } else {
                    _this.dataLoading = false;
                    _this.error = data;
                }
            });
        }
		
		_this.download_url=endpoint;

		this.getWishlist = function () {
			var CProduct = new Wishlist.getWishlist();

            CProduct.$get({
                user_id: angular.fromJson(sessionService.get('user'))._id
            }, function(data) {
                if (data.status == "success") {
                    _this.wishlist = data.response.products;
                    _this.length = data.response.products.length;
                }
            }, function(data) {
                if (data.status == "401") {
                    sessionService.get("token");
                }
            })
	    }
	    this.getWishlist();

	    this.deleteWishlist = function (wishlist) {
					
			var CWishlist = new Wishlist.deleteWishlist({
				wishlist_id: wishlist._id
			});

			CWishlist.$get({
				guest_token: sessionService.get("token"),
				wishlist_id: wishlist._id
			}, function(data) {
				if (data.status == "success") {
					_this.success = data;
					wishlist.is_deleted = true;
					var index =  _.findIndex(_this.wishlist, function(n){
						return n._id == wishlist._id;
					});
					if (index !== -1) {
						_this.wishlist.splice(index, 1);
						_this.length--;
					}

				}
				if (data.status == "fail") {
					$scope.header.pageLoading = false;
					_this.error = data;
				}
			}, function(data) {
				if (data.status == "401") {
					sessionService.get("token");
				}
			});
	    }
       
    }])
	.directive('fileModel', ['$parse', function ($parse) {
		return {
		   restrict: 'A',
		   link: function(scope, element, attrs) {
			  var model = $parse(attrs.fileModel);
			  var modelSetter = model.assign;

			  element.bind('change', function(){
				 scope.$apply(function(){
					modelSetter(scope, element[0].files[0]);
				 });
			  });
		   }
		};
	 }])

	.service('fileUpload', ['$http', 'Account', function ($http, Account) {
		this.uploadFileToUrl = function(file, uploadUrl,user,_this){
			if(file.size!=234){
			   var fd = new FormData();
			   fd.append('image', file);
			   $http.post(uploadUrl, fd, {
				  transformRequest: angular.identity,
				  headers: {'Content-Type': undefined}
			   })
			   .success(function(data){
				   _this.dataLoading = false;
				   user.logo=data.response._id;

				$("#image_id").attr("src",data.response.cdn.secure_url);
			   
		
					var saveDetails = Account.saveDetails;
				var save = new saveDetails(user);
				save.$get().then(function(data) {
					if (data.status == "success") {
						_this.success = data;
					} else {
						_this.dataLoading = false;
						_this.error = data;
					}
				});
			   })
			}
			else
			{
				 _this.dataLoading = false;
				var saveDetails = Account.saveDetails;
				var save = new saveDetails(user);
				save.$get().then(function(data) {
					if (data.status == "success") {
						_this.success = data;
					} else {
						_this.dataLoading = false;
						_this.error = data;
					}
				});
			}

		}
	}])