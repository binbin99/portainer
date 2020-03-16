angular
  .module('portainer.edge')
  .controller(
    'CreateEdgeGroupController',
    function CreateEdgeGroupController(
      EdgeGroupService,
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
          await EdgeGroupService.create(this.model);
          Notifications.success('Edge group successfully created');
          $state.go('edge.groups');
        } catch (err) {
          Notifications.error('Failure', err, 'Unable to create edge group');
        }
        this.state.actionInProgress = false;
      }
    }
  );
