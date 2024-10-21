/// <reference types="react" />
import { InternalBaseComponentProps } from '../internal/hooks/use-base-component';
import { HelpPanelProps } from './interfaces';
export type HelpPanelInternalProps = HelpPanelProps & InternalBaseComponentProps;
export declare function HelpPanelImplementation({ header, footer, children, loading, loadingText, __internalRootRef, ...restProps }: HelpPanelInternalProps): JSX.Element;
export declare const createWidgetizedHelpPanel: (Loader?: typeof HelpPanelImplementation | undefined) => typeof HelpPanelImplementation;
//# sourceMappingURL=implementation.d.ts.map