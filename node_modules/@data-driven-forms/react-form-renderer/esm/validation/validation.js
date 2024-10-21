import _typeof from "@babel/runtime/helpers/typeof";
import _asyncToGenerator from "@babel/runtime/helpers/asyncToGenerator";
import _defineProperty from "@babel/runtime/helpers/defineProperty";
import _regeneratorRuntime from "@babel/runtime/regenerator";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

import get from 'lodash/get';
import composeValidators from '../compose-validators';
import defaultSchemaValidator from '../default-schema-validator';
import getValidates from '../get-validates';
import getVisibleFields from '../get-visible-fields';
import defaultValidatorMapper from '../validator-mapper';
import { getValidate } from '../use-field-api/validator-helpers';
var DEFAULT_COMPONENT = 'default-component';

var noop = function noop() {};

var changeToDefaultComponent = function changeToDefaultComponent(schema) {
  if (Array.isArray(schema)) {
    return schema.map(changeToDefaultComponent);
  }

  return _objectSpread(_objectSpread(_objectSpread({}, schema), schema.component && {
    component: DEFAULT_COMPONENT
  }), schema.fields && {
    fields: changeToDefaultComponent(schema.fields)
  });
};

var validation = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee2(schema, options) {
    var values, componentMapper, validatorMapper, actionMapper, schemaValidatorMapper, omitWarnings, conditionMapper, validatorMapperMerged, validatorTypes, actionTypes, finalComponentMapper, finalSchema, validates;
    return _regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            if (schema) {
              _context2.next = 2;
              break;
            }

            throw new Error('validation requires a schema as the first argument.');

          case 2:
            if (!(_typeof(options) !== 'object')) {
              _context2.next = 4;
              break;
            }

            throw new Error("options argument has to be type of object, provided: ".concat(_typeof(options)));

          case 4:
            values = options.values, componentMapper = options.componentMapper, validatorMapper = options.validatorMapper, actionMapper = options.actionMapper, schemaValidatorMapper = options.schemaValidatorMapper, omitWarnings = options.omitWarnings, conditionMapper = options.conditionMapper;
            validatorMapperMerged = _objectSpread(_objectSpread({}, defaultValidatorMapper), validatorMapper);
            validatorTypes = Object.keys(validatorMapperMerged);
            actionTypes = Object.keys(actionMapper || {});
            finalComponentMapper = componentMapper;
            finalSchema = schema;

            if (!finalComponentMapper) {
              finalComponentMapper = _defineProperty({}, DEFAULT_COMPONENT, noop);
              finalSchema = changeToDefaultComponent(schema);
            }

            defaultSchemaValidator(finalSchema, finalComponentMapper, validatorTypes, actionTypes, schemaValidatorMapper);
            finalSchema = getVisibleFields(finalSchema, values, undefined, conditionMapper);
            validates = getValidates(finalSchema, {
              componentMapper: finalComponentMapper,
              actionMapper: actionMapper,
              values: values
            });
            _context2.next = 16;
            return Object.keys(validates).reduce( /*#__PURE__*/function () {
              var _ref2 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee(accP, name) {
                var acc, error, index, validateFn, fieldError;
                return _regeneratorRuntime.wrap(function _callee$(_context) {
                  while (1) {
                    switch (_context.prev = _context.next) {
                      case 0:
                        _context.next = 2;
                        return accP;

                      case 2:
                        acc = _context.sent;
                        index = 0;

                      case 4:
                        if (!(!error && index + 1 <= validates[name].length)) {
                          _context.next = 13;
                          break;
                        }

                        validateFn = composeValidators(getValidate(validates[name][index], undefined, validatorMapperMerged));
                        _context.next = 8;
                        return validateFn(get(values, name), values, {});

                      case 8:
                        fieldError = _context.sent;

                        if ((fieldError === null || fieldError === void 0 ? void 0 : fieldError.type) !== 'warning' || (fieldError === null || fieldError === void 0 ? void 0 : fieldError.type) === 'warning' && !omitWarnings) {
                          error = fieldError;
                        }

                        index = index + 1;
                        _context.next = 4;
                        break;

                      case 13:
                        if (!error) {
                          _context.next = 15;
                          break;
                        }

                        return _context.abrupt("return", _objectSpread(_objectSpread({}, acc), {}, _defineProperty({}, name, error)));

                      case 15:
                        return _context.abrupt("return", acc);

                      case 16:
                      case "end":
                        return _context.stop();
                    }
                  }
                }, _callee);
              }));

              return function (_x3, _x4) {
                return _ref2.apply(this, arguments);
              };
            }(), {});

          case 16:
            return _context2.abrupt("return", _context2.sent);

          case 17:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));

  return function validation(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

export default validation;