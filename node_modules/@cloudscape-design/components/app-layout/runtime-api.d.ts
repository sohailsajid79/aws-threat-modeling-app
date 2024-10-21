import { DrawerConfig as RuntimeDrawerConfig } from '../internal/plugins/controllers/drawers';
import { AppLayoutProps } from './interfaces';
export interface DrawersLayout {
    global: Array<AppLayoutProps.Drawer>;
    localBefore: Array<AppLayoutProps.Drawer>;
    localAfter: Array<AppLayoutProps.Drawer>;
}
export declare function convertRuntimeDrawers(localDrawers: Array<RuntimeDrawerConfig>, globalDrawers: Array<RuntimeDrawerConfig>): DrawersLayout;
//# sourceMappingURL=runtime-api.d.ts.map