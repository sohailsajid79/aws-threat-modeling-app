export interface SelectionProps {
    name: string;
    disabled: boolean;
    selectionType: 'single' | 'multi';
    indeterminate?: boolean;
    checked: boolean;
    onChange: () => void;
    onShiftToggle?: (value: boolean) => void;
    ariaLabel?: string;
}
//# sourceMappingURL=interfaces.d.ts.map