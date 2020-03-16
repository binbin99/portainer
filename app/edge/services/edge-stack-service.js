import { EdgeStackViewModel } from 'Edge/models/edge-stack';

angular
  .module('portainer.app')
  .factory('EdgeStackService', function EdgeStackServiceFactory() {
    const stacks =
      //TODO MOCK
      [
        new EdgeStackViewModel({
          id: 1,
          name: 'Group 1',
          endpoints: [1],
          type: 'static',
          tags: [],
          endpointsCount: 1
        }),
        new EdgeStackViewModel({
          id: 2,
          name: 'Group 2',
          endpoints: [],
          type: 'dynamic',
          tags: [1, 2, 3],
          endpointsCount: 5
        })
      ];

    var service = {};

    service.stack = async function group(groupId) {
      await wait(1000);
      return stacks.find(({ Id }) => +groupId === Id);
      // return Endpoints.get({id: endpointID}).$promise;
    };

    service.stacks = async function stacks() {
      await wait(1000);
      return [...stacks];
      // return Endpoints.query({start, limit, search}).$promise;
    };

    service.remove = async function remove(groupId) {
      const index = stacks.findIndex(({ Id }) => Id === groupId);
      await wait(1000);
      stacks.splice(index, 1);
    };

    service.create = async function create(group) {
      await wait(1000);
      group.Id = stacks.length + 1;
      stacks.push(group);
    };

    service.update = async function update(groupId, group) {
      const index = stacks.findIndex(({ Id }) => Id === groupId);
      await wait(1000);
      stacks[index] = group;
    };

    return service;

    function wait(ms) {
      return new Promise(resolve => setTimeout(resolve, ms));
    }
  });
