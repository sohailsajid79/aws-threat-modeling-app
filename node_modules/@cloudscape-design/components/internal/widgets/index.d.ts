/// <reference types="react" />
type FunctionComponent<Props> = (props: Props) => JSX.Element;
export declare function createWidgetizedComponent<Component extends FunctionComponent<any>>(Implementation: Component): (Loader?: Component) => Component;
export {};
//# sourceMappingURL=index.d.ts.map