const grpc = require('grpc');
const load = require("./loadProto");

const name = process.argv[2];

const { Greeter } = load();

client = new Greeter("localhost:50051", grpc.credentials.createInsecure());

client.sayHello({ name }, (err, response) => {
  if (err) {
    console.log(err);
    process.exit(1);
  }
  console.log(response);
  process.exit(0);
});
