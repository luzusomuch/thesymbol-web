'use strict';

/**
 * @ngdoc overview
 * @name translateApp
 * @description
 * # translateApp
 *
 * Main module of the application.
 */
var myApp = angular
    .module('eCommerceUserApp', [
        'ngAnimate',
        'ngCookies',
        'ngResource',
        'ngRoute',
        'ngSanitize',
        'ngTouch',
        'pascalprecht.translate',
        'tmh.dynamicLocale',
        '720kb.socialshare',
        'ngImgCrop',
        'socialLogin',
        'angularPayments',
        'angular-stripe',
        'infinite-scroll',
        'angular-growl',
        'slick'
    ])
    .config(function(stripeProvider, $locationProvider) {
        stripeProvider.setPublishableKey('pk_test_Ny36HAIYzTRPj2oCQkBQ10IY');
        $locationProvider.html5Mode(false);
        $locationProvider.hashPrefix('!');
    })
    .constant('DEBUG_MODE', /*DEBUG_MODE*/ true /*DEBUG_MODE*/ )
    .constant('VERSION_TAG', /*VERSION_TAG_START*/ new Date().getTime() /*VERSION_TAG_END*/ )
    .constant('LOCALES', {
        'locales': {
            'ru_RU': 'Русский',
            'en_US': 'English'
        },
        'preferredLocale': 'en_US'
    })
    .constant({
        // real server
        // 'endpoint': 'http://104.236.48.110:3000/api/v1',

        // testing server
        'endpoint': 'http://104.236.38.133:3000/api/v1',

        // local
        // 'endpoint': 'http://localhost:3000/api/v1',
        'dpath': 'http://www.thesymbol.store/#/',
        'seller': 'http://seller.thesymbol.store/#'
    })
    // Router
    .config(function($routeProvider) {
        $routeProvider
            .when('/', {
                templateUrl: 'views/main.html',
                controller: 'MainCtrl',
                controllerAs: 'Main',
            })
            .when('/page/:pageid', {
                templateUrl: 'views/page.html',
                controller: 'AboutCtrl',
                controllerAs: 'about',
            })
            .when('/login', {
                templateUrl: 'views/login.html',
                controller: 'LoginCtrl',
                controllerAs: 'LC'
            })
            .when('/register', {
                templateUrl: 'views/register.html',
                controller: 'RegisterCtrl',
                controllerAs: 'RC'
            })
            .when('/download/:did', {
                templateUrl: 'views/download.html',
                controller: 'DownloadCtrl',
                controllerAs: 'download'
            })
            .when('/confirmation/:id', {
                templateUrl: 'views/login.html',
                controller: 'LoginCtrl',
                controllerAs: 'LC'
            })
            .when('/newpassword/:id', {
                templateUrl: 'views/newpassword.html',
                controller: 'ForgotCtrl',
                controllerAs: 'FC'
            })
            .when('/forgotpassword', {
                templateUrl: 'views/forgotpassword.html',
                controller: 'ForgotCtrl',
                controllerAs: 'FC'
            })
            .when('/search', {
                templateUrl: 'views/products.html',
                controller: 'ProductCtrl',
                controllerAs: 'ProdC'
            })
            .when('/search/category/:cid', {
                templateUrl: 'views/cate-products.html',
                controller: 'ProductCtrl',
                controllerAs: 'ProdC'
            })
            .when('/product/:pid', {
                templateUrl: 'views/product_details.html',
                controller: 'ProductCtrl',
                controllerAs: 'ProdC'
            })
            .when('/shop/:sid', {
                templateUrl: 'views/shop_details.html',
                controller: 'ShopCtrl',
                controllerAs: 'shopC'
            })
            .when('/products', {
                templateUrl: 'views/products.html',
                controller: 'ProductCtrl',
                controllerAs: 'ProdC'
            })
            .when('/shop', {
                templateUrl: 'views/shop.html',
                controller: 'ShopCtrl',
                controllerAs: 'shopC'
            })
            .when('/about', {
                templateUrl: 'views/about.html',
                controller: 'MainCtrl',
                controllerAs: 'Main'
            })
            .when('/cart', {
                templateUrl: 'views/cart.html',
                controller: 'CartCtrl',
                controllerAs: 'cart',
                requireAuth: true
            })
            .when('/checkout', {
                templateUrl: 'views/checkout.html',
                controller: 'CheckoutCtrl',
                controllerAs: 'checkout',
                requireAuth: true
            })
            .when('/payment', {
                templateUrl: 'views/payment.html',
                controller: 'PaymentCtrl',
                controllerAs: 'pay',
                requireAuth: true
            })
            .when('/order', {
                templateUrl: 'views/order.html',
                controller: 'AccountCtrl',
                controllerAs: 'acc',
                requireAuth: true
            })
            .when('/wishlist', {
                templateUrl: 'views/wishlist.html',
                controller: 'AccountCtrl',
                controllerAs: 'acc',
                requireAuth: true
            })
            .when('/success', {
                templateUrl: 'views/success.html',
                controller: 'SuccessCtrl',
                controllerAs: 'success',
                requireAuth: true
            })
            .when('/notify', {
                templateUrl: 'views/notify.html',
                controller: 'NotifyCtrl',
                controllerAs: 'notify',
                requireAuth: true
            })
            .when('/cancel', {
                templateUrl: 'views/cancel.html',
                controller: 'CancelCtrl',
                controllerAs: 'cancel',
                requireAuth: true
            })
            .when('/account', {
                templateUrl: 'views/account.html',
                controller: 'AccountCtrl',
                controllerAs: 'acc',
                requireAuth: true
            })
            .when('/changepassword', {
                templateUrl: 'views/changepassword.html',
                controller: 'AccountCtrl',
                controllerAs: 'acc',
                requireAuth: true
            })
            .when('/review-product/:pid/:oid', {
                templateUrl: 'views/review.html',
                controller: 'ReviewCtrl',
                controllerAs: 'Review',
                requireAuth: true
            })
            .when('/return-product/:pid/:oid', {
                templateUrl: 'views/return_product.html',
                controller: 'ReturnCtrl',
                controllerAs: 'ReturnC',
                requireAuth: true
            })
            .when('/track-product/:pid/:oid', {
                templateUrl: 'views/tracking.html',
                controller: 'ReturnCtrl',
                controllerAs: 'ReturnC',
                requireAuth: true
            })
            .when('/rss', {
                templateUrl: 'views/rss.html',
                controller: 'RssCtrl',
                controllerAs: 'rss'
            })
            .when('/successpayu', {
                templateUrl: 'views/successpayu.html',
                controller: 'PayuCtrl',
                controllerAs: 'payu'
            })
            .when('/invite-friend', {
                templateUrl: 'views/invite-friend.html',
                controller: 'InviteFriendCtrl',
                controllerAs: 'invitefr'
            })
            .otherwise({
                redirectTo: '/login'
            });

    })


