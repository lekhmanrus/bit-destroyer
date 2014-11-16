'use strict';
 
module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json')
  });
  require('load-grunt-tasks')(grunt);

  grunt.registerTask('bower-install', 'install bower components', function() {
    var done = this.async();
    var puts = function(error, stdout, stderr) {
      console.log(stdout);
      console.log(stderr);
      if(error)
        console.log('exec error: ' + error);
      done();
    };
    require('child_process').exec('bower install', puts);
  });

  grunt.registerTask('create', 'create phonegap project', function() {
    var done = this.async();
    var puts = function(error, stdout, stderr) {
      console.log(stdout);
      console.log(stderr);
      if(error)
        console.log('exec error: ' + error);
      done();
    };
    require('child_process').exec('phonegap create out -n BitDestroyer -i org.game4l.bitdestroyer', puts);
  });

  grunt.registerTask('run-android', 'run phonegap for android device', function() {
    var done = this.async();
    require('child_process').exec('phonegap run android', {cwd: './out'}, function(error, stdout, stderr) {
      console.log(stdout);
      console.log(stderr);
      if(error)
        console.log('exec error: ' + error);
      done();
    });
  });

  grunt.config.set('clean', {
    www: [ 'out/www' ]
  });

  grunt.config.set('copy', {
    sources: {
      cwd: 'assets',
      expand: true,
      src: '**',
      dest: 'out/www'
    },
    bower: {
      expand: true,
      src: 'bower.json',
      dest: 'out/www'
    },
    bower_components: {
      cwd: 'bower_components',
      expand: true,
      src: '**',
      dest: 'out/www/bower_components'
    }
  });

  grunt.config.set('wiredep', {
    app: {
      src: 'out/www/index.html',
      cwd: 'out/www'
    }
  });

  var htmlBuildOptions = {
    logOptions: true,
    relative: true,
    beautify: true,
    prefix: ' ',
    scripts: {
      bundle: [
        'out/www/js/*.js',
        'out/www/js/controllers/*.js',
        'out/www/js/services/*.js',
        'out/www/js/directives/*.js'
      ]
    },
    styles: {
      bundle: 'out/www/css/*.css'
    }
  };

  grunt.config.set('htmlbuild', {
    index: {
      src: 'assets/index.html',
      dest: 'out/www/index.html',

      options: htmlBuildOptions
    }
  });

  grunt.config.set('watch', {
    src: {
      files: [ 'assets/**/**/**' ],
      tasks: [ 'make' ],
    },
    bower: {
      files: [ 'bower_components/**/**/**' ],
      tasks: [ 'make' ]
    }
  });

  grunt.config.set('download', {
    crosswalk: {
      url: 'https://download.01.org/crosswalk/releases/crosswalk/android/stable/8.37.189.14/crosswalk-8.37.189.14.zip',
      manifest: false,
      filename: 'out/'
    }
  });
  
  grunt.registerTask('make', [
    'clean',
    'copy',
    'htmlbuild',
    'wiredep'
  ]);
  
  grunt.registerTask('install', [
    'bower-install',
    'create',
    'make'
  ]);

  grunt.registerTask('run', [
    'make',
    'run-android'
  ]);

  grunt.registerTask('default', [
    'make',
    'watch'
  ]);

  grunt.registerTask('test', [
    'download'
  ]);

};