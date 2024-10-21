import React from 'react';
import { AppLayoutInternals } from '../interfaces';
interface AppLayoutNotificationsImplementationProps {
    appLayoutInternals: AppLayoutInternals;
    children: React.ReactNode;
}
export declare function AppLayoutNotificationsImplementation({ appLayoutInternals, children, }: AppLayoutNotificationsImplementationProps): JSX.Element;
export declare const createWidgetizedAppLayoutNotifications: (Loader?: typeof AppLayoutNotificationsImplementation | undefined) => typeof AppLayoutNotificationsImplementation;
export {};
//# sourceMappingURL=index.d.ts.map