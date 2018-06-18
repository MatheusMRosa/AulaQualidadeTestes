/**
 * Created by mathias on 24/07/17.
 */
const config = require('./app_files.json');
const resolve = require('path').resolve;

let _exports = {
    currentPlatform: undefined,
    caps: [],
    isAndroid: function () {
        return _exports.currentPlatform.platformName === 'Android';
    },
    isiOS: function () {
        return _exports.currentPlatform.platformName === 'iOS';
    },
    configure: function (driver) {
        // See whats going on
        driver.on('status', function (info) {
            console.log('S: ',info);
        });
        driver.on('command', function (meth, path, data) {
            console.log('C: ',meth, path, data);
            console.log('C > ' + meth.yellow, path.grey, data || '');
        });
        driver.on('http', function (meth, path, data) {
            console.log('H: ', meth, path, data);
            console.log('H > ' + meth.magenta, path, (data || '').grey);
        });
    },
    createCaps: function (selectCaps) {
        selectCaps = selectCaps || config.selectCaps;
        _exports.caps = config.caps;
        _exports.currentPlatform = _exports.caps[Math.min(selectCaps, _exports.caps.length-1)];
        _exports.currentPlatform.app = resolve(config.appFile[_exports.currentPlatform.platformName]);
        console.log("Selected",_exports.caps,  _exports.currentPlatform);
    }

};
module.exports = _exports;