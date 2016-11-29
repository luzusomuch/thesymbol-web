'use strict';

/**
 * @ngdoc service
 * @name eCommerceUserApp.DisputeService
 * @description
 * # DisputeService
 * Factory in the eCommerceUserApp.
 */
angular.module('eCommerceUserApp')
.factory('DisputeService', ['$http', 'endpoint', 'sessionService', function($http, endpoint, sessionService) {
  return {
    findById: function(id, type, params) {
    	return $http.get(endpoint + '/disputes/'+id, {
    		params: params
    	});
    },
    findMyDispute: function(params) {
    	return $http.get(endpoint + '/disputes', {
    		params: params,
    		headers: {
    			Authorization: sessionService.get('user_token')
    		}
    	})
    },
  	create: function(data) {
  		return $http.post(endpoint + '/disputes', data, {
        headers: {
          Authorization: sessionService.get('user_token')
        }
      })
  	},
    sendMessage: function(id, data) {
      return $http.put(endpoint + '/disputes/'+id+'/add-message', data, {
        headers: {
          Authorization: sessionService.get('user_token')
        }
      });
    },
    updateStatus: function(id, data) {
      return $http.put(endpoint + '/disputes/'+id+'/update-status', data, {
        headers: {
          Authorization: sessionService.get('user_token')
        }
      });
    },
  	delete: function(id) {
  		return $http.delete(endpoint + '/disputes/'+id, {
        headers: {
          Authorization: sessionService.get('user_token')
        }
      });
  	}
	}
}]);
