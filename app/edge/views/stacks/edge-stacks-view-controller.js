import angular from 'angular';

angular
  .module('portainer.edge')
  .controller('EdgeStacksViewController', function EdgeStacksViewController(
    $state,
    Notifications,
    EdgeStackService,
    ModalService,
    $scope
  ) {
    this.stacks = undefined;

    this.getStacks = getStacks.bind(this);
    this.removeAction = removeAction.bind(this);
    
    this.$onInit = function $onInit() {
      this.getStacks();
    }
    

    function removeAction(selectedItems) {
      ModalService.confirmDeletion(
        'Do you want to remove the selected stack(s)? Associated services will be removed as well.',
        function onConfirm(confirmed) {
          if (!confirmed) {
            return;
          }
          deleteSelectedStacks(selectedItems);
        }
      );
    }

    function deleteSelectedStacks(stacks) {
      var actionCount = stacks.length;
      stacks.forEach(async stack => {
        try {
          await EdgeStackService.remove(stack);
          Notifications.success('Stack successfully removed', stack.Name);
          const index = this.stacks.indexOf(stack);
          this.stacks.splice(index, 1);
        } catch (err) {
          Notifications.error(
            'Failure',
            err,
            'Unable to remove stack ' + stack.Name
          );
        } finally {
          --actionCount;
          if (actionCount === 0) {
            $state.reload();
          }
        }
      });
    }

    async function getStacks() {
      try {
        this.stacks = await EdgeStackService.stacks();
        $scope.$digest();
      } catch (err) {
        this.stacks = [];
        Notifications.error('Failure', err, 'Unable to retrieve stacks');
      }
    }
  });
