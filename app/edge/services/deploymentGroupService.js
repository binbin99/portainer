angular
  .module('portainer.app')
  .factory('DeploymentGroupService', function DeploymentGroupServiceFactory() {
    const groups =
      //TODO MOCK
      [
        { Id: 1, Name: 'Group 1', Endpoints: [1], Tags: [1, 2] },
        { Id: 2, Name: 'Group 2', Endpoints: [], Tags: [1, 2, 3] }
      ];

    var service = {};

    service.deploymentGroup = async function deploymentGroup(groupID) {
      await wait(1000);
      return groups.find(({ ID }) => groupID === ID);
      // return Endpoints.get({id: endpointID}).$promise;
    };

    service.deploymentGroups = async function deploymentGroups() {
      await wait(1000);
      return [...groups];
      // return Endpoints.query({start, limit, search}).$promise;
    };

    service.remove = async function remove(groupID) {
      const index = groups.findIndex(({ ID }) => ID === groupID);
      await wait(1000);
      groups.splice(index, 1);
    };

    service.create = async function create(group) {
      await wait(1000);
      group.index = groups.length + 1;
      groups.push(group);
    };

    service.update = async function update(groupID, group) {
      await wait(1000);
      groups[groupID - 1] = group;
    };

    return service;

    function wait(ms) {
      return new Promise(resolve => setTimeout(resolve, ms));
    }
  });
