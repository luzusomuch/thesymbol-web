'use strict';

/**
 * @ngdoc function
 * @name eCommerceUserApp.controller:RegisterctrlCtrl
 * @description
 * # RegisterctrlCtrl
 * Controller of the eCommerceUserApp
 */
angular.module('eCommerceUserApp')
    .controller('RegisterCtrl', ['Register', 'Main', 'sessionService', '$location', '$scope', function(Register, Main, sessionService, $location, $scope) {
        var _this = this;
        this.close = function() {
            _this.error = '';
            _this.success = '';
        }
		
		
		var getCountry = Main.getCountry;
        var gC = new getCountry();
        gC.$get(function(data) {
			_this.country=data.response;
		});

        this.registerAsUser = function() {
            _this.dataLoading = true;
            var User = new Register(_this.register);
            User.$register().then(function(data) {
                if (data.status == "success") {
                    _this.dataLoading = false;
                    _this.success = data;
                    sessionService.set('success',JSON.stringify(data));
					$location.path("#/login");
                } else {
                    _this.dataLoading = false;
                    _this.error = data;
                }
            });
        }
    }]);