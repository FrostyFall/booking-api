function Response(message, data) {
  this.status = 'success';
  this.message = message ?? '';
  this.data = data ?? null;
}

module.exports = Response;
