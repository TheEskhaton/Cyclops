var Mocha = require('mocha');
var mocha = new Mocha();
var fs = require('fs');
var path = require('path');
mocha.addFile(__dirname+'/spec.js');
mocha.reporter('spec').ui('bdd').run();