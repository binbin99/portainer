import angular from 'angular';

angular.module('portainer.edge', []).config([
  '$stateRegistryProvider',
  function($stateRegistryProvider) {
    const edge = {
      name: 'edge',
      url: '/edge',
      parent: 'root',
      abstract: true,
      onEnter($state, Notifications, Authentication) {
        if (!Authentication.isAdmin()) {
          Notifications.warning('User is not authorized');
          $state.go('portainer.home');
        }
      }
    };

    const groups = {
      name: 'edge.groups',
      url: '/groups',
      views: {
        'content@': {
          component: 'edgeGroupsView'
        }
      }
    };

    const groupsNew = {
      name: 'edge.groups.new',
      url: '/new',
      views: {
        'content@': {
          component: 'createEdgeGroupView'
        }
      }
    };

    const groupsEdit = {
      name: 'edge.groups.edit',
      url: '/:groupId',
      views: {
        'content@': {
          component: 'editEdgeGroupView'
        }
      }
    };

    const stacks = {
      name: 'edge.stacks',
      url: '/stacks',
      views: {
        'content@': {
          component: 'edgeStacksView'
        }
      }
    };

    const stacksNew = {
      name: 'edge.stacks.new',
      url: '/new',
      views: {
        'content@': {
          component: 'createEdgeStackView'
        }
      }
    };

    const stacksEdit = {
      name: 'edge.stacks.edit',
      url: '/:id',
      views: {
        'content@': {
          component: 'editEdgeStackView'
        }
      }
    };

    $stateRegistryProvider.register(edge);
    $stateRegistryProvider.register(groups);
    $stateRegistryProvider.register(groupsNew);
    $stateRegistryProvider.register(groupsEdit);
    $stateRegistryProvider.register(stacks);
    $stateRegistryProvider.register(stacksEdit);
    $stateRegistryProvider.register(stacksNew);
  }
]);
