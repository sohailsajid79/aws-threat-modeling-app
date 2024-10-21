import _typeof from "@babel/runtime/helpers/typeof";

/* eslint-disable no-prototype-builtins */
import DefaultSchemaError from '../schema-errors'; //import isValidComponent from './isValidComponent';

import componentTypes from '../component-types';
import dataTypes from '../data-types';
var componentBlackList = [componentTypes.FIELD_ARRAY, 'tab-item'];

var checkFieldsArray = function checkFieldsArray(obj, objectKey) {
  if (!obj.hasOwnProperty('fields')) {
    throw new DefaultSchemaError("Component of type ".concat(objectKey, " must contain \"fields\" property of type array, received undefined!"));
  }

  if (!Array.isArray(obj.fields)) {
    throw new DefaultSchemaError("Component of type ".concat(objectKey, " must contain \"fields\" property of type array, received type: ").concat(_typeof(obj.fields), "!"));
  }
};

var checkConditionalAction = function checkConditionalAction(type, action, fieldName) {
  if (action.hasOwnProperty('visible') && typeof action.visible !== 'boolean') {
    throw new DefaultSchemaError("\n      Error occured in field definition with \"name\" property: \"".concat(fieldName, "\".\n      'visible' property in action \"").concat(type, "\" has to be a boolean value! Received: ").concat(_typeof(action.visible), ".\n    "));
  }

  if (action.hasOwnProperty('set') && (_typeof(action.set) !== 'object' && typeof action.set !== 'function' || Array.isArray(action.set))) {
    throw new DefaultSchemaError("\n      Error occured in field definition with \"name\" property: \"".concat(fieldName, "\".\n      'set' property in action \"").concat(type, "\" has to be a object! Received: ").concat(_typeof(action.visible), ", isArray: ").concat(Array.isArray(action.set), ".\n    "));
  }
};

var requiredOneOf = ['is', 'isEmpty', 'isNotEmpty', 'pattern', 'greaterThan', 'greaterThanOrEqualTo', 'lessThan', 'lessThanOrEqualTo'];

var checkMappedAttributes = function checkMappedAttributes(condition) {
  var hasStaticAttribute = requiredOneOf.some(function (key) {
    return condition.hasOwnProperty(key);
  });

  if (hasStaticAttribute) {
    return true;
  }

  if (condition.hasOwnProperty('mappedAttributes') && _typeof(condition.mappedAttributes) === 'object' && !Array.isArray(condition.mappedAttributes) && condition.mappedAttributes !== null) {
    return requiredOneOf.some(function (key) {
      return condition.mappedAttributes.hasOwnProperty(key);
    });
  }
};

