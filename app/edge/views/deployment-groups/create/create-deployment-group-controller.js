angular
  .module('portainer.edge')
  .controller(
    'CreateDeploymentGroupController',
    function CreateDeploymentGroupController(
      DeploymentGroupService,
      EndpointService,
      GroupService,
      TagService,
      Notifications,
      $state
    ) {
      this.state = {
        actionInProgress: false
      };

      this.model = {
        Name: '',
        Endpoints: [],
        Tags: []
      };

      this.$onInit = async function $onInit() {
        const [tags, endpoints, endpointGroups] = await Promise.all([
          TagService.tags(),
          EndpointService.endpoints(),
          GroupService.groups()
        ]);
        this.tags = tags.map(t => t.Name);
        this.endpoints = endpoints.value;
        this.endpointGroups = endpointGroups;
      };

      this.createGroup = createGroup.bind(this);

      async function createGroup() {
        this.state.actionInProgress = true;
        try {
          await DeploymentGroupService.create(this.model);
          Notifications.success('Registry successfully created');
          $state.go('edge.deploymentGroups');
        } catch (err) {
          Notifications.error('Failure', err, 'Unable to create registry');
        }
        this.state.actionInProgress = false;
      }
    }
  );
