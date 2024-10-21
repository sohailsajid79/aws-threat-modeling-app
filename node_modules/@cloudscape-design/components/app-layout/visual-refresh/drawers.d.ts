/// <reference types="react" />
/**
 * The VISIBLE_MOBILE_TOOLBAR_TRIGGERS_LIMIT is used to reduce the number
 * of triggers that are initially visible on the mobile toolbar, the rest
 * are then placed into an overflow menu
 *
 * Note if one of the triggers is for a split-panel, it would not count that
 */
export declare const VISIBLE_MOBILE_TOOLBAR_TRIGGERS_LIMIT = 2;
/**
 * The Drawers root component is mounted in the AppLayout index file. It will only
 * render if the drawers are defined, and it will take over the mounting of and
 * rendering of the Tools and SplitPanel (side position) if they exist. If drawers
 * do not exist then the Tools and SplitPanel will be handled by the Tools component.
 */
export default function Drawers(): JSX.Element | null;
/**
 * The MobileTriggers will be mounted inside of the AppBar component and
 * only rendered when Drawers are defined in mobile viewports. The same logic
 * will in the AppBar component will suppress the rendering of the legacy
 * trigger button for the Tools drawer.
 */
export declare function MobileTriggers(): JSX.Element | null;
//# sourceMappingURL=drawers.d.ts.map