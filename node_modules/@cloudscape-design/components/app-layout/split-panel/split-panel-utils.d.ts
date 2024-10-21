/**
 * The Split Panel will be in forced (bottom) position if the defined minimum width is
 * greater than the maximum width. In other words, the maximum width is the currently
 * available horizontal space based on all other components that are rendered. If the
 * minimum width exceeds this value then there is not enough horizontal space and we must
 * force it to the bottom position.
 */
export declare function checkSplitPanelForcedPosition({ isMobile, splitPanelMaxWidth, }: {
    isMobile: boolean;
    splitPanelMaxWidth: number;
}): boolean;
//# sourceMappingURL=split-panel-utils.d.ts.map