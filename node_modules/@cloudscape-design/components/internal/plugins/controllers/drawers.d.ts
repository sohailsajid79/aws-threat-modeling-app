import { NonCancelableEventHandler } from '../../events';
export type DrawerVisibilityChange = (callback: (isVisible: boolean) => void) => void;
export interface MountContentContext {
    onVisibilityChange: DrawerVisibilityChange;
}
export interface DrawerConfig {
    id: string;
    type?: 'local' | 'global';
    ariaLabels: {
        content?: string;
        closeButton?: string;
        triggerButton?: string;
        resizeHandle?: string;
    };
    badge?: boolean;
    resizable?: boolean;
    defaultSize?: number;
    onResize?: NonCancelableEventHandler<{
        size: number;
        id: string;
    }>;
    orderPriority?: number;
    defaultActive?: boolean;
    trigger?: {
        iconSvg: string;
    };
    mountContent: (container: HTMLElement, mountContext: MountContentContext) => void;
    unmountContent: (container: HTMLElement) => void;
    preserveInactiveContent?: boolean;
}
export type UpdateDrawerConfig = Pick<DrawerConfig, 'id' | 'badge' | 'resizable' | 'defaultSize'>;
export type DrawersRegistrationListener = (drawers: Array<DrawerConfig>) => void;
export type DrawersToggledListener = (drawerId: string) => void;
export interface DrawersApiPublic {
    registerDrawer(config: DrawerConfig): void;
    updateDrawer(config: UpdateDrawerConfig): void;
    openDrawer(drawerId: string): void;
    closeDrawer(drawerId: string): void;
}
export interface DrawersApiInternal {
    clearRegisteredDrawers(): void;
    onDrawersRegistered(listener: DrawersRegistrationListener): () => void;
    onDrawerOpened(listener: DrawersToggledListener): () => void;
    onDrawerClosed(listener: DrawersToggledListener): () => void;
}
export declare class DrawersController {
    private drawers;
    private drawersRegistrationListener;
    private drawerOpenedListener;
    private drawerClosedListener;
    scheduleUpdate: () => void;
    registerDrawer: (config: DrawerConfig) => void;
    updateDrawer: (config: UpdateDrawerConfig) => void;
    onDrawersRegistered: (listener: DrawersRegistrationListener) => () => void;
    clearRegisteredDrawers: () => void;
    onDrawerOpened: (listener: DrawersToggledListener) => () => void;
    onDrawerClosed: (listener: DrawersToggledListener) => () => void;
    openDrawer: (drawerId: string) => void;
    closeDrawer: (drawerId: string) => void;
    installPublic(api?: Partial<DrawersApiPublic>): DrawersApiPublic;
    installInternal(internalApi?: Partial<DrawersApiInternal>): DrawersApiInternal;
}
//# sourceMappingURL=drawers.d.ts.map