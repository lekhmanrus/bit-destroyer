![bit-destroyer](https://raw.githubusercontent.com/lekhmanrus/bit-destroyer/master/assets/icon.png) bit-destroyer
=============
Logical game on phonegap for mobile.

## Dependencies
* [ADT (Android Developer Tools) Bundle](http://developer.android.com/sdk/index.html)
* [Apache Ant](http://ant.apache.org/bindownload.cgi)
* [Java Development Kit](http://www.oracle.com/technetwork/java/javase/downloads/jdk8-downloads-2133151.html)
* [Crosswalk](https://crosswalk-project.org/documentation/downloads.html)

## Build From Source
* Install globally
    * grunt-cli `npm install -g grunt-cli`
    * bower `npm install -g bower`
    * phonegap `npm install -g phonegap`
* Install npm modules `npm install`
* Build project `grunt install`
* Use
    * `grunt` for development and wathing results (HTML-file `out/www/index.html`)
    * `grunt run` for running debug version of app in your Android (Phonegap)
    * `grunt curl` and `grunt buil` for make *.apk (Crosswalk)
