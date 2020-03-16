export function EdgeGroupViewModel(data) {
  this.Id = data.id;
  this.Type = data.type;
  this.Name = data.name;
  this.Endpoints = data.endpoints;
  this.Tags = data.tags;
  this.EndpointsCount = data.endpointsCount;
}
