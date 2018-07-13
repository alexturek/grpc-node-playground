const grpc = require('grpc');
const load = require('./loadProto');

function log(...messages) {
  console.log(`${new Date().toISOString()} [server] - ${messages.join(' ')}`);
}

log('starting');

function sayHello(call, callback) {
  callback(null, { message: "Hello " + call.request.name });
}

const { Greeter } = load();

function sayHello({ request }, callback) {
  const { name } = request;
  log(`Saying hello to ${name}`);
  if (name === "error") {
    return callback({ message: 'error is not a name', code: 4 });
  }
  callback(null, { message: `sup ${name}` });
}

function main() {
  const server = new grpc.Server();
  server.addService(Greeter.service, {
    sayHello,
  });
  server.bind("0.0.0.0:50051", grpc.ServerCredentials.createInsecure());
  server.start();
  log('started');
}

main();
