module.exports = function(grunt) {

    grunt.loadNpmTasks('grunt-browserify','grunt-html-convert');

    require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

    grunt.initConfig({

      pkg: grunt.file.readJSON('package.json'),

      watch: {
          options : {
              livereload: true
          },
          source: {
              files: [
                  'src/*.js',
                  'src/*/*.js',
                  'Grguntfile.js'
              ],
              tasks: [ 'build:js' ]
          }
      },

      browserify: {
          dist: {
            src: ['src/view_engining.js'],
            dest: 'dist/view_engining.js'
          }
      },

      htmlConvert: {
          options: {
              rename: function(moduleName) {
                  return moduleName.replace('.html', '').replace('../template/','');
              }
          },
         mytemplate: {
             src:['template/*.tmp.html'],
             dest:'tmp/templates.js'
         } 
      }
    });

    /* Default (development): Watch files and build on change. */
    grunt.registerTask('default', ['watch']);

    grunt.registerTask('build', [
        'browserify:dist',
        'htmlConvert:mytemplate'
    ]);

};
