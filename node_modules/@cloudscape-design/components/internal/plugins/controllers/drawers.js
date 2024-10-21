// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
import debounce from '../../debounce';
export class DrawersController {
    constructor() {
        this.drawers = [];
        this.drawersRegistrationListener = null;
        this.drawerOpenedListener = null;
        this.drawerClosedListener = null;
        this.scheduleUpdate = debounce(() => {
            var _a;
            (_a = this.drawersRegistrationListener) === null || _a === void 0 ? void 0 : _a.call(this, this.drawers);
        }, 0);
        this.registerDrawer = (config) => {
            this.drawers = this.drawers.concat(config);
            this.scheduleUpdate();
        };
        this.updateDrawer = (config) => {
            var _a;
            const { id: drawerId, resizable, badge, defaultSize } = config;
            const drawerIndex = this.drawers.findIndex(({ id }) => id === drawerId);
            const oldDrawerConfig = (_a = this.drawers) === null || _a === void 0 ? void 0 : _a[drawerIndex];
            if (drawerIndex >= 0 && oldDrawerConfig) {
                const drawers = this.drawers.slice();
                const drawerConfig = Object.assign({}, oldDrawerConfig);
                if (typeof resizable === 'boolean') {
                    drawerConfig.resizable = resizable;
                }
                if (typeof badge === 'boolean') {
                    drawerConfig.badge = badge;
                }
                if (typeof defaultSize === 'number') {
                    drawerConfig.defaultSize = defaultSize;
                }
                drawers[drawerIndex] = drawerConfig;
                this.drawers = drawers;
                this.scheduleUpdate();
            }
            else {
                throw new Error(`[AwsUi] [runtime drawers] drawer with id ${drawerId} not found`);
            }
        };
        this.onDrawersRegistered = (listener) => {
            if (this.drawersRegistrationListener !== null) {
                console.warn('[AwsUi] [runtime drawers] multiple app layout instances detected');
            }
            this.drawersRegistrationListener = listener;
            this.scheduleUpdate();
            return () => {
                this.drawersRegistrationListener = null;
            };
        };
        this.clearRegisteredDrawers = () => {
            this.drawers = [];
        };
        this.onDrawerOpened = (listener) => {
            if (this.drawerOpenedListener !== null) {
                console.warn('[AwsUi] [runtime drawers] multiple app layout instances detected');
            }
            this.drawerOpenedListener = listener;
            return () => {
                this.drawerOpenedListener = null;
            };
        };
        this.onDrawerClosed = (listener) => {
            if (this.drawerClosedListener !== null) {
                console.warn('[AwsUi] [runtime drawers] multiple app layout instances detected');
            }
            this.drawerClosedListener = listener;
            return () => {
                this.drawerClosedListener = null;
            };
        };
        this.openDrawer = (drawerId) => {
            var _a;
            (_a = this.drawerOpenedListener) === null || _a === void 0 ? void 0 : _a.call(this, drawerId);
        };
        this.closeDrawer = (drawerId) => {
            var _a;
            (_a = this.drawerClosedListener) === null || _a === void 0 ? void 0 : _a.call(this, drawerId);
        };
    }
    installPublic(api = {}) {
        var _a, _b, _c, _d;
        (_a = api.registerDrawer) !== null && _a !== void 0 ? _a : (api.registerDrawer = this.registerDrawer);
        (_b = api.updateDrawer) !== null && _b !== void 0 ? _b : (api.updateDrawer = this.updateDrawer);
        (_c = api.openDrawer) !== null && _c !== void 0 ? _c : (api.openDrawer = this.openDrawer);
        (_d = api.closeDrawer) !== null && _d !== void 0 ? _d : (api.closeDrawer = this.closeDrawer);
        return api;
    }
    installInternal(internalApi = {}) {
        var _a, _b, _c, _d;
        (_a = internalApi.clearRegisteredDrawers) !== null && _a !== void 0 ? _a : (internalApi.clearRegisteredDrawers = this.clearRegisteredDrawers);
        (_b = internalApi.onDrawersRegistered) !== null && _b !== void 0 ? _b : (internalApi.onDrawersRegistered = this.onDrawersRegistered);
        (_c = internalApi.onDrawerOpened) !== null && _c !== void 0 ? _c : (internalApi.onDrawerOpened = this.onDrawerOpened);
        (_d = internalApi.onDrawerClosed) !== null && _d !== void 0 ? _d : (internalApi.onDrawerClosed = this.onDrawerClosed);
        return internalApi;
    }
}
//# sourceMappingURL=drawers.js.map