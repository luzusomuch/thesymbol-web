'use strict';

/**
 * @ngdoc service
 * @name eCommerceUserApp.LikeService
 * @description
 * # LikeService
 * Factory in the eCommerceUserApp.
 */
angular.module('eCommerceUserApp')
.factory('LikeService', ['$http', 'endpoint', 'sessionService', function($http, endpoint, sessionService) {
  return {
    check: (id, type) => {
    	return $http.get(endpoint + `/likes/${id}/${type}`);
    },
  	like: (data) => {
  		return $http.post(endpoint + `/likes`, data, {
        headers: {
          Authorization: sessionService.get('user_token')
        }
      })
  	},
  	unlike: (id) => {
  		return $http.delete(endpoint + `/likes/${id}`, {
        headers: {
          Authorization: sessionService.get('user_token')
        }
      });
  	}
	}
}]);
