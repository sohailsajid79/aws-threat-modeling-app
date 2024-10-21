import _toConsumableArray from "@babel/runtime/helpers/toConsumableArray";
import _defineProperty from "@babel/runtime/helpers/defineProperty";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

import { memoize } from '../common/helpers';
import { dataTypeValidator } from '../validators/validator-functions';
import composeValidators from '../compose-validators';
export var convertToWarning = function convertToWarning(validator) {
  return function () {
    return {
      type: 'warning',
      error: validator.apply(void 0, arguments)
    };
  };
};
export var prepareValidator = function prepareValidator(validator, mapper) {
  if (typeof validator === 'function') {
    return memoize(validator);
  }

  if (validator.warning) {
    return convertToWarning(mapper[validator.type](_objectSpread({}, validator)));
  }

  return mapper[validator.type](_objectSpread({}, validator));
};
export var getValidate = function getValidate(validate, dataType) {
  var mapper = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
  return [].concat(_toConsumableArray(validate ? validate.map(function (validator) {
    return prepareValidator(validator, mapper);
  }) : []), _toConsumableArray(dataType ? [dataTypeValidator(dataType)()] : []));
};
export var prepareArrayValidator = function prepareArrayValidator(validation) {
  return function () {
    var value = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];

    if (!Array.isArray(value)) {
      return;
    }

    var arrayValidator = composeValidators(validation);
    var result = arrayValidator(value && value.length > 0 ? value : undefined);

    if (typeof result === 'function') {
      result = result(value);
    }

    return result;
  };
};