const config = require("../config/cap.json");
const util = require("../config/util");
const wd = require("wd");

let driver;

util.createCaps(0);

const objs = {
    "Chrome": {
        "Exp": [
            "$click:id"
        ]
    }
};

describe(objs + " - " + desired.browserName, function () {
    this.timeout(80000);

    let allPassed = true;

    before(function () {
        driver = wd.promiseChainRemote(config.server);
        util.configure(driver);
        return driver.init(desired).setImplicitWaitTimeout(40000);//wait 40 seconds for found object
    });

    after(function () {
        return driver
            .quit()
            .finally(function () {
            });
    });

    afterEach(function () {
        if (this.currentTest.state === 'failed') {
            throw "Failure .... Stop tests of this chapter";
        }
        allPassed = allPassed && this.currentTest.state === 'passed';
    });
});