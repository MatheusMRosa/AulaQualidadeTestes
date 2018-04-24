const config = require('./cap.json');
const resolve = require('path').resolve;

var exports = {
    currentPlatform: undefined,
    caps: [],
    configure: function (driver) {
        // See whats going on
        driver.on('status', function (info) {
            console.log('S: ', info);
        });
        driver.on('command', function (meth, path, data) {
            console.log('C: ', meth, path, data);
            console.log('C > ' + meth.yellow, path.grey, data || '');
        });
        driver.on('http', function (meth, path, data) {
            console.log('H: ', meth, path, data);
            console.log('H > ' + meth.magenta, path, (data || '').grey);
        });
    },
    createCaps: function (selectCaps) {
        selectCaps = selectCaps || config.selectCaps;
        exports.caps = config.caps;
        exports.currentPlatform = exports.caps[Math.min(selectCaps, exports.caps.length - 1)];
        exports.currentPlatform.app = resolve(config.appFile[exports.currentPlatform.platformName])
    }

};
module.exports = exports;