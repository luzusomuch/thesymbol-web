'use strict';

/**
 * @ngdoc function
 * @name eCommerceUserApp.controller:DisputeDetailCtrl
 * @description
 * # DisputeDetailCtrl
 * Controller of the eCommerceUserApp
 */
angular.module('eCommerceUserApp')
.controller('DisputeDetailCtrl', ['$routeParams', "$location", "sessionService", 'endpoint', "$scope", 'DisputeService', function($routeParams, $location, sessionService, endpoint, $scope, DisputeService) {
  var _this = this;
  this.currentUser = angular.fromJson(sessionService.get('user'));

  this.getDisputeDetail = function() {
  	DisputeService.findById($routeParams.dpid).then(function(resp) {
  		if (resp.data.status==='success') {
  			_this.dispute = resp.data.response;

  			var availableUsers = [_this.dispute.ownerId.toString(), _this.dispute.shopId.toString()];
  			if (availableUsers.indexOf(_this.currentUser._id.toString()) === -1) {
  				$location.path('/dispute');
  			}
  		}
  	});
  };

  if ($routeParams.dpid) {
  	this.getDisputeDetail();
  }

  this.submitted = false;
  this.postComment = function(form) {
  	_this.submitted = true;
  	if (form.$valid) {
  		DisputeService.sendMessage($routeParams.dpid, {text: _this.commentText}).then(function(resp) {
  			if (resp.data.status==='success') {
  				_this.submitted = false;
  				_this.commentText = null;
  				resp.data.response.ownerId = _this.currentUser;
  				_this.dispute.messages.push(resp.data.response);
  			} else {
  				alert('Something wrong');
  			}
  		});
  	} else {
  		alert('Please check your input');
  	}
  };

  this.updateStatus = function(status) {
  	DisputeService.updateStatus($routeParams.dpid, {status: status}).then(function(resp) {
  		if (resp.data.status==='success') {
  			_this.dispute.status = resp.data.response.status;
  			_this.changeStatus = false;
  		} else {
  			alert('Something wrong');
  		}
  	});
  };
}])