import _defineProperty from "@babel/runtime/helpers/defineProperty";
import _typeof from "@babel/runtime/helpers/typeof";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

import convertType from './convert-type';

var convertInitialValue = function convertInitialValue(initialValue, dataType) {
  if (initialValue === undefined || !dataType) {
    return initialValue;
  }

  if (Array.isArray(initialValue)) {
    return initialValue.map(function (value) {
      return _typeof(value) === 'object' ? _objectSpread(_objectSpread({}, value), {}, {
        value: Object.prototype.hasOwnProperty.call(value, 'value') ? convertType(dataType, value.value) : value
      }) : convertType(dataType, value);
    });
  }

  return convertType(dataType, initialValue);
};

export default convertInitialValue;