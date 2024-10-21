import _typeof from "@babel/runtime/helpers/typeof";

/* eslint-disable no-unused-vars */
import { isValidElement } from 'react';
import Validators from '../validators';
var HAS_PROP = {}.hasOwnProperty;
export var TO_STRING = {}.toString;

var isObject = function isObject(obj) {
  return _typeof(obj) === 'object' && TO_STRING.call(obj) === '[object Object]' && obj !== null;
};

var stringify = function stringify(args) {
  var arr = [];
  var value;
  var options = args;

  if (typeof options === 'number') {
    options = options.toString();
  }

  for (var k in options) {
    if (HAS_PROP.call(options, k)) {
      value = options[k];
      arr.push(k, /*#__PURE__*/isValidElement(value) ? stringify(value.props) : isObject(value) ? stringify(value) : value.toString());
    }
  }

  return JSON.stringify(arr);
};

export var memoize = function memoize(func) {
  if (!func.cache) {
    func.cache = {};
  }

  return function (value, allValues) {
    var key = stringify(value, allValues);

    for (var _len = arguments.length, options = new Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
      options[_key - 2] = arguments[_key];
    }

    return HAS_PROP.call(func.cache, key) ? func.cache[key] : func.cache[key] = func.apply(void 0, [value, allValues].concat(options));
  };
};

var defaultMessage = function defaultMessage(type, values) {
  var msg = Validators.messages[type];
  return typeof msg === 'string' ? {
    defaultMessage: msg,
    values: values
  } : Object.assign({}, msg, {
    values: values
  });
};

export var prepareMsg = function prepareMsg(msg, type, values) {
  if (msg == null) {
    return defaultMessage(type, values);
  }

  if (HAS_PROP.call(msg, 'props') && /*#__PURE__*/isValidElement(msg)) {
    msg = msg.props;
  }

  if (msg[type] != null) {
    msg = msg[type];
  }

  if (isObject(msg)) {
    if (HAS_PROP.call(msg, 'id') || HAS_PROP.call(msg, 'defaultMessage')) {
      return Object.assign({}, msg, {
        values: values
      });
    }

    return defaultMessage(type, values);
  }

  return {
    id: msg,
    defaultMessage: msg,
    values: values
  };
};
export var assign = Object.assign;
export var prepare = function prepare(func) {
  return function (value, allValues) {
    for (var _len2 = arguments.length, args = new Array(_len2 > 2 ? _len2 - 2 : 0), _key2 = 2; _key2 < _len2; _key2++) {
      args[_key2 - 2] = arguments[_key2];
    }

    return func.apply(void 0, [value, allValues].concat(args));
  };
};
export var isNumber = function isNumber(num) {
  return !isNaN(num) && (num !== 0 || ('' + num).trim() !== '');
};
export function selectNum(var1, var2) {
  return isNumber(var1) ? +var1 : arguments.length > 1 && isNumber(var2) ? +var2 : null;
}
export var trunc = function trunc(num) {
  return Math.trunc ? Math.trunc(num) : num < 0 ? Math.ceil(num) : Math.floor(num);
};