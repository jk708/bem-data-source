/* global toString: false */
'use strict';

var util = require('util'),

    q = require('q'),
    _ = require('lodash'),

    libs = require('../libs'),
    logger = libs.logger(module);

var GITHUB = {
    INNER: 'github.yandex-team.ru',
    OUTER: 'github.com'
};

module.exports = {

    /**
     * Retrieves information about git repositories by their names
     * @param sources - {Array} of objects with fields:
     * - isPrivate {Boolean} indicate if repository from private github
     * - name - {String} name of repository
     * - user {String} name of user or organization
     * - tag - {String} name of tag
     * - branch - {String} name of branch
     * @returns {defer.promise|*}
     */
    run: function(sources) {
        logger.info('-- get repositories start --');

        sources = sources.map(function(source) {

            var url = util.format('git://%s/%s/%s.git',
                    source.isPrivate ? GITHUB.INNER : GITHUB.OUTER , source.user, source.name);

            logger.debug('get repository with name %s and url %s', source.name, url);
            return _.extend({ url: url }, source);
        });

        logger.info('-- get repositories end --');
        return sources;
    }
};