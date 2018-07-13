const grpc = require('grpc');
const protoLoader = require('@grpc/proto-loader');

function sayHello(call, callback) {
  callback(null, { message: "Hello " + call.request.name });
}

const PROTO_PATH = __dirname + '/hello.proto';
const packageDefinition = protoLoader.loadSync(PROTO_PATH, {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true
});

const protoDescriptor = grpc.loadPackageDefinition(packageDefinition);
const { Greeter } = protoDescriptor;

function sayHello(helloRequest) {
  const { name } = helloRequest;
  console.log(`Saying hello to ${name}`);
  if (name === 'error') throw new Error(`what's wrong with your name`);
  return { message: `sup ${name}` };
}

function main() {
  const server = new grpc.Server();
  server.addService(Greeter.service, {
    sayHello,
  });
  server.bind("0.0.0.0:50051", grpc.ServerCredentials.createInsecure());
  server.start();
}

main();
