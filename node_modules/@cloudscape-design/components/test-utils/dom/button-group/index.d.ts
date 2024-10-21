import { ComponentWrapper, ElementWrapper } from '@cloudscape-design/test-utils-core/dom';
import ButtonWrapper from '../button/index.js';
import ButtonDropdownWrapper from '../button-dropdown/index.js';
export default class ButtonGroupWrapper extends ComponentWrapper {
    static rootSelector: string;
    /**
     * Finds all button and menu items.
     */
    findItems(): Array<ElementWrapper>;
    /**
     * Finds a button item by its id.
     */
    findButtonById(id: string): null | ButtonWrapper;
    /**
     * Finds a menu item by its id.
     */
    findMenuById(id: string): null | ButtonDropdownWrapper;
    /**
     * Finds the currently opened tooltip.
     */
    findTooltip(): null | ElementWrapper;
}
