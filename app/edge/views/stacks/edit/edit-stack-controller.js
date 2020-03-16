import angular from 'angular';

angular
  .module('portainer.edge')
  .controller('EditStackController', function EditStackController(
    EdgeStackService,
    EdgeGroupService,
    $state,
    $scope
  ) {
    this.model = null;
    this.edgeGroups = null;
    
    this.editorUpdate = editorUpdate.bind(this);

    this.$onInit = async function $onInit() {
      this.edgeGroups = await EdgeGroupService.groups();
      this.model = await EdgeStackService.stack($state.params.id);
      this.formValues = {
        StackFileContent: this.model.content,
        Groups: this.model.Groups
      };
      $scope.$digest();
    };

    function editorUpdate(cm) {
      this.formValues.StackFileContent = cm.getValue();
    }
  });
