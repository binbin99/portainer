import { EdgeStackViewModel } from 'Edge/models/edge-stack';

angular
  .module('portainer.app')
  .factory('EdgeStackService', function EdgeStackServiceFactory() {
    const stacks =
      //TODO MOCK
      [
        new EdgeStackViewModel({
          Id: 1,
          Name: 'Stack 1',
          Status: { Acknowledged: 3, Ok: 1, Error: 3 },
          CreationDate: Date.now() - 3 * 24 * 60 * 60 * 1000
        }),
        new EdgeStackViewModel({
          Id: 2,
          Name: 'Stack 2',
          Status: { Acknowledged: 2, Ok: 11, Error: 0 },
          CreationDate: Date.now() - 15 * 24 * 60 * 60 * 1000
        })
      ];

    const stackContent = {};

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

    service.update = async function update(groupId, group) {
      const index = stacks.findIndex(({ Id }) => Id === groupId);
      await wait(1000);
      stacks[index] = group;
    };

    service.createSwarmStackFromFileContent = async function createSwarmStackFromFileContent(
      name,
      content,
      env,
      groups
    ) {
      const newStack = new EdgeStackViewModel({
        Id: stacks.length,
        Name: name,
        Groups: groups
      });
      stackContent[newStack.Id] = content;
      await wait(500);
      stacks.push(newStack);
    };

    service.createSwarmStackFromFileUpload = async function createSwarmStackFromFileUpload(
      name,
      stackFile,
      env,
      groups
    ) {
      const newStack = new EdgeStackViewModel({
        Id: stacks.length,
        Name: name,
        Groups: groups
      });
      // stackContent[newStack.Id] = content;
      await wait(500);
      stacks.push(newStack);
    };

    service.createSwarmStackFromGitRepository = async function createSwarmStackFromGitRepository(
      name,
      repositoryOptions,
      env,
      groups
    ) {
      const newStack = new EdgeStackViewModel({
        Id: stacks.length,
        Name: name,
        Groups: groups
      });
      // stackContent[newStack.Id] = content;
      await wait(500);
      stacks.push(newStack);
    };

    return service;

    function wait(ms) {
      return new Promise(resolve => setTimeout(resolve, ms));
    }
  });
