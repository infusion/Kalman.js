/**
 * GPS.js v0.0.1 26/01/2016
 *
 * Copyright (c) 2016, Robert Eisele (robert@xarg.org)
 * Dual licensed under the MIT or GPL Version 2 licenses.
 **/

(function(root) {

  "use strict";

  var Syl = require('sylvester');

  var Matrix = Syl.Matrix;

  Matrix.prototype.mul = Matrix.prototype.multiply;
  Matrix.prototype.sub = Matrix.prototype.subtract;

  /**
   * @constructor
   * @returns {KF}
   */
  function KF(X0, P0, A, C, Q) {

    this['X'] = X0;
    this['P'] = P0;
    this['A'] = A;
    this['C'] = C;
    this['Q'] = Q;
  }

  KF.prototype = {
    'X': null,
    'P': null,
    //
    'A': null,
    'B': null,
    'C': null,
    //
    'U': null,
    'W': null,
    'Q': null,
    //
    'update': function(ob) {

      // x_k: Predicted State vector / Estimated signal
      // X_k: State vector
      var Xk = this['X']; // Get prev state

      // p_k: Predicted Covariance Matrix
      // P_k: Covariance Matrix
      var Pk = this['P']; // Get prev cov

      // A: Format Matrix
      // B: Format Matrix
      // C: Format Matrix
      // H: Control Matrix
      var A = this['A'];
      var B = this['B'];
      var C = this['C'];
      var H = ob['H'];

      // U_k: Control Variable Matrix
      var Uk = this['U'];

      // W_k: Predicted State noise
      var Wk = this['W'];

      // Q_k: Process-Noise (Keeps state Cov-Matrix from becoming too small)
      var Qk = this['Q'];

      // y_k: New Observation
      // Y_k: Observed value
      var Yk = ob['Y'];

      // Z_k: Measure noise, the noise we expect the measurement was generated on
      var Zk = ob['Z'];

      // K: Kalman Gain
      // R: Sensor Noise Covariance
      var R = ob['R'];


      if (A instanceof Function) {
        A = A(T);
      }



      // Predict State
      // x_k = A * X_{k-1} + B * U_k + W_k
      var xk = A.mul(Xk);

      if (B && Uk) {
        xk = xk.add(B.mul(Uk));
      }

      if (Wk) {
        xk = xk.add(Wk);
      }

      // Predicted process Covariance Matrix
      // p_k = A * P_{k-1} * A^t + Q_k
      var pk = A.mul(Pk).mul(A.transpose());

      if (Qk) {
        pk = pk.add(Qk);
      }

      // Kalman Gain, weight for measurement and model
      // K = p_k * H^t * (H * p_k * H^t + R)^-1
      var K = pk.mul(H.transpose());
      var T = H.mul(K).add(R);

      K = K.mul(T.inverse()); // TODO: OPTIMIZE!


      // New Observation
      // y_k = C * Y_k + Z_k
      var yk = C.mul(Yk);

      if (Zk) {
        yk = yk.add(Zk);
      }

      // Update state
      // X_k = x_k + K(y_k - H * x_k)
      Xk = xk.add(K.mul(yk.sub(H.mul(xk))));

      // Update process Covariance Matrix
      // P_k = (I - K * H) * p_k   = OR =   p_k - K * H * p_k 
      Pk = pk.sub(K.mul(H).mul(pk));

      // Set Current state
      this['X'] = Xk;
      this['P'] = Pk;
    },
    'setProcessNoise': function(noise) {
      this['Q'] = noise;
    },
    'getState': function() {
      return this['X'];
    }
  };

  function EKF() {

  }

  function UKF() {

  }

  if (typeof define === "function" && define["amd"]) {
    define([], function() {
      return {
        KF: KF,
        EKF: EKF,
        UKF: UKF
      };
    });
  } else if (typeof exports === "object") {
    module["exports"] = {
      KF: KF,
      EKF: EKF,
      UKF: UKF
    };
  } else {
    root["Kalman"] = {
      KF: KF,
      EKF: EKF,
      UKF: UKF
    };
  }

})(this);
