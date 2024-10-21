import _defineProperty from "@babel/runtime/helpers/defineProperty";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

import parseCondition from '../parse-condition';

var getVisibleFields = function getVisibleFields(schema, values, conditionMapper) {
  if (Array.isArray(schema)) {
    return schema.map(function (field) {
      return getVisibleFields(field, values, undefined, conditionMapper);
    }).filter(Boolean);
  }

  if (schema.condition) {
    var result = parseCondition(schema.condition, values, schema, conditionMapper);

    if (result.visible) {
      return _objectSpread(_objectSpread({}, schema), schema.fields && {
        fields: getVisibleFields(schema.fields, values, undefined, conditionMapper).filter(Boolean)
      });
    } else {
      return null;
    }
  }

  return _objectSpread(_objectSpread({}, schema), schema.fields && {
    fields: getVisibleFields(schema.fields, values, undefined, conditionMapper).filter(Boolean)
  });
};

export default getVisibleFields;