var checkCondition = function checkCondition(condition, fieldName, isRoot) {
  /**
   * validate array condition
   */
  if (Array.isArray(condition)) {
    return condition.forEach(function (item) {
      return checkCondition(item, fieldName);
    });
  }

  if (condition.hasOwnProperty('and') && !Array.isArray(condition.and)) {
    throw new DefaultSchemaError("\n      Error occured in field definition with \"name\" property: \"".concat(fieldName, "\".\n      'and' property in a field condition must be an array! Received: ").concat(_typeof(condition.and), ".\n    "));
  }

  if (condition.hasOwnProperty('or') && !Array.isArray(condition.or)) {
    throw new DefaultSchemaError("\n      Error occured in field definition with \"name\" property: \"".concat(fieldName, "\".\n      'or' property in a field condition must be an array! Received: ").concat(_typeof(condition.or), ".\n    "));
  }

  if (condition.hasOwnProperty('sequence') && !Array.isArray(condition.sequence)) {
    throw new DefaultSchemaError("\n      Error occured in field definition with \"name\" property: \"".concat(fieldName, "\".\n      'sequence' property in a field condition must be an array! Received: ").concat(_typeof(condition.sequence), ".\n    "));
  }

  if (condition.hasOwnProperty('sequence') && !isRoot) {
    throw new DefaultSchemaError("\n      Error occured in field definition with \"name\" property: \"".concat(fieldName, "\".\n      'sequence' condition has to be the root condition: \" condition: { sequence: [ ... ]} \"\n    "));
  }

  if ((condition.hasOwnProperty('then') || condition.hasOwnProperty('else')) && !isRoot) {
    throw new DefaultSchemaError("\n      Error occured in field definition with \"name\" property: \"".concat(fieldName, "\".\n      'then', 'else' condition keys can be included only in root conditions or in a 'sequence'.\n    "));
  }

  if (condition.hasOwnProperty('then')) {
    checkConditionalAction('then', condition.then, fieldName);
  }

  if (condition.hasOwnProperty('else')) {
    checkConditionalAction('else', condition["else"], fieldName);
  }

  if (_typeof(condition) !== 'object') {
    throw new DefaultSchemaError("\n      Error occured in field definition with name: \"".concat(fieldName, "\".\n      Field condition must be an object, received ").concat(Array.isArray(condition) ? 'array' : _typeof(condition), "!\n    "));
  }

  if (!condition.hasOwnProperty('and') && !condition.hasOwnProperty('or') && !condition.hasOwnProperty('not') && !condition.hasOwnProperty('sequence')) {
    var _condition$mappedAttr;

    var isWhenMapped = condition.hasOwnProperty('mappedAttributes') && ((_condition$mappedAttr = condition.mappedAttributes) === null || _condition$mappedAttr === void 0 ? void 0 : _condition$mappedAttr.hasOwnProperty('when'));

    if (!condition.hasOwnProperty('when') && !isWhenMapped) {
      throw new DefaultSchemaError("\n      Error occured in field definition with \"name\" property: \"".concat(fieldName, "\".\n      Field condition must have \"when\" property! Properties received: [").concat(Object.keys(condition), "].\n    "));
    }

    if (!isWhenMapped && !(typeof condition.when === 'string' || typeof condition.when === 'function' || Array.isArray(condition.when))) {
      throw new DefaultSchemaError("\n      Error occured in field definition with name: \"".concat(fieldName, "\".\n      Field condition property \"when\" must be of type \"string\", \"function\" or \"array\", ").concat(_typeof(condition.when), " received!].\n    "));
    }

    if (!checkMappedAttributes(condition)) {
      throw new DefaultSchemaError("\n      Error occured in field definition with name: \"".concat(fieldName, "\".\n      Field condition must have one of \"is\", \"isEmpty\", \"isNotEmpty\", \"pattern\", \"greaterThan\", \"greaterThanOrEqualTo\", \"lessThan\", \"lessThanOrEqualTo\" property! Properties received: [").concat(Object.keys(condition), "].\n    "));
    }

    if (condition.hasOwnProperty('notMatch') && !condition.hasOwnProperty('pattern') && !condition.hasOwnProperty('is')) {
      throw new DefaultSchemaError("\n      Error occured in field definition with name: \"".concat(fieldName, "\".\n      Field condition must have \"pattern\" or \"is\" property when \"notMatch\" is set! Properties received: [").concat(Object.keys(condition), "].\n    "));
    }

    if (condition.hasOwnProperty('pattern') && !(condition.pattern instanceof RegExp) && typeof condition.pattern !== 'string') {
      throw new DefaultSchemaError("\n      Error occured in field definition with name: \"".concat(fieldName, "\".\n      Field condition must have \"pattern\" of instance \"RegExp\" or \"string\"! Instance received: [").concat(condition.pattern.constructor.name, "].\n    "));
    }
  } else {
    ['and', 'or', 'not'].forEach(function (key) {
      if (condition.hasOwnProperty(key)) {
        checkCondition(condition[key], fieldName);
      }
    });

    if (condition.hasOwnProperty('sequence')) {
      condition.sequence.forEach(function (item) {
        return checkCondition(item, fieldName, 'root');
      });
    }
  }
};

var checkValidators = function checkValidators(validate, fieldName, validatorTypes) {
  var validatorMapper = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};

  if (validate === undefined) {
    return;
  }

  if (!Array.isArray(validate)) {
    throw new DefaultSchemaError("\n      Error occured in field definition with name: \"".concat(fieldName, "\".\n      Field validate property must be an Array, ").concat(_typeof(validate), " received!\n    "));
  }

  validate.forEach(function (validator, index) {
    if (Array.isArray(validator) || _typeof(validator) !== 'object' && typeof validator !== 'function') {
      throw new DefaultSchemaError("\n        Error occured in field definition with name: \"".concat(fieldName, "\".\n        Field validator at index: ").concat(index, " must be an object or a function, ").concat(Array.isArray(validator) ? 'array' : _typeof(validator), " received!\n      "));
    }

    if (typeof validator !== 'function') {
      if (!validator.hasOwnProperty('type')) {
        throw new DefaultSchemaError("\n        Error occured in field definition with name: \"".concat(fieldName, "\".\n        Field validator at index: ").concat(index, " does not have \"type\" property! Properties received: [").concat(Object.keys(validator), "].\n      "));
      }

      if (!validatorTypes.includes(validator.type)) {
        throw new DefaultSchemaError("\n        Error occured in field definition with name: \"".concat(fieldName, "\".\n        Field validator at index: ").concat(index, " does not have correct \"type\" property!\n        Received \"").concat(validator.type, "\", expected one of: [").concat(validatorTypes, "].\n      "));
      }

      if (validatorMapper.hasOwnProperty(validator.type)) {
        validatorMapper[validator.type](validator, fieldName);
      }
    }
  });
};