.run(['$rootScope', '$location', 'sessionService', '$http', 'endpoint', 'growl', function($rootScope, $location, sessionService, $http, endpoint, growl) {
    $rootScope.getCurrency = function(lng, lat) {
        if (lng && lat) {
            delete $http.defaults.headers.common.Authorization;
            $http.get(
                'https://maps.googleapis.com/maps/api/geocode/json',
                {params: {
                    latlng: lat+','+lng,
                    sensor: false
                }}
            ).then(function(response) {
                if (response.data && response.data.results[0] && response.data.results[0].address_components) {
                    _.each(response.data.results[0].address_components, function(item) {
                        if (item.types[0]==='country') {
                            $http.get(endpoint+'/currencies/get-by-country-code', {params: {countryCode: item.short_name}}).then(function(resp) {
                                if (resp.data.status==='success') {
                                    $rootScope.locationCurrency = resp.data.response;
                                } else {
                                    growl.error(resp.data.statusMessage);
                                }
                            });
                        }
                    });
                }
            });
        }
    };

    $rootScope.$on('$routeChangeStart', function(event, newUrl) {
        $http.defaults.headers.common['Authorization'] = sessionService.get('user_token');
        if (!sessionService.get('token')) {
            var d = new Date().getTime();
            if (window.performance && typeof window.performance.now === "function") {
                d += performance.now(); //use high-precision timer if available
            }
            var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
                var r = (d + Math.random() * 16) % 16 | 0;
                d = Math.floor(d / 16);
                return (c == 'x' ? r : (r & 0x3 | 0x8)).toString(16);
            });
            sessionService.set("token", uuid);
        }
        if (newUrl.requireAuth && !sessionService.get('user')) {
            event.preventDefault();
            $location.path('/login');
        }
        if (newUrl.controller == "LoginCtrl" && sessionService.get('user')) {
            event.preventDefault();
            $location.path('/');
        }

        if (!$rootScope.currentLocation) {
            navigator.geolocation.getCurrentPosition(function(data) {
                $rootScope.currentLocation = {
                    lat: data.coords.latitude,
                    lng: data.coords.longitude
                };
                $rootScope.getCurrency($rootScope.currentLocation.lng, $rootScope.currentLocation.lat);
            }, function(err) {
                growl.error('Error when tracking your location');
            });
        } else {
            $rootScope.getCurrency($rootScope.currentLocation.lng, $rootScope.currentLocation.lat);
        }
    });

    gapi.load('auth2:client', function() {
        gapi.auth2.init({
            // apiKey: 'AIzaSyBCptVIl-Ib0M8Q9pNQnHQiXOtRjm1gtyU',
            client_id: '1053545390049-kh8pd75t6g8tkg1lti7j08dg3o4a6ghi.apps.googleusercontent.com',
            scope: 'profile email https://www.googleapis.com/auth/plus.login https://www.googleapis.com/auth/plus.me https://www.googleapis.com/auth/plus.profile.emails.read'
        });
        gapi.client.load('plus');
    });
    
    if (!window.gapi) {
        window.gapi = gapi;
    }
}])
.config(function(socialProvider) {
    //socialProvider.setLinkedInKey("75uycyp6us7n1l");
    socialProvider.setGoogleKey("631542298819-7bpqphmjec9mg4ak7v7a1onpr4pr0058.apps.googleusercontent.com");
    socialProvider.setFbKey({
        appId: "1665314757112099",
        apiVersion: "v2.7"
    });
})
// Angular debug info
.config(function($compileProvider, DEBUG_MODE) {
    if (!DEBUG_MODE) {
        $compileProvider.debugInfoEnabled(false); // disables AngularJS debug info
    }
})
// Angular Translate
.config(function($translateProvider, DEBUG_MODE, LOCALES) {
    if (DEBUG_MODE) {
        $translateProvider.useMissingTranslationHandlerLog(); // warns about missing translates
    }

    $translateProvider.useStaticFilesLoader({
        prefix: 'resources/locale-',
        suffix: '.json'
    });

    $translateProvider.preferredLanguage(LOCALES.preferredLocale);
    $translateProvider.useLocalStorage();
})
// Angular Dynamic Locale
.config(function(tmhDynamicLocaleProvider) {
    tmhDynamicLocaleProvider.localeLocationPattern('bower_components/angular-i18n/angular-locale_{{locale}}.js');
})
.config(function(growlProvider) {
    growlProvider.globalTimeToLive(3000);
    growlProvider.globalDisableCountDown(true);
})
.filter('currencyTranslate', function() {
    return function(price, currency) {
        if (currency) {
            price = price*currency.rate;
            price += currency.icon
        }
        return price;
    };
})
.filter('avatarUrl', function() {
    return function(owner) {
        var url = 'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiIHN0YW5kYWxvbmU9InllcyI/PjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB3aWR0aD0iNjQiIGhlaWdodD0iNjQiIHZpZXdCb3g9IjAgMCA2NCA2NCIgcHJlc2VydmVBc3BlY3RSYXRpbz0ibm9uZSI+PCEtLQpTb3VyY2UgVVJMOiBob2xkZXIuanMvNjR4NjQKQ3JlYXRlZCB3aXRoIEhvbGRlci5qcyAyLjYuMC4KTGVhcm4gbW9yZSBhdCBodHRwOi8vaG9sZGVyanMuY29tCihjKSAyMDEyLTIwMTUgSXZhbiBNYWxvcGluc2t5IC0gaHR0cDovL2ltc2t5LmNvCi0tPjxkZWZzPjxzdHlsZSB0eXBlPSJ0ZXh0L2NzcyI+PCFbQ0RBVEFbI2hvbGRlcl8xNTg0MjAyNTEzNyB0ZXh0IHsgZmlsbDojQUFBQUFBO2ZvbnQtd2VpZ2h0OmJvbGQ7Zm9udC1mYW1pbHk6QXJpYWwsIEhlbHZldGljYSwgT3BlbiBTYW5zLCBzYW5zLXNlcmlmLCBtb25vc3BhY2U7Zm9udC1zaXplOjEwcHQgfSBdXT48L3N0eWxlPjwvZGVmcz48ZyBpZD0iaG9sZGVyXzE1ODQyMDI1MTM3Ij48cmVjdCB3aWR0aD0iNjQiIGhlaWdodD0iNjQiIGZpbGw9IiNFRUVFRUUiLz48Zz48dGV4dCB4PSIxNCIgeT0iMzYuNSI+NjR4NjQ8L3RleHQ+PC9nPjwvZz48L3N2Zz4=';
        if (owner && owner.image) {
            url = owner.image.url;
        }
        return url;
    }
});
