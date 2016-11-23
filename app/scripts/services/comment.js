'use strict';

/**
 * @ngdoc service
 * @name eCommerceUserApp.CommentService
 * @description
 * # CommentService
 * Factory in the eCommerceUserApp.
 */
angular.module('eCommerceUserApp')
.factory('CommentService', ['$routeParams', '$http', 'endpoint', 'sessionService', function($routeParams,$http, endpoint, sessionService) {
  return {
    findAllByType: (id, type, params) => {
    	return $http.get(endpoint + `/comments/${id}/${type}`, {
    		params: params
    	});
    },
  	create: (data) => {
  		return $http.post(endpoint + `/comments`, data, {
        headers: {
          Authorization: sessionService.get('user_token')
        }
      })
  	},
  	update: (id, data) => {
  		return $http.put(endpoint + `/comment/${id}`, data);
  	},
  	delete: (id) => {
  		return $http.delete(endpoint + `/comments/${id}`, {
        headers: {
          Authorization: sessionService.get('user_token')
        }
      });
  	}
	}
}]);