var checkDataType = function checkDataType(type, fieldName) {
  if (typeof type !== 'string') {
    throw new DefaultSchemaError("\n    Error occured in field definition with name: \"".concat(fieldName, "\".\n    Unknow dataType. Data type must be string\n    "));
  }

  if (!Object.values(dataTypes).includes(type)) {
    throw new DefaultSchemaError("\n    Error occured in field definition with name: \"".concat(fieldName, "\".\n    Unknow dataType ").concat(type, ". Must be one these values: ").concat(Object.values(dataTypes), "\n    "));
  }
};

var checkActions = function checkActions(actions, name, actionTypes) {
  var actionsValidator = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};
  Object.keys(actions).forEach(function (prop) {
    if (!Array.isArray(actions[prop])) {
      throw new DefaultSchemaError("\n      Action on prop \"".concat(prop, "\" in component \"").concat(name, "\" is not an array.\n      Please, make sure you defined your action in the schema.\n      ActionMapper has these values: [").concat(actionTypes, "]\n    "));
    }

    if (!actions[prop][0]) {
      throw new DefaultSchemaError("\n      Action on prop \"".concat(prop, "\" in component \"").concat(name, "\" has not defined action type as the first element.\n      Please, make sure you defined your action in the schema.\n      ActionMapper has these values: [").concat(actionTypes, "]\n    "));
    }

    if (!actionTypes.includes(actions[prop][0])) {
      throw new DefaultSchemaError("\n      Action on prop \"".concat(prop, "\" in component \"").concat(name, "\" does not exist in ActionMapper.\n      ActionMapper has these values: [").concat(actionTypes, "].\n      Use one of them or define new action in the mapper.\n    "));
    }

    if (actionsValidator.hasOwnProperty(actions[prop][0])) {
      actionsValidator[actions[prop][0]](actions[prop], name);
    }
  });
};

var iterateOverFields = function iterateOverFields(fields, componentMapper, validatorTypes, actionTypes, schemaValidatorMapper) {
  var parent = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : {};
  fields.forEach(function (field) {
    if (Array.isArray(field)) {
      return iterateOverFields(field, componentMapper, validatorTypes, actionTypes, schemaValidatorMapper);
    }

    if (![componentTypes.WIZARD, componentTypes.TABS].includes(parent.component)) {
      if (parent.component !== componentTypes.WIZARD && !field.hasOwnProperty('component')) {
        throw new DefaultSchemaError("Each fields item must have \"component\" property!");
      }

      if (!componentBlackList.includes(field.component) && !componentMapper.hasOwnProperty(field.component)) {
        throw new DefaultSchemaError("\n          Component of type \"".concat(field.component, "\" is not present in componentMapper.\n          Please make sure \"").concat(field.component, " is included in your componentMapper.\"\n          componentMapper has these values: [").concat(Object.keys(componentMapper), "]\n        "));
      }
      /**
       * Investiage
       */
      //if (!componentBlackList.includes(field.component) && !isValidComponent(componentMapper[field.component])) {
      //  throw new DefaultSchemaError(`FormComponent "${field.component}" from componentMapper is not a valid React component!`);
      //}

    }

    if (!field.hasOwnProperty('name') && parent.component !== 'field-array') {
      throw new DefaultSchemaError("Each fields item must have \"name\" property! Name is used as a unique identifier of form fields.");
    }

    if (field.hasOwnProperty('condition')) {
      checkCondition(field.condition, field.name, 'root');
    }

    if (field.hasOwnProperty('validate')) {
      checkValidators(field.validate, field.name, validatorTypes, schemaValidatorMapper.validators);
    }

    if (field.hasOwnProperty('dataType')) {
      checkDataType(field.dataType, field.name);
    }

    if (field.hasOwnProperty('fields')) {
      iterateOverFields(field.fields, componentMapper, validatorTypes, actionTypes, schemaValidatorMapper, field);
    }

    if (field.hasOwnProperty('actions')) {
      checkActions(field.actions, field.name, actionTypes, schemaValidatorMapper.actions);
    }

    if (schemaValidatorMapper.components && schemaValidatorMapper.components.hasOwnProperty(field.component)) {
      schemaValidatorMapper.components[field.component](field);
    }
  });
};

var defaultSchemaValidator = function defaultSchemaValidator(schema, componentMapper) {
  var validatorTypes = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];
  var actionTypes = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : [];
  var schemaValidatorMapper = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : {};

  if (Array.isArray(schema) || _typeof(schema) !== 'object') {
    throw new DefaultSchemaError("Form Schema must be an object, received ".concat(Array.isArray(schema) ? 'array' : _typeof(schema), "!"));
  }

  checkFieldsArray(schema, 'schema');
  iterateOverFields(schema.fields, componentMapper, validatorTypes, actionTypes, schemaValidatorMapper);
};

export default defaultSchemaValidator;