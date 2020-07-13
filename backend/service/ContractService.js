'use strict';


/**
 * Get a list of all contracts
 * Get an array of all contracts order by id asc
 *
 * returns List
 **/
exports.getContracts = function() {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = [ {
  "description" : "Details about a contract",
  "id" : "123456",
  "status" : true
}, {
  "description" : "Details about a contract",
  "id" : "123456",
  "status" : true
} ];
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}


/**
 * Create a new contract
 * Create a new contract in the database informing description in body
 *
 * body PostContract 
 * returns PostContractResponse
 **/
exports.postContract = function(body) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = {
  "description" : "New contract",
  "id" : "123456",
  "status" : true
};
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}


/**
 * Update Contract Status
 * Update a contract status with an id in path
 *
 * id BigDecimal id of contract that need to be updated, example 123456
 * returns EditContractResponse
 **/
exports.updateContract = function(id) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = {
  "description" : "New contract",
  "id" : "123456",
  "status" : false
};
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}

