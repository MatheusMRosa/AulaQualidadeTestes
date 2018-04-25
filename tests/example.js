const config = require("../config/app_files.json");
const util = require("../config/util");
const wd = require("wd");

let driver;

const getElement = function (id) {
    if (id.startsWith('//') || (id.startsWith("(//"))) {//verify this element is xPath or Id, and wait a element until you find it
        return driver.chain()
            .waitForElementByXPath(id)
    } else {
        return driver.chain()
            .waitForElementById(id)
    }

};

const next = function (id, done) {
    let id1;
    if (id.charAt(0) === '$') {
        if (id.startsWith('$click')) {//just click
            id1 = id.split(":")[1];
            getElement(id1)
                .then(function (bt) {
                    bt.click().sleep(500).then(function (p1) {
                        done();
                    });
                }).catch(function (e) {
                fail('Not Found')
            })

        } else if (id.startsWith('$type')) {//write in field and clean was written before
            id1 = id.split(":")[1];
            const value = id.split(":")[2];
            getElement(id1)
                .then(function (ed) {
                    ed.click().clear().type(value).hideKeyboard().then(function (p1) {
                        done();
                    });
                }).catch(function (e) {
                fail('Not Found')
            })
        }
    } else {
        getElement(id1)
            .then(function (bt) {
                bt.click().then(function (p1) {
                    done();
                });
            })
    }
};
let objs;
module.exports = {
    setObjs: function (objects) {
        objs = objects
    },
    init: function () {
        return new Promise((done, fail) => {
            for (let k in objs) {
                let all = objs[k];
                util.createCaps(0);
                let desired = util.currentPlatform;
                let obj = all[desired.platformName];
                if (!obj) continue;
                describe(k + " - " + desired.platformName, function () {
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
                            throw "Failure .... Stop testsJson of this chapter";
                        }
                        allPassed = allPassed && this.currentTest.state === 'passed';
                    });

                    if (obj instanceof Array) {
                        obj.forEach(function (test) {
                            it("Test " + test, function (done) {
                                next(test, done);
                            });
                        })
                    } else {
                        for (let k1 in obj) {
                            describe(k1, function () {
                                let obj1 = obj[k1];
                                obj1.forEach(function (test) {
                                    it("Test " + test, function (done) {
                                        next(test, done);
                                    });
                                })
                            })
                        }
                    }
                });
            }
        });

    }
};
