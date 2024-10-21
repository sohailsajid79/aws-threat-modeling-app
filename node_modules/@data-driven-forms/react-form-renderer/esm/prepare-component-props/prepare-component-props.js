import _toConsumableArray from "@babel/runtime/helpers/toConsumableArray";
import _toArray from "@babel/runtime/helpers/toArray";
import _objectWithoutProperties from "@babel/runtime/helpers/objectWithoutProperties";
import _typeof from "@babel/runtime/helpers/typeof";
import _defineProperty from "@babel/runtime/helpers/defineProperty";
var _excluded = ["component"];

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

var prepareComponentProps = function prepareComponentProps(_ref) {
  var component = _ref.component,
      rest = _ref.rest,
      componentMapper = _ref.componentMapper,
      actionMapper = _ref.actionMapper;

  var componentProps = _objectSpread({
    component: component
  }, rest);

  var componentBinding = componentMapper[component];
  var Component;

  if (_typeof(componentBinding) === 'object' && Object.prototype.hasOwnProperty.call(componentBinding, 'component')) {
    var _component = componentBinding.component,
        mapperProps = _objectWithoutProperties(componentBinding, _excluded);

    Component = _component;
    componentProps = _objectSpread(_objectSpread(_objectSpread(_objectSpread({}, mapperProps), componentProps), mapperProps.actions && rest.actions ? {
      actions: _objectSpread(_objectSpread({}, mapperProps.actions), rest.actions)
    } : {}), mapperProps.resolveProps && rest.resolveProps ? {
      resolveProps: function resolveProps() {
        return _objectSpread(_objectSpread({}, mapperProps.resolveProps.apply(mapperProps, arguments)), rest.resolveProps.apply(rest, arguments));
      }
    } : {});
  } else {
    Component = componentBinding;
  }
  /**
   * Map actions to props
   */


  var overrideProps = {};
  var mergedResolveProps; // new object has to be created because of references

  if (componentProps.actions) {
    Object.keys(componentProps.actions).forEach(function (prop) {
      var _componentProps$actio = _toArray(componentProps.actions[prop]),
          action = _componentProps$actio[0],
          args = _componentProps$actio.slice(1);

      overrideProps[prop] = actionMapper[action].apply(actionMapper, _toConsumableArray(args));
    }); // Merge componentProps resolve props and actions resolve props

    if (componentProps.resolveProps && overrideProps.resolveProps) {
      mergedResolveProps = function mergedResolveProps() {
        var _componentProps;

        return _objectSpread(_objectSpread({}, (_componentProps = componentProps).resolveProps.apply(_componentProps, arguments)), overrideProps.resolveProps.apply(overrideProps, arguments));
      };
    } // do not pass actions object to components


    delete componentProps.actions;
  }

  return {
    componentProps: componentProps,
    overrideProps: overrideProps,
    mergedResolveProps: mergedResolveProps,
    Component: Component
  };
};

export default prepareComponentProps;