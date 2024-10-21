import React from 'react';
import { StickyColumnsModel } from '../sticky-columns';
import { TableRole } from '../table-role';
import { SortingStatus } from './utils';
interface TableThElementProps {
    className?: string;
    style?: React.CSSProperties;
    sortingStatus?: SortingStatus;
    sortingDisabled?: boolean;
    focusedComponent?: null | string;
    hidden?: boolean;
    colIndex: number;
    columnId: PropertyKey;
    stickyState: StickyColumnsModel;
    cellRef?: React.RefCallback<HTMLElement> | null;
    tableRole: TableRole;
    children: React.ReactNode;
}
export declare function TableThElement({ className, style, sortingStatus, sortingDisabled, focusedComponent, hidden, colIndex, columnId, stickyState, cellRef, tableRole, children, ...props }: TableThElementProps): JSX.Element;
export {};
//# sourceMappingURL=th-element.d.ts.map