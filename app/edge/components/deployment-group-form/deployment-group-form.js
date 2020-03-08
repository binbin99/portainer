angular.module('portainer.edge').component('deploymentGroupForm', {
  templateUrl: './deployment-group-form.html',
  controller: 'DeploymentGroupFormController',
  bindings: {
    'formActionLabel': '@'
  }
});
