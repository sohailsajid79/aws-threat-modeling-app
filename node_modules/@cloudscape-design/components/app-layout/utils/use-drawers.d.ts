import React from 'react';
import { AppLayoutProps } from '../interfaces';
export declare const TOOLS_DRAWER_ID = "awsui-internal-tools";
interface ToolsProps {
    toolsHide: boolean | undefined;
    toolsOpen: boolean | undefined;
    toolsWidth: number;
    tools: React.ReactNode | undefined;
    onToolsToggle: (newOpen: boolean) => void;
    ariaLabels: AppLayoutProps.Labels | undefined;
    disableDrawersMerge?: boolean;
}
export declare const MIN_DRAWER_SIZE = 290;
type UseDrawersProps = Pick<AppLayoutProps, 'drawers' | 'activeDrawerId' | 'onDrawerChange'> & {
    __disableRuntimeDrawers?: boolean;
    onGlobalDrawerFocus?: (drawerId: string, open: boolean) => void;
    onAddNewActiveDrawer?: (drawerId: string) => void;
};
export declare function useDrawers({ drawers, activeDrawerId: controlledActiveDrawerId, onDrawerChange, onGlobalDrawerFocus, onAddNewActiveDrawer, __disableRuntimeDrawers: disableRuntimeDrawers, }: UseDrawersProps, ariaLabels: AppLayoutProps['ariaLabels'], toolsProps: ToolsProps): {
    ariaLabelsWithDrawers: AppLayoutProps.Labels | undefined;
    drawers: AppLayoutProps.Drawer[] | undefined;
    activeDrawer: AppLayoutProps.Drawer | undefined;
    activeDrawerId: string | null;
    globalDrawers: AppLayoutProps.Drawer[];
    activeGlobalDrawers: AppLayoutProps.Drawer[];
    activeGlobalDrawersIds: string[];
    activeGlobalDrawersSizes: Record<string, number>;
    activeDrawerSize: number;
    minDrawerSize: number;
    minGlobalDrawersSizes: Record<string, number>;
    drawerSizes: Record<string, number>;
    drawersOpenQueue: string[];
    onActiveDrawerChange: (newDrawerId: string | null) => void;
    onActiveDrawerResize: ({ id, size }: {
        id: string;
        size: number;
    }) => void;
    onActiveGlobalDrawersChange: (drawerId: string) => void;
};
export {};
//# sourceMappingURL=use-drawers.d.ts.map