import _defineProperty from "@babel/runtime/helpers/defineProperty";
import _objectWithoutProperties from "@babel/runtime/helpers/objectWithoutProperties";

var _validatorMapper;

var _excluded = ["threshold"],
    _excluded2 = ["threshold"],
    _excluded3 = ["threshold"],
    _excluded4 = ["threshold"],
    _excluded5 = ["value", "includeThreshold"],
    _excluded6 = ["value", "includeThreshold"],
    _excluded7 = ["message"];

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

import { required, length, pattern, numericality } from '../validators/validator-functions';
import url from '../validators/url-validator';
import validatorTypes from '../validator-types';
var validatorMapper = (_validatorMapper = {}, _defineProperty(_validatorMapper, validatorTypes.REQUIRED, required), _defineProperty(_validatorMapper, validatorTypes.MIN_LENGTH, function (_ref) {
  var threshold = _ref.threshold,
      rest = _objectWithoutProperties(_ref, _excluded);

  return length(_objectSpread({
    minimum: threshold
  }, rest));
}), _defineProperty(_validatorMapper, validatorTypes.MAX_LENGTH, function (_ref2) {
  var threshold = _ref2.threshold,
      rest = _objectWithoutProperties(_ref2, _excluded2);

  return length(_objectSpread({
    maximum: threshold
  }, rest));
}), _defineProperty(_validatorMapper, validatorTypes.EXACT_LENGTH, function (_ref3) {
  var threshold = _ref3.threshold,
      rest = _objectWithoutProperties(_ref3, _excluded3);

  return length(_objectSpread({
    is: threshold
  }, rest));
}), _defineProperty(_validatorMapper, validatorTypes.MIN_ITEMS, function (_ref4) {
  var threshold = _ref4.threshold,
      rest = _objectWithoutProperties(_ref4, _excluded4);

  return length(_objectSpread({
    minimum: threshold,
    message: "Must have at least ".concat(threshold, " items.")
  }, rest));
}), _defineProperty(_validatorMapper, validatorTypes.PATTERN, pattern), _defineProperty(_validatorMapper, validatorTypes.MAX_NUMBER_VALUE, function (_ref5) {
  var value = _ref5.value,
      _ref5$includeThreshol = _ref5.includeThreshold,
      includeThreshold = _ref5$includeThreshol === void 0 ? true : _ref5$includeThreshol,
      rest = _objectWithoutProperties(_ref5, _excluded5);

  return numericality(_objectSpread(_defineProperty({}, includeThreshold ? '<=' : '<', value), rest));
}), _defineProperty(_validatorMapper, validatorTypes.MIN_NUMBER_VALUE, function (_ref6) {
  var value = _ref6.value,
      _ref6$includeThreshol = _ref6.includeThreshold,
      includeThreshold = _ref6$includeThreshol === void 0 ? true : _ref6$includeThreshol,
      rest = _objectWithoutProperties(_ref6, _excluded6);

  return numericality(_objectSpread(_defineProperty({}, includeThreshold ? '>=' : '>', value), rest));
}), _defineProperty(_validatorMapper, validatorTypes.URL, function (_ref7) {
  var message = _ref7.message,
      options = _objectWithoutProperties(_ref7, _excluded7);

  return pattern({
    pattern: url(options),
    message: message || 'String is not URL.'
  });
}), _validatorMapper);
export default validatorMapper;