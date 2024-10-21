import _typeof from "@babel/runtime/helpers/typeof";
import _slicedToArray from "@babel/runtime/helpers/slicedToArray";
import _objectWithoutProperties from "@babel/runtime/helpers/objectWithoutProperties";
import _defineProperty from "@babel/runtime/helpers/defineProperty";
import _asyncToGenerator from "@babel/runtime/helpers/asyncToGenerator";
var _excluded = ["value", "blur", "change", "focus"],
    _excluded2 = ["name", "resolveProps", "skipRegistration"],
    _excluded3 = ["initializeOnMount", "component", "render", "validate", "useWarnings", "clearOnUnmount", "dataType", "FieldProps"],
    _excluded4 = ["initialValue", "clearedValue"];

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

import _regeneratorRuntime from "@babel/runtime/regenerator";
import { useEffect, useContext, useRef, useReducer, useState } from 'react';
import { useField } from 'react-final-form';
import enhancedOnChange from './enhanced-on-change';
import RendererContext from '../renderer-context';
import convertInitialValue from './convert-initial-value';
import assignSpecialType from './assign-special-type';
import componentTypes from '../component-types';
import { prepareArrayValidator, getValidate } from './validator-helpers';
import composeValidators from '../compose-validators';
import isEqual from 'lodash/isEqual';
import get from 'lodash/get';

var calculateInitialValue = function calculateInitialValue(props) {
  if (Object.prototype.hasOwnProperty.call(props, 'initialValue') && props.dataType) {
    return convertInitialValue(props.initialValue, props.dataType);
  }
};

var calculateArrayValidator = function calculateArrayValidator(props, validate, component, validatorMapper) {
  if ((validate || props.dataType) && componentTypes.FIELD_ARRAY === component) {
    return prepareArrayValidator(getValidate(validate, props.dataType, validatorMapper));
  }
};

var calculateValidate = function calculateValidate(props, validate, component, validatorMapper, setWarning, useWarnings) {
  if ((validate || props.dataType) && componentTypes.FIELD_ARRAY !== component) {
    var validateFn = composeValidators(getValidate(validate, props.dataType, validatorMapper));

    if (useWarnings) {
      return /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee() {
        var result,
            _args = arguments;
        return _regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                setWarning(undefined);
                _context.next = 3;
                return validateFn.apply(void 0, _args);

              case 3:
                result = _context.sent;

                if (!((result === null || result === void 0 ? void 0 : result.type) === 'warning')) {
                  _context.next = 7;
                  break;
                }

                setWarning(result.error);
                return _context.abrupt("return");

              case 7:
                return _context.abrupt("return", result);

              case 8:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }));
    }

    return validateFn;
  }
};

var init = function init(_ref2) {
  var props = _ref2.props,
      validate = _ref2.validate,
      component = _ref2.component,
      validatorMapper = _ref2.validatorMapper,
      setWarning = _ref2.setWarning,
      useWarnings = _ref2.useWarnings;
  return {
    initialValue: calculateInitialValue(props),
    arrayValidator: calculateArrayValidator(props, validate, component, validatorMapper),
    validate: calculateValidate(props, validate, component, validatorMapper, setWarning, useWarnings),
    type: assignSpecialType(component)
  };
};

var reducer = function reducer(state, _ref3) {
  var type = _ref3.type,
      specialType = _ref3.specialType,
      validate = _ref3.validate,
      arrayValidator = _ref3.arrayValidator,
      initialValue = _ref3.initialValue;

  switch (type) {
    case 'setType':
      return _objectSpread(_objectSpread({}, state), {}, {
        type: specialType
      });

    case 'setValidators':
      return _objectSpread(_objectSpread({}, state), {}, {
        validate: validate,
        arrayValidator: arrayValidator
      });

    case 'setInitialValue':
      return _objectSpread(_objectSpread({}, state), {}, {
        initialValue: initialValue
      });

    default:
      return state;
  }
};

var createFieldProps = function createFieldProps(name, formOptions) {
  var _ref4 = formOptions.getFieldState(name) || {},
      value = _ref4.value,
      blur = _ref4.blur,
      change = _ref4.change,
      focus = _ref4.focus,
      meta = _objectWithoutProperties(_ref4, _excluded);

  return {
    meta: meta,
    input: {
      name: name,
      value: value
    }
  };
};

