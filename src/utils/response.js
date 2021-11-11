function Response(message, data) {
  this.status = 'success';
  if (message) this.message = message;
  if (data) this.data = data;
}

module.exports = Response;
