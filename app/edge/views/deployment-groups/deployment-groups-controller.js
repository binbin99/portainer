angular
  .module('portainer.edge')
  .controller('DeploymentGroupsController', function DeploymentGroupsController(
    Notifications,
    $state,
    $scope,
    DeploymentGroupService
  ) {
    this.removeAction = removeAction.bind(this);

    this.$onInit = async function $onInit() {
      this.items = await DeploymentGroupService.deploymentGroups();
      $scope.$digest();
    };

    async function removeAction(selectedItems) {
      let actionCount = selectedItems.length;
      for (const item of selectedItems) {
        try {
          await DeploymentGroupService.remove(item.Id);
          $scope.$digest();

          Notifications.success(
            'Deployment Group successfully removed',
            item.Name
          );
          const index = this.items.indexOf(item);
          this.items.splice(index, 1);
        } catch (err) {
          Notifications.error(
            'Failure',
            err,
            'Unable to remove Deployment Group'
          );
        } finally {
          actionCount--;
          if (actionCount === 0) {
            $state.reload();
          }
        }
      }
    }
  });
