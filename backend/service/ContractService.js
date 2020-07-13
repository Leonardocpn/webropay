"use strict";
const db = require("../config/database");
const { respondWithCode } = require("../utils/writer");

/**
 * Get a list of all contracts
 * Get an array of all contracts order by id asc
 *
 * returns List
 **/
exports.getContracts = function () {
  return new Promise(function (resolve, reject) {
    db.query("SELECT * FROM contracts ORDER BY id ASC")
      .then((res) => {
        return resolve(res.rows);
      })
      .catch((err) => {
        const response = respondWithCode(500, {
          error: "Error when retrieving data from database",
        });
        return reject(response);
      });
  });
};

/**
 * Create a new contract
 * Create a new contract in the database passing description and status in body
 *
 * body PostContract
 * returns PostContractResponse
 **/
exports.postContract = function (body) {
  return new Promise(function (resolve, reject) {
    console.log(typeof body.status);
    if (!body || !body.description) {
      const response = respondWithCode(400, {
        message: "Invalid Contract, inform description",
      });
      return reject(response);
    }

    db.query(
      "INSERT INTO contracts (description, status) VALUES ($1, $2) RETURNING *",
      [body.description, true]
    )
      .then((res) => {
        console.log(res);
        return resolve(res.rows);
      })
      .catch((err) => {
        const response = respondWithCode(500, {
          message: "Error when saving data in database",
        });
        return reject(response);
      });
  });
};

/**
 * Change the status of a contract
 * Update status of a contract with an id, it will invert the current status
 *
 * id BigDecimal id of contract that need to be updated
 * returns EditContractResponse
 **/
exports.updateContract = function (id) {
  return new Promise(function (resolve, reject) {
    if (!id || Number(id) === NaN) {
      const response = respondWithCode(400, {
        message: "Inform a valid contract id in path",
      });
      return reject(response);
    }

    db.query(
      "UPDATE contracts SET status = NOT status WHERE id = $1 RETURNING *",
      [id]
    )
      .then((res) => {
        console.log(res.rows);
        if (res.rows.length === 0) {
          const response = respondWithCode(404, {
            message: "Contract not found",
          });
          return reject(response);
        }
        resolve(res.rows);
      })
      .catch((res) => {
        const response = respondWithCode(500, {
          message: "Error in database when update a contract",
        });
        return reject(response);
      });
  });
};
