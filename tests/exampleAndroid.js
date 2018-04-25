const fs = require('fs');
const objects = {
    'Example: 1': {
        'Android': JSON.parse(fs.readFileSync('testsJson/example.json', 'utf8'))
    }
};

const automatic = require('./example.js');//call my fuctions for initializing my testsJson

automatic.setObjs(objects);//I pass my objects by parameter
return automatic.init();//start the testsJson
