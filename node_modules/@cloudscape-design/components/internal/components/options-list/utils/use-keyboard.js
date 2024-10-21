// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
import { useCallback } from 'react';
import { KeyCode } from '../../../keycode';
const HOME = 36;
const END = 35;
export const useMenuKeyboard = ({ goUp, goDown, selectOption, goHome, goEnd, closeDropdown, preventNativeSpace = false, }) => {
    return useCallback((e) => {
        switch (e.detail.keyCode) {
            case KeyCode.up:
                e.preventDefault();
                goUp();
                break;
            case KeyCode.down:
                e.preventDefault();
                goDown();
                break;
            case HOME:
                goHome();
                break;
            case END:
                goEnd();
                break;
            case KeyCode.escape:
                e.stopPropagation();
                closeDropdown();
                break;
            case KeyCode.enter:
                e.preventDefault();
                selectOption();
                break;
            case KeyCode.space:
                if (preventNativeSpace) {
                    e.preventDefault();
                    selectOption();
                }
        }
    }, [selectOption, goHome, goEnd, closeDropdown, preventNativeSpace, goUp, goDown]);
};
export const useTriggerKeyboard = ({ openDropdown, goHome }) => {
    return useCallback((e) => {
        switch (e.detail.keyCode) {
            case KeyCode.up:
            case KeyCode.down:
                e.preventDefault();
                goHome();
                openDropdown();
                break;
            case KeyCode.space:
            case KeyCode.enter:
                e.preventDefault();
                openDropdown();
                break;
        }
    }, [openDropdown, goHome]);
};
//# sourceMappingURL=use-keyboard.js.map