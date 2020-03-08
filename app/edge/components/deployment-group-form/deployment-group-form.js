angular.module('portainer.edge').component('deploymentGroupForm', {
  templateUrl: './deployment-group-form.html',
  controller: 'DeploymentGroupFormController',
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
