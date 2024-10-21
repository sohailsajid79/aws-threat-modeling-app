import componentTypes from '../component-types';

var assignSpecialType = function assignSpecialType(componentType) {
  return [componentTypes.CHECKBOX, componentTypes.RADIO].includes(componentType) ? componentType : undefined;
};

export default assignSpecialType;