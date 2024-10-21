import _defineProperty from "@babel/runtime/helpers/defineProperty";
import _typeof from "@babel/runtime/helpers/typeof";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

import { memoize, prepare, prepareMsg, selectNum, isNumber, trunc } from '../common/helpers';
export var required = memoize(function () {
  var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
      message = _ref.message;

  return prepare(function (value) {
    var failsValidation = true;

    if (typeof value === 'string') {
      failsValidation = !value.trim();
    } else if (Array.isArray(value)) {
      failsValidation = !value.length;
    } else {
      failsValidation = value === null || value === undefined;
    }

    if (failsValidation) {
      return prepareMsg(message, 'required').defaultMessage;
    }
  });
});
export var length = memoize(function () {
  var _ref2 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
      equal = _ref2['='],
      is = _ref2.is,
      max = _ref2.max,
      maximum = _ref2.maximum,
      min = _ref2.min,
      minimum = _ref2.minimum,
      message = _ref2.message;

  equal = selectNum(equal, is);
  min = selectNum(min, minimum);
  max = selectNum(max, maximum);
  return prepare(function (value) {
    if (!value) {
      return;
    }

    if (equal !== null && value.length !== equal) {
      var msg = prepareMsg(message, 'wrongLength', {
        count: equal
      }).defaultMessage;
      return typeof msg === 'string' ? msg : msg(equal);
    }

    if (max !== null && value.length > max) {
      var _msg = prepareMsg(message, 'tooLong', {
        count: max
      }).defaultMessage;
      return typeof _msg === 'string' ? _msg : _msg(max);
    }

    if (min !== null && value.length < min) {
      var _msg2 = prepareMsg(message, 'tooShort', {
        count: min
      }).defaultMessage;
      return typeof _msg2 === 'string' ? _msg2 : _msg2(min);
    }
  });
});
export var pattern = memoize(function () {
  var _ref3 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
      pattern = _ref3.pattern,
      message = _ref3.message,
      flags = _ref3.flags;

  var verifiedPattern = typeof pattern === 'string' ? new RegExp(pattern, flags) : pattern;
  return prepare(function (value) {
    if (!value) {
      return;
    }

    if (Array.isArray(value)) {
      var error = value.find(function (item) {
        var parsedValue = _typeof(item) === 'object' && Object.prototype.hasOwnProperty.call(item, 'value') ? item.value.toString() : typeof item === 'string' ? item : item.toString();
        return pattern && !parsedValue.match(verifiedPattern);
      });
      var msg = prepareMsg(message, 'pattern').defaultMessage;
      return error ? typeof msg === 'string' ? msg : msg(pattern) : undefined;
    }

    var parsedValue = typeof value === 'string' ? value : value.toString();

    if (pattern && !parsedValue.match(verifiedPattern)) {
      var _msg3 = prepareMsg(message, 'pattern').defaultMessage;
      return typeof _msg3 === 'string' ? _msg3 : _msg3(pattern);
    }
  });
});
export var numericality = memoize(function () {
  var _ref4 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
      even = _ref4.even,
      odd = _ref4.odd,
      equal = _ref4['='],
      equalTo = _ref4.equalTo,
      diff = _ref4['!='],
      otherThan = _ref4.otherThan,
      greater = _ref4['>'],
      greaterThan = _ref4.greaterThan,
      less = _ref4['<'],
      lessThan = _ref4.lessThan,
      greaterOrEqual = _ref4['>='],
      greaterThanOrEqualTo = _ref4.greaterThanOrEqualTo,
      lessOrEqual = _ref4['<='],
      lessThanOrEqualTo = _ref4.lessThanOrEqualTo,
      message = _ref4.message;

  equal = selectNum(equal, equalTo);
  diff = selectNum(diff, otherThan);
  greater = selectNum(greater, greaterThan);
  greaterOrEqual = selectNum(greaterOrEqual, greaterThanOrEqualTo);
  less = selectNum(less, lessThan);
  lessOrEqual = selectNum(lessOrEqual, lessThanOrEqualTo);
  return prepare(function (value) {
    if (value === null || value === undefined) {
      return;
    }

    if (!isNumber(value)) {
      return prepareMsg(null, 'notANumber').defaultMessage;
    }

    if (equal !== null && +value !== equal) {
      var msg = prepareMsg(message, 'equalTo').defaultMessage;
      return typeof msg === 'string' ? msg : msg(equal);
    }

    if (diff !== null && +value === diff) {
      var _msg4 = prepareMsg(message, 'otherThan').defaultMessage;
      return typeof _msg4 === 'string' ? _msg4 : _msg4(diff);
    }

    if (greater !== null && +value <= greater) {
      var _msg5 = prepareMsg(message, 'greaterThan').defaultMessage;
      return typeof _msg5 === 'string' ? _msg5 : _msg5(greater);
    }

    if (greaterOrEqual !== null && +value < greaterOrEqual) {
      var _msg6 = prepareMsg(message, 'greaterThanOrEqualTo').defaultMessage;
      return typeof _msg6 === 'string' ? _msg6 : _msg6(greaterOrEqual);
    }

    if (less !== null && +value >= less) {
      var _msg7 = prepareMsg(message, 'lessThan').defaultMessage;
      return typeof _msg7 === 'string' ? _msg7 : _msg7(less);
    }

    if (lessOrEqual !== null && +value > lessOrEqual) {
      var _msg8 = prepareMsg(message, 'lessThanOrEqualTo').defaultMessage;
      return typeof _msg8 === 'string' ? _msg8 : _msg8(lessOrEqual);
    }

    if (even && trunc(+value) % 2) {
      return prepareMsg(message, 'even').defaultMessage;
    }

    if (odd && !(trunc(+value) % 2)) {
      return prepareMsg(message, 'odd').defaultMessage;
    }
  });
});
var stringValidator = memoize(function () {
  var _ref5 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
      message = _ref5.message;

  return prepare(function (value) {
    if (!value) {
      return;
    }

    if (Array.isArray(value)) {
      var error = value.find(function (item) {
        return typeof item !== 'string';
      });
      return error ? prepareMsg(message, 'mustBeString').defaultMessage : undefined;
    }

    if (typeof value !== 'string') {
      return prepareMsg(message, 'mustBeString').defaultMessage;
    }
  });
});
var booleanValidator = memoize(function () {
  var _ref6 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
      message = _ref6.message;

  return prepare(function (value) {
    if (!value) {
      return;
    }

    if (Array.isArray(value)) {
      var error = value.find(function (item) {
        return typeof item !== 'boolean';
      });
      return error ? prepareMsg(message, 'mustBeBool').defaultMessage : undefined;
    }

    if (typeof value !== 'boolean') {
      return prepareMsg(message, 'mustBeBool').defaultMessage;
    }
  });
});
export var dataTypeValidator = function dataTypeValidator(type) {
  return {
    string: function string(options) {
      return stringValidator(_objectSpread({
        message: 'Field value has to be string'
      }, options));
    },
    integer: function integer(options) {
      return pattern(_objectSpread({
        pattern: /^-?\d*$/,
        message: 'Value must be integer'
      }, options));
    },
    "boolean": function boolean(options) {
      return booleanValidator(_objectSpread({
        message: 'Field value has to be boolean'
      }, options));
    },
    number: function number(options) {
      return pattern(_objectSpread({
        pattern: /^-?\d*[.]{0,1}\d*$/,
        message: 'Values must be number'
      }, options));
    },
    "float": function float(options) {
      return pattern(_objectSpread({
        pattern: /^-?\d*[.]{0,1}\d*$/,
        message: 'Values must be number'
      }, options));
    }
  }[type];
};