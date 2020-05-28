const Benchmark = require('benchmark');
const _ = require('lodash');

const suite = new Benchmark.Suite();

const obj = { 'Content-Type': 'application/pdf' };

suite
  .add('Object.fromEntries', () => {
    const newObj = Object.fromEntries(
      Object.entries(obj).map(([k, v]) => [k.toLowerCase(), v]),
    );

    console.log(newObj);
  })
  .add('_.transform', () => {
    const lowerObj = _.transform(obj, function (result, val, key) {
      result[key.toLowerCase()] = val;
    });
    console.log(lowerObj);
  })
  .on('cycle', function onCycle(event) {
    console.log(event.target.toString());
  })
  .on('complete', function onComplete() {
    console.log(`Fastest is ${this.filter('fastest').map('name').join(', ')}`);
  })
  .run({ async: true });
