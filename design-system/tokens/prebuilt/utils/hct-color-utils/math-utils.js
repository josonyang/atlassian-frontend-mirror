"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.clampDouble = clampDouble;
exports.clampInt = clampInt;
exports.lerp = lerp;
exports.matrixMultiply = matrixMultiply;
exports.sanitizeDegreesDouble = sanitizeDegreesDouble;
exports.signum = signum;
/**
 * Below lines are copied from @material/material-color-utilities.
 * Do not modify it.
 */

/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

// This file is automatically generated. Do not modify it.

/**
 * Utility methods for mathematical operations.
 */

/**
 * The signum function.
 *
 * @return 1 if num > 0, -1 if num < 0, and 0 if num = 0
 */
function signum(num) {
  if (num < 0) {
    return -1;
  } else if (num === 0) {
    return 0;
  } else {
    return 1;
  }
}

/**
 * The linear interpolation function.
 *
 * @return start if amount = 0 and stop if amount = 1
 */
function lerp(start, stop, amount) {
  return (1.0 - amount) * start + amount * stop;
}

/**
 * Clamps an integer between two integers.
 *
 * @return input when min <= input <= max, and either min or max
 * otherwise.
 */
function clampInt(min, max, input) {
  if (input < min) {
    return min;
  } else if (input > max) {
    return max;
  }
  return input;
}

/**
 * Clamps an integer between two floating-point numbers.
 *
 * @return input when min <= input <= max, and either min or max
 * otherwise.
 */
function clampDouble(min, max, input) {
  if (input < min) {
    return min;
  } else if (input > max) {
    return max;
  }
  return input;
}

/**
 * Sanitizes a degree measure as a floating-point number.
 *
 * @return a degree measure between 0.0 (inclusive) and 360.0
 * (exclusive).
 */
function sanitizeDegreesDouble(degrees) {
  degrees = degrees % 360.0;
  if (degrees < 0) {
    degrees = degrees + 360.0;
  }
  return degrees;
}

/**
 * Multiplies a 1x3 row vector with a 3x3 matrix.
 */
function matrixMultiply(row, matrix) {
  var a = row[0] * matrix[0][0] + row[1] * matrix[0][1] + row[2] * matrix[0][2];
  var b = row[0] * matrix[1][0] + row[1] * matrix[1][1] + row[2] * matrix[1][2];
  var c = row[0] * matrix[2][0] + row[1] * matrix[2][1] + row[2] * matrix[2][2];
  return [a, b, c];
}