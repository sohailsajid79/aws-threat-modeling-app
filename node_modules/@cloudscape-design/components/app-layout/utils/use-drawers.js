// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
import { useEffect, useRef, useState } from 'react';
import { useStableCallback } from '@cloudscape-design/component-toolkit/internal';
import { fireNonCancelableEvent } from '../../internal/events';
import { useControllable } from '../../internal/hooks/use-controllable';
import { awsuiPluginsInternal } from '../../internal/plugins/api';
import { sortByPriority } from '../../internal/plugins/helpers/utils';
import { convertRuntimeDrawers } from '../runtime-api';
import { togglesConfig } from '../toggles';
export const TOOLS_DRAWER_ID = 'awsui-internal-tools';
function getToolsDrawerItem(props) {
    if (props.toolsHide) {
        return null;
    }
    const { iconName, getLabels } = togglesConfig.tools;
    const { mainLabel, closeLabel, openLabel } = getLabels(props.ariaLabels);
    return {
        id: TOOLS_DRAWER_ID,
        content: props.tools,
        resizable: false,
        ariaLabels: {
            triggerButton: openLabel,
            closeButton: closeLabel,
            drawerName: mainLabel !== null && mainLabel !== void 0 ? mainLabel : '',
        },
        trigger: {
            iconName: iconName,
        },
    };
}
const DRAWERS_LIMIT = 2;
function useRuntimeDrawers(disableRuntimeDrawers, activeDrawerId, onActiveDrawerChange, activeGlobalDrawersIds, onActiveGlobalDrawersChange, drawers) {
    const [runtimeDrawers, setRuntimeDrawers] = useState({
        localBefore: [],
        localAfter: [],
        global: [],
    });
    const onLocalDrawerChangeStable = useStableCallback(onActiveDrawerChange);
    const onGlobalDrawersChangeStable = useStableCallback(onActiveGlobalDrawersChange);
    const localDrawerWasOpenRef = useRef(false);
    localDrawerWasOpenRef.current = localDrawerWasOpenRef.current || !!activeDrawerId;
    const activeGlobalDrawersIdsRef = useRef([]);
    activeGlobalDrawersIdsRef.current = activeGlobalDrawersIds;
    useEffect(() => {
        if (disableRuntimeDrawers) {
            return;
        }
        const unsubscribe = awsuiPluginsInternal.appLayout.onDrawersRegistered(drawers => {
            const localDrawers = drawers.filter(drawer => drawer.type !== 'global');
            const globalDrawers = drawers.filter(drawer => drawer.type === 'global');
            setRuntimeDrawers(convertRuntimeDrawers(localDrawers, globalDrawers));
            if (!localDrawerWasOpenRef.current) {
                const defaultActiveLocalDrawer = sortByPriority(localDrawers).find(drawer => drawer.defaultActive);
                if (defaultActiveLocalDrawer) {
                    onLocalDrawerChangeStable(defaultActiveLocalDrawer.id);
                }
            }
            const drawersNotActiveByDefault = globalDrawers.filter(drawer => !drawer.defaultActive);
            const hasDrawersOpenByUserAction = drawersNotActiveByDefault.find(drawer => activeGlobalDrawersIdsRef.current.includes(drawer.id));
            if (hasDrawersOpenByUserAction || activeGlobalDrawersIdsRef.current.length === DRAWERS_LIMIT) {
                return;
            }
            const defaultActiveGlobalDrawers = sortByPriority(globalDrawers).filter(drawer => !activeGlobalDrawersIdsRef.current.includes(drawer.id) && drawer.defaultActive);
            defaultActiveGlobalDrawers.forEach(drawer => {
                onGlobalDrawersChangeStable(drawer.id);
            });
        });
        return () => {
            unsubscribe();
            setRuntimeDrawers({ localBefore: [], localAfter: [], global: [] });
        };
    }, [disableRuntimeDrawers, onGlobalDrawersChangeStable, onLocalDrawerChangeStable]);
    useEffect(() => {
        const unsubscribe = awsuiPluginsInternal.appLayout.onDrawerOpened(drawerId => {
            var _a, _b;
            const localDrawer = (_a = [...runtimeDrawers.localBefore, ...drawers, ...runtimeDrawers.localAfter]) === null || _a === void 0 ? void 0 : _a.find(drawer => drawer.id === drawerId);
            const globalDrawer = (_b = runtimeDrawers.global) === null || _b === void 0 ? void 0 : _b.find(drawer => drawer.id === drawerId);
            if (localDrawer && activeDrawerId !== drawerId) {
                onActiveDrawerChange(drawerId);
            }
            if (globalDrawer && !activeGlobalDrawersIds.includes(drawerId)) {
                onActiveGlobalDrawersChange(drawerId);
            }
        });
        return () => {
            unsubscribe();
        };
    }, [
        activeDrawerId,
        activeGlobalDrawersIds,
        drawers,
        onActiveDrawerChange,
        runtimeDrawers,
        onActiveGlobalDrawersChange,
    ]);
    useEffect(() => {
        const unsubscribe = awsuiPluginsInternal.appLayout.onDrawerClosed(drawerId => {
            var _a, _b;
            const localDrawer = (_a = [...runtimeDrawers.localBefore, ...drawers, ...runtimeDrawers.localAfter]) === null || _a === void 0 ? void 0 : _a.find(drawer => drawer.id === drawerId);
            const globalDrawer = (_b = runtimeDrawers.global) === null || _b === void 0 ? void 0 : _b.find(drawer => drawer.id === drawerId);
            if (localDrawer && activeDrawerId === drawerId) {
                onActiveDrawerChange(null);
            }
            if (globalDrawer && activeGlobalDrawersIds.includes(drawerId)) {
                onActiveGlobalDrawersChange(drawerId);
            }
        });
        return () => {
            unsubscribe();
        };
    }, [
        activeDrawerId,
        activeGlobalDrawersIds,
        drawers,
        onActiveDrawerChange,
        runtimeDrawers,
        onActiveGlobalDrawersChange,
    ]);
    return runtimeDrawers;
}
function applyToolsDrawer(toolsProps, runtimeDrawers) {
    const drawers = [...runtimeDrawers.localBefore, ...runtimeDrawers.localAfter];
    if (drawers.length === 0 && toolsProps.disableDrawersMerge) {
        return null;
    }
    const toolsItem = getToolsDrawerItem(toolsProps);
    if (toolsItem) {
        drawers.unshift(toolsItem);
    }
    return drawers;
}
export const MIN_DRAWER_SIZE = 290;
export function useDrawers({ drawers, activeDrawerId: controlledActiveDrawerId, onDrawerChange, onGlobalDrawerFocus, onAddNewActiveDrawer, __disableRuntimeDrawers: disableRuntimeDrawers, }, ariaLabels, toolsProps) {
    var _a, _b, _c, _d;
    const [activeDrawerId = null, setActiveDrawerId] = useControllable(controlledActiveDrawerId, onDrawerChange, null, {
        componentName: 'AppLayout',
        controlledProp: 'activeDrawerId',
        changeHandler: 'onChange',
    });
    const [activeGlobalDrawersIds, setActiveGlobalDrawersIds] = useState([]);
    const [drawerSizes, setDrawerSizes] = useState({});
    // FIFO queue that keeps track of open drawers, where the first element is the most recently opened drawer
    const drawersOpenQueue = useRef([]);
    function onActiveDrawerResize({ id, size }) {
        setDrawerSizes(oldSizes => (Object.assign(Object.assign({}, oldSizes), { [id]: size })));
        fireNonCancelableEvent(activeDrawer === null || activeDrawer === void 0 ? void 0 : activeDrawer.onResize, { id, size });
        const activeGlobalDrawer = runtimeGlobalDrawers.find(drawer => drawer.id === id);
        fireNonCancelableEvent(activeGlobalDrawer === null || activeGlobalDrawer === void 0 ? void 0 : activeGlobalDrawer.onResize, { id, size });
    }
    function onActiveDrawerChange(newDrawerId) {
        setActiveDrawerId(newDrawerId);
        if (newDrawerId) {
            onAddNewActiveDrawer === null || onAddNewActiveDrawer === void 0 ? void 0 : onAddNewActiveDrawer(newDrawerId);
        }
        if (hasOwnDrawers) {
            fireNonCancelableEvent(onDrawerChange, { activeDrawerId: newDrawerId });
        }
        else if (!toolsProps.toolsHide) {
            toolsProps.onToolsToggle(newDrawerId === TOOLS_DRAWER_ID);
        }
        if (newDrawerId) {
            drawersOpenQueue.current = [newDrawerId, ...drawersOpenQueue.current];
        }
        if (activeDrawerId) {
            drawersOpenQueue.current = drawersOpenQueue.current.filter(id => id !== activeDrawerId);
        }
    }
    function onActiveGlobalDrawersChange(drawerId) {
        if (activeGlobalDrawersIds.includes(drawerId)) {
            setActiveGlobalDrawersIds(currentState => currentState.filter(id => id !== drawerId));
            onGlobalDrawerFocus === null || onGlobalDrawerFocus === void 0 ? void 0 : onGlobalDrawerFocus(drawerId, false);
            drawersOpenQueue.current = drawersOpenQueue.current.filter(id => id !== drawerId);
        }
        else if (drawerId) {
            onAddNewActiveDrawer === null || onAddNewActiveDrawer === void 0 ? void 0 : onAddNewActiveDrawer(drawerId);
            setActiveGlobalDrawersIds(currentState => [drawerId, ...currentState].slice(0, DRAWERS_LIMIT));
            onGlobalDrawerFocus === null || onGlobalDrawerFocus === void 0 ? void 0 : onGlobalDrawerFocus(drawerId, true);
            drawersOpenQueue.current = [drawerId, ...drawersOpenQueue.current];
        }
    }
    const hasOwnDrawers = !!drawers;
    const runtimeDrawers = useRuntimeDrawers(disableRuntimeDrawers, activeDrawerId, onActiveDrawerChange, activeGlobalDrawersIds, onActiveGlobalDrawersChange, drawers !== null && drawers !== void 0 ? drawers : []);
    const { localBefore, localAfter, global: runtimeGlobalDrawers } = runtimeDrawers;
    const combinedLocalDrawers = drawers
        ? [...localBefore, ...drawers, ...localAfter]
        : applyToolsDrawer(toolsProps, runtimeDrawers);
    // support toolsOpen in runtime-drawers-only mode
    let activeDrawerIdResolved = (toolsProps === null || toolsProps === void 0 ? void 0 : toolsProps.toolsOpen) && !hasOwnDrawers ? TOOLS_DRAWER_ID : activeDrawerId;
    const activeDrawer = combinedLocalDrawers === null || combinedLocalDrawers === void 0 ? void 0 : combinedLocalDrawers.find(drawer => drawer.id === activeDrawerIdResolved);
    // ensure that id is only defined when the drawer exists
    activeDrawerIdResolved = (_a = activeDrawer === null || activeDrawer === void 0 ? void 0 : activeDrawer.id) !== null && _a !== void 0 ? _a : null;
    const activeGlobalDrawers = runtimeGlobalDrawers.filter(drawer => activeGlobalDrawersIds.includes(drawer.id));
    const activeDrawerSize = activeDrawerIdResolved
        ? (_c = (_b = drawerSizes[activeDrawerIdResolved]) !== null && _b !== void 0 ? _b : activeDrawer === null || activeDrawer === void 0 ? void 0 : activeDrawer.defaultSize) !== null && _c !== void 0 ? _c : toolsProps.toolsWidth
        : toolsProps.toolsWidth;
    const activeGlobalDrawersSizes = activeGlobalDrawersIds.reduce((acc, currentGlobalDrawerId) => {
        var _a, _b;
        const currentGlobalDrawer = runtimeGlobalDrawers.find(drawer => drawer.id === currentGlobalDrawerId);
        return Object.assign(Object.assign({}, acc), { [currentGlobalDrawerId]: (_b = (_a = drawerSizes[currentGlobalDrawerId]) !== null && _a !== void 0 ? _a : currentGlobalDrawer === null || currentGlobalDrawer === void 0 ? void 0 : currentGlobalDrawer.defaultSize) !== null && _b !== void 0 ? _b : MIN_DRAWER_SIZE });
    }, {});
    const minGlobalDrawersSizes = runtimeGlobalDrawers.reduce((acc, globalDrawer) => {
        var _a;
        return Object.assign(Object.assign({}, acc), { [globalDrawer.id]: Math.min((_a = globalDrawer.defaultSize) !== null && _a !== void 0 ? _a : MIN_DRAWER_SIZE, MIN_DRAWER_SIZE) });
    }, {});
    const minDrawerSize = Math.min((toolsProps === null || toolsProps === void 0 ? void 0 : toolsProps.toolsOpen) ? toolsProps.toolsWidth : (_d = activeDrawer === null || activeDrawer === void 0 ? void 0 : activeDrawer.defaultSize) !== null && _d !== void 0 ? _d : MIN_DRAWER_SIZE, MIN_DRAWER_SIZE);
    return {
        ariaLabelsWithDrawers: ariaLabels,
        drawers: combinedLocalDrawers || undefined,
        activeDrawer,
        activeDrawerId: activeDrawerIdResolved,
        globalDrawers: runtimeGlobalDrawers,
        activeGlobalDrawers: activeGlobalDrawers,
        activeGlobalDrawersIds,
        activeGlobalDrawersSizes,
        activeDrawerSize,
        minDrawerSize,
        minGlobalDrawersSizes,
        drawerSizes,
        drawersOpenQueue: drawersOpenQueue.current,
        onActiveDrawerChange,
        onActiveDrawerResize,
        onActiveGlobalDrawersChange,
    };
}
//# sourceMappingURL=use-drawers.js.map