var useFieldApi = function useFieldApi(_ref5) {
  var name = _ref5.name,
      resolveProps = _ref5.resolveProps,
      _ref5$skipRegistratio = _ref5.skipRegistration,
      skipRegistration = _ref5$skipRegistratio === void 0 ? false : _ref5$skipRegistratio,
      props = _objectWithoutProperties(_ref5, _excluded2);

  var _useContext = useContext(RendererContext),
      validatorMapper = _useContext.validatorMapper,
      formOptions = _useContext.formOptions;

  var _useState = useState(),
      _useState2 = _slicedToArray(_useState, 2),
      warning = _useState2[0],
      setWarning = _useState2[1]; // if there is field initial value, we have to check form initialValues
  // initialValues should have higher priority


  var formInitialValue = Object.prototype.hasOwnProperty.call(props, 'initialValue') ? get(formOptions.initialValues, name) : undefined;
  var resolvedProps = resolveProps ? resolveProps(props, createFieldProps(name, formOptions), formOptions) || {} : {};

  var combinedProps = _objectSpread(_objectSpread({}, props), resolvedProps);

  var initializeOnMount = combinedProps.initializeOnMount,
      component = combinedProps.component,
      render = combinedProps.render,
      validate = combinedProps.validate,
      useWarnings = combinedProps.useWarnings,
      clearOnUnmount = combinedProps.clearOnUnmount,
      dataType = combinedProps.dataType,
      FieldProps = combinedProps.FieldProps,
      rest = _objectWithoutProperties(combinedProps, _excluded3);

  var _useReducer = useReducer(reducer, {
    props: combinedProps,
    validate: validate,
    component: component,
    validatorMapper: validatorMapper,
    setWarning: setWarning,
    useWarnings: useWarnings
  }, init),
      _useReducer2 = _slicedToArray(_useReducer, 2),
      _useReducer2$ = _useReducer2[0],
      type = _useReducer2$.type,
      initialValue = _useReducer2$.initialValue,
      stateValidate = _useReducer2$.validate,
      arrayValidator = _useReducer2$.arrayValidator,
      dispatch = _useReducer2[1];

  var mounted = useRef(false);

  var enhancedProps = _objectSpread(_objectSpread(_objectSpread(_objectSpread(_objectSpread(_objectSpread({
    dataType: dataType,
    type: combinedProps.type
  }, Object.prototype.hasOwnProperty.call(combinedProps, 'initialValue') ? {
    initialValue: combinedProps.initialValue
  } : {}), Object.prototype.hasOwnProperty.call(combinedProps, 'value') ? {
    value: combinedProps.value
  } : {}), FieldProps), type ? {
    type: type
  } : {}), initialValue ? {
    initialValue: initialValue
  } : {}), stateValidate ? {
    validate: stateValidate
  } : {});

  var field = useField(name, _objectSpread(_objectSpread({}, enhancedProps), typeof formInitialValue !== 'undefined' && {
    initialValue: formInitialValue
  }));
  /** Reinitilize type */

  useEffect(function () {
    if (mounted.current) {
      var specialType = assignSpecialType(component);

      if (specialType !== type) {
        dispatch({
          type: 'setType',
          specialType: specialType
        });
      }
    }
  }, [component]);
  /** Reinitilize array validator/validate */

  useEffect(function () {
    if (mounted.current) {
      dispatch({
        type: 'setValidators',
        validate: calculateValidate(enhancedProps, validate, component, validatorMapper, setWarning, useWarnings),
        arrayValidator: calculateArrayValidator(enhancedProps, validate, component, validatorMapper)
      });
    }
    /**
     * We have to stringify the validate array in order to preven infinite looping when validate was passed directly to useFieldApi
     * const x = useFieldApu({name: 'foo', validate: [{type: 'bar'}]}) will trigger infinite looping witouth the serialize.
     * Using stringify is acceptable here since the array is usually very small.
     * If we notice performance hit, we can implement custom hook with a deep equal functionality.
     */

  }, [validate ? JSON.stringify(validate) : false, component, dataType]);
  /** Re-convert initialValue when changed */

  useEffect(function () {
    if (mounted.current) {
      var newInitialValue = calculateInitialValue(enhancedProps);

      if (!isEqual(initialValue, newInitialValue)) {
        dispatch({
          type: 'setInitialValue',
          initialValue: newInitialValue
        });
      }
    }
  }, [enhancedProps.initialValue, dataType]);
  useEffect(function () {
    /**
     * Re initialize field when mounted to the Form
     * This affects conditional fields
     */
    if (initializeOnMount) {
      var value = Object.prototype.hasOwnProperty.call(enhancedProps, 'initialValue') ? enhancedProps.initialValue : formOptions.getFieldState(name).initial;
      field.input.onChange(value);
    }
  }, [initializeOnMount, enhancedProps.initialValue, field.meta.initial, dataType]);
  /**
   * Prepare deleted value of field
   */

  var fieldClearedValue = Object.prototype.hasOwnProperty.call(rest, 'clearedValue') ? rest.clearedValue : formOptions.clearedValue;
  useEffect(function () {
    if (!skipRegistration) {
      formOptions.internalRegisterField(name);
    }

    mounted.current = true;

    if (field.input.type === 'file') {
      formOptions.registerInputFile(field.input.name);
    }

    return function () {
      mounted.current = false;
      /**
       * Delete the value from form state when field is inmounted
       */

      if ((formOptions.clearOnUnmount || clearOnUnmount) && clearOnUnmount !== false) {
        field.input.onChange(fieldClearedValue);
      }

      if (field.input.type === 'file') {
        formOptions.unRegisterInputFile(field.input.name);
      }

      if (!skipRegistration) {
        formOptions.internalUnRegisterField(name);
      }
    };
  }, // eslint-disable-next-line react-hooks/exhaustive-deps
  []);

  var _initialValue = rest.initialValue,
      clearedValue = rest.clearedValue,
      cleanProps = _objectWithoutProperties(rest, _excluded4);
  /**
   * construct component props necessary that would live in field provider
   */


  return _objectSpread(_objectSpread(_objectSpread(_objectSpread(_objectSpread({}, cleanProps), field), arrayValidator && {
    arrayValidator: arrayValidator
  }), useWarnings && {
    meta: _objectSpread(_objectSpread({}, field.meta), {}, {
      warning: warning
    })
  }), {}, {
    input: _objectSpread(_objectSpread({}, field.input), {}, {
      value: field.input.type === 'file' && _typeof(field.input.value) === 'object' ? field.input.value.inputValue : field.input.value,
      onChange: function onChange() {
        for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
          args[_key] = arguments[_key];
        }

        enhancedOnChange.apply(void 0, [_objectSpread(_objectSpread({}, field.meta), {}, {
          dataType: dataType,
          onChange: field.input.onChange,
          clearedValue: fieldClearedValue
        })].concat(args));
      }
    })
  });
};

export default useFieldApi;