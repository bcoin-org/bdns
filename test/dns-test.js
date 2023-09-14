'use strict';

const assert = require('bsert');
const dns = require('../lib/dns');

const TIMEOUT = 5000;

describe('DNS', function() {
  this.timeout(TIMEOUT);

  it('should lookup a name', async () => {
    const records = await dns.lookup('example.com', null, TIMEOUT);
    assert(records.length > 0);

    const recordsAAAA = await dns.lookup('example.com', 6, TIMEOUT);
    assert(recordsAAAA.length > 0);
  });

  it('should resolve a name with type', async () => {
    const resolver = new dns.Resolver();

    const records = await resolver.resolve('example.com', 'A', TIMEOUT);
    assert(records.length > 0);
  });

  it('should lookupService a name', async () => {
    const result = await dns.lookupService('127.0.0.1', 80, TIMEOUT);
    assert(result.hostname === 'localhost');
  });
});
