import { EdgeGroupViewModel } from 'Edge/models/edge-group';

angular
  .module('portainer.app')
  .factory('EdgeGroupService', function EdgeGroupServiceFactory() {
    const groups =
      //TODO MOCK
      [
        new EdgeGroupViewModel({
          id: 1,
          name: 'Group 1',
          endpoints: [1],
          type: 'static',
          tags: [],
          endpointsCount: 1
        }),
        new EdgeGroupViewModel({
          id: 2,
          name: 'Group 2',
          endpoints: [],
          type: 'dynamic',
          tags: [1, 2, 3],
          endpointsCount: 5
        })
      ];

    var service = {};

    service.group = async function group(groupId) {
      await wait(1000);
      return groups.find(({ Id }) => +groupId === Id);
      // return Endpoints.get({id: endpointID}).$promise;
    };

    service.groups = async function groups() {
      await wait(1000);
      return [...groups];
      // return Endpoints.query({start, limit, search}).$promise;
    };

    service.remove = async function remove(groupId) {
      const index = groups.findIndex(({ Id }) => Id === groupId);
      await wait(1000);
      groups.splice(index, 1);
    };

    service.create = async function create(group) {
      await wait(1000);
      group.Id = groups.length + 1;
      groups.push(group);
    };

    service.update = async function update(groupId, group) {
      const index = groups.findIndex(({ Id }) => Id === groupId);
      await wait(1000);
      groups[index] = group;
    };

    return service;

    function wait(ms) {
      return new Promise(resolve => setTimeout(resolve, ms));
    }
  });
