'use strict';

/**
 * @ngdoc function
 * @name eCommerceUserApp.controller:ForgotctrlCtrl
 * @description
 * # ForgotctrlCtrl
 * Controller of the eCommerceUserApp
 */
angular.module('eCommerceUserApp')
    .controller('ForgotCtrl', ['$routeParams', 'Forgot', 'newPassword', 'sessionService', '$location', function($routeParams, Forgot, newPassword, sessionService, $location) {
        var _this = this;
        this.close = function() {
            _this.error = '';
            _this.success = '';
        }
	
        this.forgotPass = function() {
            _this.dataLoading = true;
            var FUser = new Forgot(_this.forgot);
            FUser.$forgot().then(function(data) {
                if (data.status == "success") {
                    _this.dataLoading = false;
                    _this.success = data;
                } else {
                    _this.dataLoading = false;
                    _this.error = data;
                }
            });
        }
		
        this.newPass = function() {
            _this.dataLoading = true;
            var NUser = new newPassword(_this.newpassword);
            NUser.$newpassword().then(function(data) {
                if (data.status == "success") {
                    _this.dataLoading = false;
                    _this.success = data;
                } else {
                    _this.dataLoading = false;
                    _this.error = data;
                }
            });
        }

    }]);