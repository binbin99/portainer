angular
  .module('portainer.edge')
  .controller(
    'EditDeploymentGroupController',
    function EditDeploymentGroupController(
      DeploymentGroupService,
      EndpointService,
      GroupService,
      TagService,
      Notifications,
      $state,
      $scope
    ) {
      this.state = {
        actionInProgress: false
      };

      this.$onInit = async function $onInit() {
        const [
          tags,
          endpoints,
          endpointGroups,
          deploymentGroup
        ] = await Promise.all([
          TagService.tags(),
          EndpointService.endpoints(),
          GroupService.groups(),
          DeploymentGroupService.deploymentGroup($state.params.deploymentGroupID)
        ]);
        this.tags = tags.map(t => t.Name);
        this.endpoints = endpoints.value;
        this.endpointGroups = endpointGroups;
        this.model = deploymentGroup;
        $scope.$digest();
      };

      this.updateGroup = updateGroup.bind(this);

      async function updateGroup() {
        this.state.actionInProgress = true;
        try {
          await DeploymentGroupService.update(this.model.Id, this.model);
          Notifications.success('Registry successfully updated');
          $state.go('edge.deploymentGroups');
        } catch (err) {
          Notifications.error('Failure', err, 'Unable to update registry');
        }
        this.state.actionInProgress = false;
      }
    }
  );
