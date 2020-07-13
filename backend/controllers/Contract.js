'use strict';

var utils = require('../utils/writer.js');
var Contract = require('../service/ContractService');

module.exports.getContracts = function getContracts (req, res, next) {
  Contract.getContracts()
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.postContract = function postContract (req, res, next, body) {
  Contract.postContract(body)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.updateContract = function updateContract (req, res, next, id) {
  Contract.updateContract(id)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};
