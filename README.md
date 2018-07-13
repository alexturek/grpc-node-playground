# A simplified up-to-date example of grpc over node

Some quick notes:
1. Need to figure out if there's a Promise-aware version of this. Old-school node callbacks are lame. (Also might be able to promisify both the server and client via bluebird or some other promise library).
2. Errors have `message` and `code`
  * `code` has to be an integer or the server will blow up
  * The values of error codes seem to be already bound to specific types of errors. The only place I've found that so far is in `grpc`'s npm module, `src/constants.js`
  * I have no idea how I'm supposed to return application-specific errors here. Unless we want to pack data into the `message` string field on each error. Gross.
3. I haven't explored dynamic vs static protobuf generation, but dynamic seems to be fast enough that static may not be critical. It took 14ms to go from first-module-load to the-server-is-running with this simple service definition.
