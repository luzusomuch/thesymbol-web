'use strict';

/**
 * @ngdoc overview
 * @name translateApp
 * @description
 * # translateApp
 *
 * Main module of the application.
 */
angular
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
    .config(function(stripeProvider) {
        stripeProvider.setPublishableKey('pk_test_Ny36HAIYzTRPj2oCQkBQ10IY');
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
        // 'endpoint': 'http://104.236.48.110:3000/api/v1',
        'endpoint': 'http://localhost:3000/api/v1',
        'dpath': 'http://www.thesymbol.store/#/',
        'seller': 'http://seller.thesymbol.store/#/'
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


.run(['$rootScope', '$location', 'sessionService', '$http', function($rootScope, $location, sessionService, $http) {
    $rootScope.$on('$routeChangeStart', function(event, newUrl) {
        $http.defaults.headers.common['Authorization'] = sessionService.get('user_token');
        if (sessionService.get("token") == null) {
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
    });

    gapi.load('auth2:client', () => {
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
