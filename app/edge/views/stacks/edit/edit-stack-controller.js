import angular from 'angular';

angular
  .module('portainer.edge')
  .controller('EditStackController', function EditStackController(
    EdgeStackService,
    $state,
    $scope
  ) {
    this.model = null;

    this.$onInit = async function $onInit() {
      this.model = await EdgeStackService.stack($state.params.id);
      $scope.$digest();
    };
  });
