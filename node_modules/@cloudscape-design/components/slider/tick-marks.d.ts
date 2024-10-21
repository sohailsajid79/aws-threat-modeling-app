/// <reference types="react" />
export interface SliderTicksProps {
    hideFillLine?: boolean;
    value: number;
    isActive: boolean;
    invalid?: boolean;
    warning?: boolean;
    disabled?: boolean;
    readOnly?: boolean;
    min: number;
    max: number;
    step: number;
}
export interface SliderTickMarkProps extends SliderTicksProps {
    type: 'min' | 'max' | 'step';
}
export default function SliderTickMarks(props: SliderTicksProps): JSX.Element;
//# sourceMappingURL=tick-marks.d.ts.map