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

  grunt.registerTask('plugin-install', 'install phonegap plugins', function() {
    var done = this.async();
    done();
    /*require('child_process').exec('phonegap local plugin add https://git-wip-us.apache.org/repos/asf/cordova-plugin-device-motion.git', {cwd: './TaxiPILOT'}, function(error, stdout, stderr) {
          console.log(stdout);
          console.log(stderr);
          if(error)
            console.log('exec error: ' + error);
          
          require('child_process').exec('phonegap local plugin add https://git-wip-us.apache.org/repos/asf/cordova-plugin-device-orientation.git', {cwd: './TaxiPILOT'}, function(error, stdout, stderr) {
            console.log(stdout);
            console.log(stderr);
            if(error)
              console.log('exec error: ' + error);
            
            require('child_process').exec('phonegap local plugin add https://git-wip-us.apache.org/repos/asf/cordova-plugin-geolocation.git', {cwd: './TaxiPILOT'}, function(error, stdout, stderr) {
              console.log(stdout);
              console.log(stderr);
              if(error)
                console.log('exec error: ' + error);
              
              require('child_process').exec('phonegap local plugin add https://git-wip-us.apache.org/repos/asf/cordova-plugin-device.git', {cwd: './TaxiPILOT'}, function(error, stdout, stderr) {
                console.log(stdout);
                console.log(stderr);
                if(error)
                  console.log('exec error: ' + error);
                done();
              });
              
            });

          });

        });*/
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
  
  grunt.registerTask('make', [
    'clean',
    'copy',
    'htmlbuild',
    'wiredep'
  ]);
  
  grunt.registerTask('install', [
    'bower-install',
    'create',
    'plugin-install',
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

};