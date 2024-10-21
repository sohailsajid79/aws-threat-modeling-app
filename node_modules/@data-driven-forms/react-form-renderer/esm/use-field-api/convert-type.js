import dataTypes from '../data-types';
/**
 * Casts string true/false to boolean
 * @param {String} value value
 */

var castToBoolean = function castToBoolean(value) {
  if (typeof value === 'boolean') {
    return value;
  }

  return value === 'true';
};
/**
 * Check if the value can be converted to number
 * @param {Any} value value to be checked
 */


var canBeConvertedToNumber = function canBeConvertedToNumber(value) {
  return !isNaN(Number(value)) && value !== '';
};
/**
 * Check if the value can be converted to float
 * @param {Any} value value to be checked
 */


var canBeConvertedToFloat = function canBeConvertedToFloat(value) {
  if (typeof value == 'string' && value.endsWith('.')) {
    return false;
  }

  return canBeConvertedToNumber(value);
};
/**
 * Changes the value type
 * @param {FieldDataTypes} dataType type for value conversion
 * @param {Any} value value to be converted
 */


var convertType = function convertType(dataType, value) {
  switch (dataType) {
    case dataTypes.INTEGER:
      return canBeConvertedToNumber(value) ? parseInt(value) : value;

    case dataTypes.FLOAT:
      return canBeConvertedToFloat(value) ? parseFloat(value) : value;

    case dataTypes.NUMBER:
      return canBeConvertedToNumber(value) ? Number(value) : value;

    case dataTypes.BOOLEAN:
      return castToBoolean(value);

    default:
      return value;
  }
};

export default convertType;