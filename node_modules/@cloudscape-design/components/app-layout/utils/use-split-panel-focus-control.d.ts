import { DependencyList, RefObject } from 'react';
import { Focusable } from './use-focus-control';
export type SplitPanelLastInteraction = {
    type: 'open';
} | {
    type: 'close';
} | {
    type: 'position';
};
export interface SplitPanelFocusControlRefs {
    toggle: RefObject<Focusable>;
    slider: RefObject<HTMLDivElement>;
    preferences: RefObject<Focusable>;
}
export interface SplitPanelFocusControlState {
    refs: SplitPanelFocusControlRefs;
    setLastInteraction: (interaction: SplitPanelLastInteraction) => void;
}
export declare function useSplitPanelFocusControl(dependencies: DependencyList): SplitPanelFocusControlState;
//# sourceMappingURL=use-split-panel-focus-control.d.ts.map