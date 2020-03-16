import angular from 'angular';

import './edge-stack-status.css';

angular.module('portainer.edge').component('edgeStackStatus', {
  templateUrl: './edge-stack-status.html',
  bindings: {
    status: '<'
  }
});
