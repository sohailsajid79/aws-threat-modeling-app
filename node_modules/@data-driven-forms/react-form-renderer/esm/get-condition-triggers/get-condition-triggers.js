import _objectWithoutProperties from "@babel/runtime/helpers/objectWithoutProperties";
import _toArray from "@babel/runtime/helpers/toArray";
import _slicedToArray from "@babel/runtime/helpers/slicedToArray";
import _defineProperty from "@babel/runtime/helpers/defineProperty";
import _typeof from "@babel/runtime/helpers/typeof";
import _toConsumableArray from "@babel/runtime/helpers/toConsumableArray";
var _excluded = ["when"];

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

var mergeFunctionTrigger = function mergeFunctionTrigger(fn, field) {
  var internalTriggers = [];
  var internalWhen = fn(field);

  if (Array.isArray(internalWhen)) {
    internalTriggers = _toConsumableArray(internalWhen);
  } else {
    internalTriggers.push(internalWhen);
  }

  return internalTriggers;
};

var getConditionTriggers = function getConditionTriggers(condition, field) {
  var conditionMapper = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
  var triggers = [];

  if (Array.isArray(condition)) {
    return condition.reduce(function (acc, item) {
      return [].concat(_toConsumableArray(acc), _toConsumableArray(getConditionTriggers(item, field, conditionMapper)));
    }, []);
  } // extract mapped attributes to a new static condition object


  if (_typeof(condition.mappedAttributes) === 'object') {
    try {
      var newCondition = _objectSpread(_objectSpread({}, condition), {}, {
        mappedAttributes: undefined
      });

      Object.entries(condition.mappedAttributes).forEach(function (_ref) {
        var _ref2 = _slicedToArray(_ref, 2),
            attribute = _ref2[0],
            _ref2$ = _toArray(_ref2[1]),
            functionName = _ref2$[0],
            args = _ref2$.slice(1);

        if (!conditionMapper[functionName]) {
          throw new Error("Missing condition mapper function \"".concat(functionName, "\" for field ").concat(field.name, "!"));
        }

        newCondition[attribute] = conditionMapper[functionName].apply(conditionMapper, _toConsumableArray(args));
      });
      return getConditionTriggers(newCondition, field, conditionMapper);
    } catch (error) {
      console.error(error.toString());
    }
  }

  var when = condition.when,
      rest = _objectWithoutProperties(condition, _excluded);

  var nestedKeys = ['and', 'or', 'sequence'];

  if (typeof when === 'string') {
    triggers = [].concat(_toConsumableArray(triggers), [when]);
  }

  if (typeof when === 'function') {
    triggers = [].concat(_toConsumableArray(triggers), _toConsumableArray(mergeFunctionTrigger(when, field)));
  }

  if (Array.isArray(when)) {
    when.forEach(function (item) {
      if (typeof item === 'string') {
        triggers = [].concat(_toConsumableArray(triggers), [item]);
      }

      if (typeof item === 'function') {
        triggers = [].concat(_toConsumableArray(triggers), _toConsumableArray(mergeFunctionTrigger(item, field)));
      }
    });
  }

  nestedKeys.forEach(function (key) {
    if (typeof rest[key] !== 'undefined') {
      rest[key].forEach(function (item) {
        triggers = [].concat(_toConsumableArray(triggers), _toConsumableArray(getConditionTriggers(item, field, conditionMapper)));
      });
    }
  });

  if (_typeof(condition.not) === 'object') {
    triggers = [].concat(_toConsumableArray(triggers), _toConsumableArray(getConditionTriggers(condition.not, field, conditionMapper)));
  }

  return Array.from(new Set(triggers));
};

export default getConditionTriggers;