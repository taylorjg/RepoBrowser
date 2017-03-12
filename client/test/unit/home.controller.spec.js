describe('HomeController', () => {

    var $controller;
    var $rootScope;
    var $q;

    beforeEach(angular.mock.module('appRepoBrowser'));

    beforeEach(angular.mock.inject(function(_$controller_, _$rootScope_, _$q_) {
        $controller = _$controller_;
        $rootScope = _$rootScope_;
        $q = _$q_;
    }));

    it('can be constructed', () => {
        var controller = $controller('HomeController');
        expect(controller).toBeDefined();
    });
});
