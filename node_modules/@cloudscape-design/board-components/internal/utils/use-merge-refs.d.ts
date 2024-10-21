import { MutableRefObject, RefCallback } from "react";
/**
 * useMergeRefs merges multiple refs into a single ref callback.
 *
 * For example:
 *  const mergedRef = useMergeRefs(ref1, ref2, ref3)
 *  <div ref={refs}>...</div>
 */
export declare function useMergeRefs(...refs: Array<RefCallback<any> | MutableRefObject<any> | null | undefined>): ((value: any) => void) | null;
