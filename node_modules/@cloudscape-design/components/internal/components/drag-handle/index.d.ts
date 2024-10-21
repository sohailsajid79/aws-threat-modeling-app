import { ButtonHTMLAttributes } from 'react';
export interface DragHandleProps {
    attributes: ButtonHTMLAttributes<HTMLDivElement>;
    hideFocus?: boolean;
    listeners: Record<string, Function> | undefined;
    disabled?: boolean;
}
export default function DragHandle({ attributes, hideFocus, listeners, disabled }: DragHandleProps): JSX.Element;
//# sourceMappingURL=index.d.ts.map