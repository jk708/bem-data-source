# Декларации для сборки библиотеки

По умолчанию, настройки для сборки библиотеки устанавливаются из параметров,
прописанных в [базовой декларации](../declarations/base.js).
 
Однако, для каждой библиотеки можно указать ее собственные персональные настройки для сборки.

Для этого в папке 'declaration' необходимо создать js файл, 
название которого совпадает с названием библиотеки которую необходимо собрать, например `bem-components.js`.

Простейшая структура такого файла должна иметь вид:

```
module.exports = {
    default: {}
};
```

Для библиотеки bem-components:
 
```
module.exports = {
    default: {
        builder: 'enb',
        command: 'YENV=production enb make __magic__ desktop.examples desktop.tests desktop.docs ' +
            'touch-pad.examples touch-pad.tests touch-pad.docs touch-phone.examples ' +
            'touch-phone.tests touch-phone.docs && enb make *.pages/*',
        docDirs: '*.docs',
        rsync: {
            targets: ['*.tests', '*.examples']
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
                pattern: 'CHANGELOG.md'
            },
            migration: {
                folder: '',
                pattern: 'MIGRATION.md'
            }
        },
        pattern: {
            data: '%s.data.json',
            jsdoc: '%s.jsdoc.html'
        },
        tasks: [
            require('../src/tasks/git-clone'),
            require('../src/tasks/git-checkout'),
            require('../src/tasks/npm-install'),
            require('../src/tasks/npm-run-deps'),
            require('../src/tasks/copy-borschik'),
            require('../src/tasks/npm-run-build'),
            require('../src/tasks/remove-output'),
            require('../src/tasks/create-output'),
            require('../src/tasks/copy-sets'),
            require('../src/tasks/collect-sets')
        ]
    }
};
```

Здесь:

### builder 
Название инструмента с помощью которого будет выполняться сборка документации и примеров.

Допустимые значения `enb` и `bem-tools`. 
Значение по умолчанию `bem-tools`.
 
### command 
Cтрока с названием команды для запуска сборки. 
Значение по умолчанию `npm run build`

###docDirs
Шаблон директорий которые содержат файлы с документацией по блокам.

### rsync
Объект с допустимыми полями `targets`, `include`, `exclude`.

* `targets` - массив паттернов для папок примеров и прощих папок, которые должны быть
идентифицированы как результат сборки. Директории попадающие под этот паттерн
будуь скопированы в выходную директорию и в конечном итоге попадут в github репозиторий.

* `include` - маски имен файлов которые будут включены в процесс копирования и обработки.
* `include` - маски имен файлов которые будут исключены из процесса копирования и обработки.

Более подробно о значении параметров `include` и `exclude` можно почитать например:
* [rsync npm module](https://www.npmjs.org/package/rsync)
* [rsync command](https://developer.apple.com/library/Mac/DOCUMENTATION/Darwin/Reference/ManPages/man1/rsync.1.html)

### docs

Объект с полями, которые в свою очередь также являются объектами.
Позволяет задавать произвольный набор документов которые должны попасть в сборку библиотеки

```
docs: {
    readme: {
        folder: '',
        pattern: 'README.md'
    },
    changelog: {
        folder: 'docs',
        pattern: {
            en: 'CHANGELOG.en.md',
            ru: 'CHANGELOG.en.md'
        }
    },
    migration: {
        pattern: 'https://github.com/bem/bem-core/tree/v2/MIGRATION.md'
    }
    ...
}    
```
Здесь 'README.md' - загружается из корня проекта. Файлы changelog-ов будут загружены из директории 'docs',
по маске 'CHANGELOG.en.md' и 'CHANGELOG.ru.md' соответственно. При этом будут выбраны последние версии таких файлов,
в случае когда в данной директории хранится несколько changelog - файлов и их названия содержат номер версии библиотеки.
Файл миграции напрямую загружается с гитхаба с помощью github API с указанного адреса.

Из данного примера видно, что можно задавать разные файлы для различных языков, а также указывать
произвольный url к файлу как адрес данного файла в браузере.

### pattern 
Объект с полями `data` и `jsdoc` в котором можно указать шаблоны файлов с документацией и js документацией к блокам. 

Значение по умолчанию:

```
pattern: {
    data: '%s.data.json',
    jsdoc: '%s.jsdoc.json'
}
```

### tasks 

Массив с модулями код которых будет выполнен для данной цели сборки 
в таком же порядке в каком  подключение этих модулей указано в массиве.

Более подробно о модулях для сборки можно почитать [здесь](./tasks.md)

