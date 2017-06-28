"use strict";

(function(){

  angular
  .module("petSitter", [
    "ui.router",
    "ngResource",
    "angular.filter"
  ])
  .config([
    "$stateProvider",
    RouterFunction
  ])
  .controller("PetSittersController", [
    "PetSitterFactory",
    PetSittersControllerFunction
  ])
  .controller("ShowController", [
    "$stateParams",
    "PetSitterFactory",
    PetSittersShowControllerFunction
  ])
  .controller("PetNewController", [
    "$state",
    "CreatePetFactory",
    "$stateParams",
    PetNewControllerFunction
  ])
  .controller("OwnersController", [
    "PetSitterOwnerFactory",
    PetSittersOwnersControllerFunction
  ])
  .controller("OwnersShowController", [
    "$stateParams",
    "PetSitterOwnerShowFactory",
    PetSittersOwnersShowControllerFunction
  ])
  .factory("PetSitterFactory", [
    "$resource",
    FactoryFunction
  ])
  .factory("PetSitterOwnerFactory", [
    "$resource",
    FactoryOwnerFunction
  ])
  .factory("PetSitterOwnerShowFactory", [
    "$resource",
    FactoryOwnerShowFunction
  ])
  .factory("CreatePetFactory", [
    "$resource",
    FactoryCreatePetFunc
  ])

  function RouterFunction($stateProvider) {
    $stateProvider
    .state("PetSitterHome", {
      url: "/",
      templateUrl: "js/ng-views/home.html",
      controller: "PetSittersController",
      controllerAs: "vm"
    })
    .state("PetSitterOwnerIndex", {
      url: "/owners",
      templateUrl: "js/ng-views/owners/index.html",
      controller: "OwnersController",
      controllerAs: "vm"
    })
    .state("petNew", {
      url: "/owners/:id/pets/new",
      templateUrl: "js/ng-views/pets/new.html",
      controller: "PetNewController",
      controllerAs: "vm"
    })
    .state("PetSitterOwnerShow", {
      url: "/owners/:id",
      templateUrl: "js/ng-views/owners/show.html",
      controller: "OwnersShowController",
      controllerAs: "vm"
    })
    .state("PetSitterIndex", {
      url: "/sitters",
      templateUrl: "js/ng-views/sitters/index.html",
      controller: "PetSittersController",
      controllerAs: "vm"
    })
    .state("PetSitterShow", {
      url: "/sitters/:id",
      templateUrl: "js/ng-views/sitters/show.html",
      controller: "ShowController",
      controllerAs: "vm"
    })
  }

  function FactoryFunction($resource) {
    return $resource("http://localhost:3000/sitters/:id");
  }

  function FactoryOwnerFunction($resource) {
    return $resource("http://localhost:3000/pets/all_pets");
  }

  function FactoryOwnerShowFunction($resource) {
    return $resource("http://localhost:3000/owners/:id");
  }

  function FactoryCreatePetFunc($resource) {
    return $resource("http://localhost:3000/owners/:owner_id/pets");
  }

  function PetSittersControllerFunction(PetSitterFactory) {
    this.sitters = PetSitterFactory.query()
    this.slider = {
      minValue: 10,
      maxValue: 90,
      options: {
          floor: 0,
          ceil: 100,
          step: 1
      }
    }
  }

  function PetSittersShowControllerFunction($stateParams, PetSitterFactory) {
    this.sitter = PetSitterFactory.get({id: $stateParams.id})
  }

  function PetNewControllerFunction($state, CreatePetFactory, $stateParams){
    this.pet = new CreatePetFactory();
    this.create = function(){
      this.pet.$save({owner_id: $stateParams.id})
    }
  }

  function PetSittersOwnersControllerFunction(PetSitterOwnerFactory) {
    this.pets = PetSitterOwnerFactory.query()
  }

  function PetSittersOwnersShowControllerFunction($stateParams, PetSitterOwnerShowFactory) {
    this.owner = PetSitterOwnerShowFactory.get({id: $stateParams.id})
  }





})();
