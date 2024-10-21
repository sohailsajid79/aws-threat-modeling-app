import _toArray from "@babel/runtime/helpers/toArray";

var composeValidators = function composeValidators() {
  var validators = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
  return function (value, allValues, meta) {
    var _validators = _toArray(validators),
        initialValidator = _validators[0],
        sequenceValidators = _validators.slice(1);

    var resolveValidator = function resolveValidator(error, validator) {
      if (error) {
        return error;
      }

      if (typeof validator !== 'function') {
        return undefined;
      }

      return validator(value, allValues, meta);
    };

    var result = resolveValidator(undefined, initialValidator);

    if (result !== null && result !== void 0 && result.then) {
      return result.then(function () {
        return sequenceValidators.reduce(resolveValidator, undefined);
      })["catch"](function (error) {
        return error;
      });
    }

    return sequenceValidators.reduce(resolveValidator, result);
  };
};

export default composeValidators;