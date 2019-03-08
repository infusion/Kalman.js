# Kalman.js - Kalman Filter in JavaScript

[![NPM Package](https://img.shields.io/npm/v/kalman.svg?style=flat)](https://npmjs.org/package/kalman "View this project on npm")
[![Build Status](https://travis-ci.org/infusion/Kalman.js.svg?branch=master)](https://travis-ci.org/infusion/Kalman.js)
[![MIT license](http://img.shields.io/badge/license-MIT-brightgreen.svg)](http://opensource.org/licenses/MIT)


Usage
===

The constructor takes the initial state x and the initial covariance P. For each update cycle you have to provide all necessary vectors and matrices:

```
let filter = new Kalman(x0, P0)

// loop
filter.update({
  A, // State design matrix
  B, // Input design matrix
  u, // Linear input variable 
  H, // Observation matrix
  R, // Sensor Noise Coviarance
  Q, // Process Noise Covariance (Optional)
  w, // System noise (Optional)
  C, // Measurement design matrix
  y, // new measurement vector
});
```

Note: Kalman.js is designed to work with the Sylvester Matrix library, but only uses it implicitly. You can use another library as long as it matches the method names of Sylvester.


Installation
===
Installing Kalman.js is as easy as cloning this repo or use one of the following commands:

```
bower install kalman
```
or

```
npm install kalman
```

Using Kalman.js with the browser
===
    <script src="kalman.js"></script>
    <script>
        var kf = new Kalman.KF;
        ...
    </script>


Using Kalman.js with require.js
===
    <script src="require.js"></script>
    <script>
    requirejs(['kalman.js'],
    function(Kalman) {
        var kf = new Kalman.KF;
        ...
    });
    </script>

Coding Style
===
As every library I publish, Kalman.js is also built to be as small as possible after compressing it with Google Closure Compiler in advanced mode. Thus the coding style orientates a little on maxing-out the compression rate. Please make sure you keep this style if you plan to extend the library.

Testing
===
If you plan to enhance the library, make sure you add test cases and all the previous tests are passing. You can test the library with

```
npm test
```

Copyright and licensing
===
Copyright (c) 2016, [Robert Eisele](http://www.xarg.org/)
Dual licensed under the MIT or GPL Version 2 licenses.
