import angular from 'angular';

angular
  .module('portainer.edge')
  .controller('CreateStackController', function CreateStackController(
    $state,
    EdgeStackService,
    EdgeGroupService,
    Notifications,
    FormHelper
  ) {
    this.formValues = {
      Name: '',
      StackFileContent: '',
      StackFile: null,
      RepositoryURL: '',
      RepositoryReferenceName: '',
      RepositoryAuthentication: false,
      RepositoryUsername: '',
      RepositoryPassword: '',
      Env: [],
      ComposeFilePathInRepository: 'docker-compose.yml',
      Groups: []
    };

    this.state = {
      Method: 'editor',
      formValidationError: '',
      actionInProgress: false,
      StackType: null
    };

    this.edgeGroups = null;

    this.editorUpdate = editorUpdate.bind(this);

    this.$onInit = async function $onInit() {
      this.edgeGroups = await EdgeGroupService.groups();
    };

    this.addEnvironmentVariable = function addEnvironmentVariable() {
      this.formValues.Env.push({ name: '', value: '' });
    };

    this.removeEnvironmentVariable = function removeEnvironmentVariable(index) {
      this.formValues.Env.splice(index, 1);
    };

    this.deployStack = async function deployStack() {
      var name = this.formValues.Name;
      var method = this.state.Method;

      if (!this.validateForm(method)) {
        return;
      }

      this.state.actionInProgress = true;
      try {
        await this.createSwarmStack(name, method);

        Notifications.success('Stack successfully deployed');
        $state.go('edge.stacks');
      } catch (err) {
        Notifications.error('Deployment error', err, 'Unable to deploy stack');
      } finally {
        this.state.actionInProgress = false;
      }
    };

    this.validateForm = function validateForm(method) {
      this.state.formValidationError = '';

      if (method === 'editor' && this.formValues.StackFileContent === '') {
        this.state.formValidationError = 'Stack file content must not be empty';
        return;
      }

      return true;
    };

    this.createSwarmStack = function createSwarmStack(name, method) {
      var env = FormHelper.removeInvalidEnvVars(this.formValues.Env);
      switch (method) {
        case 'editor':
          return this.createSwarmStackFromFileContent(name, env);
        case 'upload':
          return this.createSwarmStackFromFileUpload(name, env);
        case 'repository':
          return this.createSwarmStackFromGitRepository(name, env);
      }
    };

    this.createSwarmStackFromFileContent = function createSwarmStackFromFileContent(
      name,
      env
    ) {
      const stackFileContent = this.formValues.StackFileContent;
      return EdgeStackService.createSwarmStackFromFileContent(
        name,
        stackFileContent,
        env,
        this.formValues.Groups
      );
    };

    this.createSwarmStackFromFileUpload = function createSwarmStackFromFileUpload(
      name,
      env
    ) {
      const stackFile = this.formValues.StackFile;
      return EdgeStackService.createSwarmStackFromFileUpload(
        name,
        stackFile,
        env,
        this.formValues.Groups
      );
    };

    this.createSwarmStackFromGitRepository = function createSwarmStackFromGitRepository(
      name,
      env
    ) {
      const repositoryOptions = {
        RepositoryURL: this.formValues.RepositoryURL,
        RepositoryReferenceName: this.formValues.RepositoryReferenceName,
        ComposeFilePathInRepository: this.formValues
          .ComposeFilePathInRepository,
        RepositoryAuthentication: this.formValues.RepositoryAuthentication,
        RepositoryUsername: this.formValues.RepositoryUsername,
        RepositoryPassword: this.formValues.RepositoryPassword
      };
      return EdgeStackService.createSwarmStackFromGitRepository(
        name,
        repositoryOptions,
        env,
        this.formValues.Groups
      );
    };

    function editorUpdate(cm) {
      this.formValues.StackFileContent = cm.getValue();
    }
  });
