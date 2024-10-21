import { ComponentWrapper, ElementWrapper } from '@cloudscape-design/test-utils-core/dom';
export declare class KeyValuePairsPairWrapper extends ComponentWrapper {
    findLabel(): ElementWrapper | null;
    findValue(): ElementWrapper | null;
    findInfo(): ElementWrapper | null;
}
export declare class KeyValuePairsItemWrapper extends KeyValuePairsPairWrapper {
    findGroupTitle(): ElementWrapper | null;
    findGroupPairs(): Array<KeyValuePairsPairWrapper> | null;
}
export default class KeyValuePairsWrapper extends ComponentWrapper {
    static rootSelector: string;
    findItems(): Array<KeyValuePairsItemWrapper>;
}
