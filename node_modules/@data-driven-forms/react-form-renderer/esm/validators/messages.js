// babel-plugin-react-intl.
var defineMessages = function defineMessages(messageDescriptors) {
  return messageDescriptors;
};

var messages = defineMessages({
  even: {
    id: 'form.errors.even',
    defaultMessage: 'Number must be even'
  },
  equalTo: {
    id: 'form.errors.equalTo',
    defaultMessage: function defaultMessage(equal) {
      return "must be equal to ".concat(equal, ".");
    }
  },
  greaterThan: {
    id: 'form.errors.greaterThan',
    defaultMessage: function defaultMessage(number) {
      return "Value must be greater than ".concat(number, ".");
    }
  },
  greaterThanOrEqualTo: {
    id: 'form.errors.greaterThanOrEqualTo',
    defaultMessage: function defaultMessage(number) {
      return "Value must be greater than or equal to ".concat(number, ".");
    }
  },
  lessThan: {
    id: 'form.errors.lessThan',
    defaultMessage: function defaultMessage(number) {
      return "Value must be less than ".concat(number);
    }
  },
  lessThanOrEqualTo: {
    id: 'form.errors.lessThanOrEqualTo',
    defaultMessage: function defaultMessage(number) {
      return "Value must be less than or equal to ".concat(number);
    }
  },
  mustBeBool: {
    id: 'forms.errors.mustBeBool',
    defaultMessage: 'Value must be boolean.'
  },
  mustBeString: {
    id: 'form.errors.mustBeString',
    defaultMessage: 'Value must be a string'
  },
  notANumber: {
    id: 'form.errors.notANumber',
    defaultMessage: 'Value is not a number'
  },
  odd: {
    id: 'form.errors.odd',
    defaultMessage: 'Number must be odd'
  },
  otherThan: {
    id: 'form.errors.otherThan',
    defaultMessage: function defaultMessage(number) {
      return "Value must be other than ".concat(number, ".");
    }
  },
  pattern: {
    id: 'form.errors.required',
    defaultMessage: function defaultMessage(pattern) {
      return "Value does not match pattern: ".concat(pattern, ".");
    }
  },
  required: {
    id: 'form.errors.required',
    defaultMessage: 'Required'
  },
  tooLong: {
    id: 'form.errors.tooLong',
    defaultMessage: function defaultMessage(count) {
      return "Can have maximum of ".concat(count, " characters.");
    }
  },
  tooShort: {
    id: 'form.errors.tooShort',
    defaultMessage: function defaultMessage(count) {
      return "Must have at least ".concat(count, " characters.");
    }
  },
  wrongLength: {
    id: 'form.errors.wrongLength',
    defaultMessage: function defaultMessage(count) {
      return "Should be ".concat(count, " characters long.");
    }
  }
});
export default messages;