/// <reference types="react" />
import { DateRangePickerProps } from './interfaces';
export declare const VALID_RANGE: DateRangePickerProps.ValidRangeResult;
export interface DateRangePickerDropdownProps extends Pick<Required<DateRangePickerProps>, 'locale' | 'isDateEnabled' | 'dateDisabledReason' | 'isValidRange' | 'value' | 'relativeOptions' | 'showClearButton' | 'dateOnly' | 'timeInputFormat' | 'rangeSelectorMode'>, Pick<DateRangePickerProps, 'startOfWeek' | 'getTimeOffset' | 'timeOffset' | 'ariaLabelledby' | 'ariaDescribedby' | 'i18nStrings' | 'customRelativeRangeUnits'> {
    onClear: () => void;
    onApply: (value: null | DateRangePickerProps.Value) => DateRangePickerProps.ValidationResult;
    onDropdownClose: () => void;
    isSingleGrid: boolean;
    customAbsoluteRangeControl: DateRangePickerProps.AbsoluteRangeControl | undefined;
}
export declare function DateRangePickerDropdown({ locale, startOfWeek, isDateEnabled, dateDisabledReason, isValidRange, value, onClear: clearValue, onApply: applyValue, getTimeOffset, timeOffset, onDropdownClose, relativeOptions, showClearButton, isSingleGrid, i18nStrings, dateOnly, timeInputFormat, rangeSelectorMode, ariaLabelledby, ariaDescribedby, customAbsoluteRangeControl, customRelativeRangeUnits, }: DateRangePickerDropdownProps): JSX.Element;
//# sourceMappingURL=dropdown.d.ts.map