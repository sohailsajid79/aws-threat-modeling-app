import { BreadcrumbGroupProps } from './interfaces';
export declare const getEventDetail: <T extends BreadcrumbGroupProps.Item>(item: T) => {
    item: T;
    text: string;
    href: string;
};
export declare const getItemsDisplayProperties: (itemsWidths: Array<number>, navWidth: number | null) => {
    shrinkFactors: number[];
    minWidths: number[];
    collapsed: number;
};
//# sourceMappingURL=utils.d.ts.map