import { MutableRefObject } from "react";
import { ComponentConfiguration } from "@cloudscape-design/component-toolkit/internal";
export interface InternalBaseComponentProps {
    __internalRootRef?: MutableRefObject<any> | null;
}
/**
 * This hook is used for components which are exported to customers. The returned __internalRootRef needs to be
 * attached to the (internal) component's root DOM node. The hook takes care of attaching the metadata to this
 * root DOM node and emits the telemetry for this component.
 */
export default function useBaseComponent<T = any>(componentName: string, config?: ComponentConfiguration): {
    __internalRootRef: import("react").RefObject<T>;
};
