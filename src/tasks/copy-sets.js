'use strict';

var path = require('path'),
    vow = require('vow'),

    constants = require('../constants'),
    utility = require('../util');

/**
 * Executes copying built folders from content to output
 * @param {Target} target for building
 * @returns {defer.promise|*}
 */
module.exports = function (target) {
    var rSyncConfiguration = target.getRsyncConfiguration(),
        levels = rSyncConfiguration.levels || constants.LEVELS;
    return vow.all(levels.map(function (levelName) {
        return vow.all(rSyncConfiguration.targets.map(function (levelSuffix) {
            var levelFolderName = levelSuffix.replace('*', levelName),
                syncOptions = {
                    source: path.join(target.getContentPath(), levelFolderName),
                    destination: path.join(target.getOutputPath()),
                    flags: 'rd'
                };

            // add include file patterns if exist
            if (rSyncConfiguration.include && rSyncConfiguration.include.length) {
                syncOptions.include = rSyncConfiguration.include;
            }

            // add exclude file patterns if exist
            if (rSyncConfiguration.exclude && rSyncConfiguration.exclude.length) {
                syncOptions.exclude = rSyncConfiguration.exclude;
            }

            return utility.rsync(syncOptions);
        }));
    }));
};
