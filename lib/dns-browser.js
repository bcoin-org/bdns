/*!
 * dns.js - dns backend for bcoin
 * Copyright (c) 2014-2017, Christopher Jeffrey (MIT License).
 * https://github.com/bcoin-org/bcoin
 */

'use strict';

/*
 * Constants
 */

exports.unsupported = true;

/**
 * Resolve host (no getaddrinfo).
 * @param {String} host
 * @param {Number} [family=4]
 * @param {Number} [timeout=5000]
 * @returns {Promise}
 */

exports.resolve = async function resolve(host, family, timeout) {
  throw new Error('DNS not supported.');
};

/**
 * Resolve host (getaddrinfo).
 * @param {String} host
 * @param {Number} [family=4]
 * @param {Number} [timeout=5000]
 * @returns {Promise}
 */

exports.lookup = async function lookup(host, family, timeout) {
  throw new Error('DNS not supported.');
};
