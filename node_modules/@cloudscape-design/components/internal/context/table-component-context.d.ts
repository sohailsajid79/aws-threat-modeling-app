import { RefObject } from 'react';
export interface FilterRef {
    filterText?: string;
}
export interface PaginationRef {
    currentPageIndex?: number;
    totalPageCount?: number;
}
export interface TableComponentsContextProps {
    filterRef: RefObject<FilterRef>;
    paginationRef: RefObject<PaginationRef>;
}
export declare const TableComponentsContext: import("react").Context<TableComponentsContextProps | null>;
export declare const TableComponentsContextProvider: import("react").Provider<TableComponentsContextProps | null>;
export declare const useTableComponentsContext: () => TableComponentsContextProps | null;
//# sourceMappingURL=table-component-context.d.ts.map