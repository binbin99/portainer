angular.module('portainer.edge').component('edgeGroupForm', {
  templateUrl: './group-form.html',
  controller: 'EdgeGroupFormController',
  bindings: {
    model: '<' /* {Name: String, Endpoints: endpointID[], Tags: String[] */,
    endpoints: '<',
    groups: '<',
    tags: '<',
    formActionLabel: '@',
    formAction: '<',
    actionInProgress: '<'
  }
});
