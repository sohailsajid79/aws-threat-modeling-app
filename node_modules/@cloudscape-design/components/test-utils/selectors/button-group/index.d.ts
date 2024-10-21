import { ComponentWrapper, ElementWrapper } from "@cloudscape-design/test-utils-core/selectors";
import ButtonWrapper from '../button/index.js';
import ButtonDropdownWrapper from '../button-dropdown/index.js';
export default class ButtonGroupWrapper extends ComponentWrapper {
    static rootSelector: string;
    /**
     * Finds all button and menu items.
     */
    findItems(): import("@cloudscape-design/test-utils-core/selectors").MultiElementWrapper<ElementWrapper>;
    /**
     * Finds a button item by its id.
     */
    findButtonById(id: string): ButtonWrapper;
    /**
     * Finds a menu item by its id.
     */
    findMenuById(id: string): ButtonDropdownWrapper;
    /**
     * Finds the currently opened tooltip.
     */
    findTooltip(): ElementWrapper;
}
