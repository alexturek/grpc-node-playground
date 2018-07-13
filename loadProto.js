const grpc = require("grpc");
const protoLoader = require("@grpc/proto-loader");

const PROTO_PATH = __dirname + "/hello.proto";

module.exports = function load() {
  const packageDefinition = protoLoader.loadSync(PROTO_PATH, {
    keepCase: true,
    longs: String,
    enums: String,
    defaults: true,
    oneofs: true
  });

  return grpc.loadPackageDefinition(packageDefinition);
}
