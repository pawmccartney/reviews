const { PerformanceObserver, performance } = require('perf_hooks');

const obs = new PerformanceObserver((items) => {
  console.log(`<------------------------------->\nAPI respondes to ${items.getEntries()[0].name}: ${items.getEntries()[0].duration}ms\n<------------------------------->`);
  performance.clearMarks();
});

obs.observe({ entryTypes: ['measure'] });

module.exports = {
    markGetStart: () => performance.mark('Starting GET test'),
    markGetEnd: () => performance.mark('Finished GET request'),
    measureGetTime: () => performance.measure('GET operation time:', 'Starting GET test', 'Finished GET request'),
    markPOSTStart: () => performance.mark('Starting POST test'),
    markPOSTEnd: () => performance.mark('Finished POST request'),
    measurePOSTTime: () => performance.measure('POST operation time:', 'Starting POST test', 'Finished POST request'),
    markPUTStart: () => performance.mark('Starting PUT test'),
    markPUTEnd: () => performance.mark('Finished PUT request'),
    measurePUTTime: () => performance.measure('PUT operation time:', 'Starting PUT test', 'Finished PUT request'),
    markDELETEStart: () => performance.mark('Starting DELETE test'),
    markDELETEEnd: () => performance.mark('Finished DELETE request'),
    measureDELETETime: () => performance.measure('DELETE operation time:', 'Starting DELETE test', 'Finished DELETE request')
};
