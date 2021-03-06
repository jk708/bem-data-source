'use strict';

var util = require('util'),

    config = require('./config'),
    logger = require('./logger'),
    commander = require('./commander');

module.exports = {
    /**
     * Perform git files add, commit and push operations
     * @param {Object} conf - configuration option with messages
     * @returns {Function}
     */
    commitAndPush: function (conf) {
        return function () {
            return commander.gitAdd()
                .then(function () {
                    return commander.gitCommit(conf.commitMessage);
                })
                .then(function () {
                    return commander.gitPush(config.get('dataConfig:ref'));
                })
                .then(function () {
                    logger.info(conf.successMessage, module);
                })
                .fail(function (err) {
                    logger.error(util.format(conf.errorMessage, err), module);
                });
        };
    }
};
