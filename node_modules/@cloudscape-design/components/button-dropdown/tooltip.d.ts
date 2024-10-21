import React from 'react';
export interface TooltipProps {
    children?: React.ReactNode;
    content?: React.ReactNode;
    position?: 'top' | 'right' | 'bottom' | 'left';
    className?: string;
}
export default function Tooltip({ children, content, position, className }: TooltipProps): JSX.Element;
//# sourceMappingURL=tooltip.d.ts.map