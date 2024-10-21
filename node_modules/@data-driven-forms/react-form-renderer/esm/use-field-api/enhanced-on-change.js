import _objectWithoutProperties from "@babel/runtime/helpers/objectWithoutProperties";
import _typeof from "@babel/runtime/helpers/typeof";
var _excluded = ["dataType", "onChange", "initial", "clearedValue", "dirty"];
import isEmpty from 'lodash/isEmpty';
import convertType from './convert-type';
/**
 * Pick a value from event object and returns it
 * @param {Object|Any} event event value returned from form field
 */

var sanitizeValue = function sanitizeValue(event) {
  if (_typeof(event) === 'object' && event !== null && event.target) {
    if (event.target.type === 'checkbox') {
      return event;
    }

    if (event.target.type === 'file') {
      return {
        inputValue: event.target.value,
        inputFiles: event.target.files
      };
    }

    return event.target.value;
  }

  return event;
};
/**
 * Checks the value and returns undefined if its empty. Converst epmtry strings, arrays and objects.
 * If value is empty its overriden to undefined for further processing.
 * @param {Any} value Any JS variable to be check if is empty
 */


var checkEmpty = function checkEmpty(value) {
  if (typeof value === 'number') {
    return false;
  }

  if (typeof value === 'boolean') {
    return false;
  }

  if (typeof value === 'string' && value.length > 0) {
    return false;
  }

  if (value instanceof Date) {
    return false;
  }

  if (!isEmpty(value)) {
    return false;
  }

  return true;
};
/**
 * Casts input value into selected data type
 */


var enhancedOnChange = function enhancedOnChange(_ref, value) {
  var dataType = _ref.dataType,
      onChange = _ref.onChange,
      initial = _ref.initial,
      clearedValue = _ref.clearedValue,
      dirty = _ref.dirty,
      rest = _objectWithoutProperties(_ref, _excluded);

  var sanitizedValue = sanitizeValue(value);
  var result;

  if (_typeof(sanitizedValue) == 'object' && sanitizedValue !== null && sanitizedValue.target && sanitizedValue.target.type === 'checkbox') {
    result = sanitizedValue;
  } else {
    result = Array.isArray(sanitizedValue) ? sanitizedValue.map(function (item) {
      return convertType(dataType, sanitizeValue(item));
    }) : convertType(dataType, sanitizedValue);
  }

  for (var _len = arguments.length, args = new Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
    args[_key - 2] = arguments[_key];
  }

  if (checkEmpty(result) && typeof initial !== 'undefined') {
    return onChange.apply(void 0, [clearedValue].concat(args));
  }

  return onChange.apply(void 0, [result].concat(args));
};

export default enhancedOnChange;