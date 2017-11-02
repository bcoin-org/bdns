/*!
 * dns.js - dns backend for bcoin
 * Copyright (c) 2014-2017, Christopher Jeffrey (MIT License).
 * https://github.com/bcoin-org/bcoin
 */

'use strict';

const assert = require('assert');
const dns = require('dns');

/*
 * Constants
 */

exports.unsupported = false;

/**
 * Resolve host (async w/ libcares).
 * @param {String} host
 * @param {Number} [family=4]
 * @param {Number} [timeout=5000]
 * @returns {Promise}
 */

exports.resolve = async function resolve(host, family, timeout) {
  if (family == null)
    family = 4;

  if (timeout == null)
    timeout = 5000;

  assert(family === 4 || family === 6);
  assert((timeout >>> 0) === timeout);

  const type = family === 4 ? 'A' : 'AAAA';

  return new Promise((resolve, reject) => {
    dns.resolve(host, type, to(timeout, (err, result) => {
      if (err) {
        reject(err);
        return;
      }

      if (result.length === 0) {
        reject(new Error('No DNS results.'));
        return;
      }

      resolve(result);
    }));
  });
};

/**
 * Resolve host (getaddrinfo).
 * @param {String} host
 * @param {Number} [family=4]
 * @param {Number} [timeout=5000]
 * @returns {Promise}
 */

exports.lookup = async function lookup(host, family, timeout) {
  if (family == null)
    family = 4;

  if (timeout == null)
    timeout = 5000;

  assert(family === 4 || family === 6);
  assert((timeout >>> 0) === timeout);

  const options = {
    family,
    hints: dns.ADDRCONFIG | dns.V4MAPPED,
    all: true
  };

  return new Promise((resolve, reject) => {
    dns.lookup(host, options, to(timeout, (err, result) => {
      if (err) {
        reject(err);
        return;
      }

      if (result.length === 0) {
        reject(new Error('No DNS results.'));
        return;
      }

      const addrs = [];

      for (const addr of result)
        addrs.push(addr.address);

      resolve(addrs);
    }));
  });
};

/*
 * Helpers
 */

function to(timeout, callback) {
  const timer = setTimeout(() => {
    callback(new Error('DNS request timed out.'));
    callback = null;
  }, timeout);

  return function(err, result) {
    if (callback) {
      clearTimeout(timer);
      callback(err, result);
    }
  };
}
