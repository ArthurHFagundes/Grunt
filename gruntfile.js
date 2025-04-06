module.exports = function(grunt) {
    grunt.initConfig( { // CONFIURAÇÃO QUANDO INICAR O GRUNT
        pkg: grunt.file.readJSON('package.json'), // USADO PARA LER O ARQUIVO 'package.json'
        less: {
            development: { // 'development' AMBIENTE LOCAL PADRÃO
                files: {
                    'DEV/STYLES/main.css': 'SRC/STYLES/main.less'
                }
            },
            production: { // INTERNET
                options: {
                    compress: true,
                },
                files: { // ↶ PRODUTO         &   ↶ FONTE
                    'DIST/STYLES/main.min.css': 'SRC/STYLES/main.less'
                }
            }
        },
        watch: { // PARA ATUALIZAÇÃO AUTOMÁTICA
            less: {
                files: ['SRC/STYLES/**/*.less'], // "/**/*" PARA VER TODOS OS PASTAS (**) E ARQUIVOS (*)
                tasks: ['less:development']
            },
            html: {
                files: ['SRC/index.html'],
                tasks: ['replace:dev']
            } 
        },
        replace: {
            dev: {
                options: {
                    patterns: [
                        { // PARA FAZER UMA TROCA ↶↶ (PROCURAR POR ESSA PALAVRA E SUBSTITUIR)
                            match: 'ENDERECO_DO_CSS',
                            replacement: './STYLES/main.css'
                        },
                        { 
                            match: 'ENDERECO_DO_JS',
                            replacement: '../SRC/SCRIPTS/main.js'
                        }
                    ]
                },
                files: [
                    {
                        expand: true,
                        flatten: true,
                        src: ['SRC/index.html'],
                        dest: 'DEV/'
                    }
                ]
            },
            dist: {
                options: {
                    patterns: [
                        { // PARA FAZER UMA TROCA ↶↶ (PROCURAR POR ESSA PALAVRA E SUBSTITUIR)
                            match: 'ENDERECO_DO_CSS',
                            replacement: './STYLES/main.min.css'
                        },
                        { 
                            match: 'ENDERECO_DO_JS',
                            replacement: './SCRIPTS/main.min.js'
                        }
                    ]
                },
                files: [
                    {
                        expand: true,
                        flatten: true,
                        src: ['PREBUILD/index.html'],
                        dest: 'DIST/'
                    }
                ]
            }
        },
        htmlmin: {
            dist: {
                options: {
                    removeComments: true,
                    collapseWhitespace: true,
                },
                files: {
                    'PREBUILD/index.html': 'SRC/index.html'
                }
            }
        },
        clean: ['PREBUILD'],
        uglify: {
            target: {
                files: {
                    'DIST/SCRIPTS/main.min.js': 'SRC/SCRIPTS/main.js'
                }
            }
        }
        /*
        sass: {
            dist: {
                options: {
                    style: 'compressed'
                },
                files: {
                    "main2.css": "main.scss"
                }
            }
        },
        concurrent: { // PARA EXECUTAR TAREFAS SIMULTÂNEAS
            target: ['olaGrunt', 'less', 'sass'] // ARRAY COM TODAS AS TAREFAS QUE SERÃO EXECUTADAS
        }*/
    })
/*
    grunt.registerTask('olaGrunt', function() {
        const done = this.async(); // BASICAMENTE UM CALLBACK PARA UMA FUNÇÃO ASSÍNCRONA
        setTimeout(function() {
            console.log('olá grunt');
            done();
        }, 3000)
    })
*/

    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-replace');
    grunt.loadNpmTasks('grunt-contrib-htmlmin');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-uglify');

    grunt.registerTask('default', ['watch']) // REGISTAR A TAREFA 'default' QUE É EXECUTADA QUANDO NÃO ESPECIFICAMOS O NOME DA TAREFA (TIPO ARRAY - VÁRIAS COISAS )
    // AMBIENTE DE PRODUÇÃO ↴↴ (INTERNET) 
    grunt.registerTask('build', ['less:development', 'htmlmin:dist', 'replace:dev', 'clean', 'uglify'])
}