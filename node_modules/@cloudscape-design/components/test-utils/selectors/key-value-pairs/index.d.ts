import { ComponentWrapper, ElementWrapper } from "@cloudscape-design/test-utils-core/selectors";
export declare class KeyValuePairsPairWrapper extends ComponentWrapper {
    findLabel(): ElementWrapper;
    findValue(): ElementWrapper;
    findInfo(): ElementWrapper;
}
export declare class KeyValuePairsItemWrapper extends KeyValuePairsPairWrapper {
    findGroupTitle(): ElementWrapper;
    findGroupPairs(): import("@cloudscape-design/test-utils-core/selectors").MultiElementWrapper<KeyValuePairsPairWrapper>;
}
export default class KeyValuePairsWrapper extends ComponentWrapper {
    static rootSelector: string;
    findItems(): import("@cloudscape-design/test-utils-core/selectors").MultiElementWrapper<KeyValuePairsItemWrapper>;
}
