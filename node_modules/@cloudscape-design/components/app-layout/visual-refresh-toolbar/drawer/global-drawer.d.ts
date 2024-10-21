/// <reference types="react" />
import { NonCancelableEventHandler } from '../../../internal/events';
import { AppLayoutProps } from '../../interfaces';
import { AppLayoutInternals } from '../interfaces';
interface AppLayoutGlobalDrawerImplementationProps {
    appLayoutInternals: AppLayoutInternals;
    show: boolean;
    activeGlobalDrawer: (AppLayoutProps.Drawer & {
        onShow?: NonCancelableEventHandler;
        onHide?: NonCancelableEventHandler;
    }) | undefined;
}
declare function AppLayoutGlobalDrawerImplementation({ appLayoutInternals, show, activeGlobalDrawer, }: AppLayoutGlobalDrawerImplementationProps): JSX.Element;
export default AppLayoutGlobalDrawerImplementation;
//# sourceMappingURL=global-drawer.d.ts.map