angular.module('portainer.edge').component('deploymentGroupsDatatable', {
  templateUrl: './deployment-groups-datatable.html',
  controller: 'DeploymentGroupsDatatableController',
  bindings: {
    dataset: '<',
    tableKey: '@',
    orderBy: '@',
    removeAction: '<',
    updateAction: '<',
    reverseOrder: '<'
  }
});
