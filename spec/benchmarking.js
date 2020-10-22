const { PerformanceObserver, performance } = require('perf_hooks');

const markGetStart = () => performance.mark('Starting GET test');
const markGetEnd = () => performance.mark('Finished GET request');
const measureGetTime = () => performance.measure('Inputs validation', 'Starting GET test', 'Finished GET request');
const obs = new PerformanceObserver((items) => {
  console.log(`API RESPONSE TO GET: ${items.getEntries()[0].duration}ms\n<------------------------------->`);
  performance.clearMarks();
});

obs.observe({ entryTypes: ['measure'] });

module.exports.markGetStart = markGetStart;
module.exports.markGetEnd = markGetEnd;
module.exports.measureGetTime = measureGetTime;