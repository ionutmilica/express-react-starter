// Here we compose our dependencies
// For e.g: myNewService(myRepository(myDbConnection()))

function makeDI(opts) {
  return {
    ...opts,
  };
}

module.exports = makeDI;
