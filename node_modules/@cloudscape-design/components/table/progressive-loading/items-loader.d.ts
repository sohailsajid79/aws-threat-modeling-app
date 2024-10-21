import React from 'react';
import { TableProps } from '../interfaces';
interface ItemsLoaderProps<T> {
    item: null | T;
    loadingStatus: TableProps.LoadingStatus;
    renderLoaderPending?: (detail: TableProps.RenderLoaderDetail<T>) => React.ReactNode;
    renderLoaderLoading?: (detail: TableProps.RenderLoaderDetail<T>) => React.ReactNode;
    renderLoaderError?: (detail: TableProps.RenderLoaderDetail<T>) => React.ReactNode;
    trackBy?: TableProps.TrackBy<T>;
}
export declare function ItemsLoader<T>({ item, loadingStatus, renderLoaderPending, renderLoaderLoading, renderLoaderError, trackBy, }: ItemsLoaderProps<T>): JSX.Element;
export {};
//# sourceMappingURL=items-loader.d.ts.map