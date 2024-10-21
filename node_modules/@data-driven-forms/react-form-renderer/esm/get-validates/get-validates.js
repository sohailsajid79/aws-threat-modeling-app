import _toConsumableArray from "@babel/runtime/helpers/toConsumableArray";
import get from 'lodash/get';
import prepareComponentProps from '../prepare-component-props';
import { dataTypeValidator } from '../validators/validator-functions';

var getValidates = function getValidates(schema, _ref) {
  var componentMapper = _ref.componentMapper,
      actionMapper = _ref.actionMapper,
      values = _ref.values;
  var validations = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

  if (Array.isArray(schema)) {
    schema.map(function (field) {
      return getValidates(field, {
        componentMapper: componentMapper,
        actionMapper: actionMapper,
        values: values
      }, validations);
    });
  } else {
    if (schema.component) {
      var validate;

      var _prepareComponentProp = prepareComponentProps({
        component: schema.component,
        rest: schema,
        componentMapper: componentMapper,
        actionMapper: actionMapper
      }),
          componentProps = _prepareComponentProp.componentProps,
          overrideProps = _prepareComponentProp.overrideProps,
          mergedResolveProps = _prepareComponentProp.mergedResolveProps;

      var resolveProps = mergedResolveProps || overrideProps.resolveProps || componentProps.resolveProps; // fake form state with only values

      if (resolveProps) {
        var _resolveProps = resolveProps(schema, {
          input: {
            value: get(values, schema.name)
          },
          meta: {}
        }, {
          getState: function getState() {
            return {
              values: values
            };
          }
        }),
            resolvePropsValidate = _resolveProps.validate;

        validate = resolvePropsValidate;
      }

      validate = validate || overrideProps.validate || componentProps.validate;

      if (schema.dataType) {
        validate = [].concat(_toConsumableArray(validate || []), [dataTypeValidator(schema.dataType)()]);
      }

      if (validate) {
        if (validations[schema.name]) {
          validations[schema.name].push(validate);
        } else {
          validations[schema.name] = [validate];
        }
      }
    }

    if (schema.fields) {
      getValidates(schema.fields, {
        componentMapper: componentMapper,
        actionMapper: actionMapper,
        values: values
      }, validations);
    }
  }

  return validations;
};

export default getValidates;