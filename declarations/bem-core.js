module.exports = {
    default: {
        builder: 'enb',
        command: 'YENV=production bower install && npm run libs && enb make __magic__ desktop.examples ' +
            'desktop.tests desktop.docs touch-pad.examples touch-pad.tests touch-pad.docs ' +
            'touch-phone.examples touch-phone.tests touch-phone.docs',
        docDirs: '*.docs',
        rsync: {
            targets: ['*.docs', '*.examples']
        },
        docs: {
            readme: {
                folder: '',
                pattern: {
                    en: 'README.md',
                    ru: 'README.ru.md'
                }
            },
            changelog: {
                folder: '',
                pattern: {
                    en: 'CHANGELOG.md',
                    ru: 'CHANGELOG.ru.md'
                }
            },
            migration: {
                folder: '',
                pattern: {
                    en: 'MIGRATION.md',
                    ru: 'MIGRATION.ru.md'
                }
            }
        },
        pattern: {
            data: '%s.data.json',
            jsdoc: '%s.jsdoc.html'
        },
        custom: [
            {
                title: {
                    en: 'Documentation',
                    ru: 'Документация'
                },
                url: '/tags/{lib}-v2.3.0'
            }
        ],
        tasks: [
            require('../src/tasks/git-clone'),
            require('../src/tasks/git-checkout'),
            require('../src/tasks/copy-borschik'),
            require('../src/tasks/npm-install'),
            require('../src/tasks/npm-run-build'),
            require('../src/tasks/remove-output'),
            require('../src/tasks/create-output'),
            require('../src/tasks/copy-sets'),
            require('../src/tasks/collect-sets'),
            require('../src/tasks/compress-examples')
        ]
    }
};
