angular.module('portainer.edge').component('edgeStacksDatatable', {
  templateUrl: './edge-stacks-datatable.html',
  controller: 'EdgeStacksDatatableController',
  bindings: {
    titleText: '@',
    titleIcon: '@',
    dataset: '<',
    tableKey: '@',
    orderBy: '@',
    reverseOrder: '<',
    removeAction: '<',
    refreshCallback: '<'
  }
});
