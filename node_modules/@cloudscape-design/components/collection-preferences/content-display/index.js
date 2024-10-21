// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
import React, { useMemo, useState } from 'react';
import { DndContext, DragOverlay } from '@dnd-kit/core';
import { arrayMove, SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import InternalBox from '../../box/internal';
import InternalButton from '../../button/internal';
import { useInternalI18n } from '../../i18n/context';
import Portal from '../../internal/components/portal';
import { useUniqueId } from '../../internal/hooks/use-unique-id';
import InternalSpaceBetween from '../../space-between/internal';
import InternalTextFilter from '../../text-filter/internal';
import { getAnalyticsInnerContextAttribute } from '../analytics-metadata/utils';
import ContentDisplayOption from './content-display-option';
import DraggableOption from './draggable-option';
import useDragAndDropReorder from './use-drag-and-drop-reorder';
import useLiveAnnouncements from './use-live-announcements';
import { getFilteredOptions, getSortedOptions } from './utils';
import styles from '../styles.css.js';
const componentPrefix = 'content-display';
const getClassName = (suffix) => styles[`${componentPrefix}-${suffix}`];
export default function ContentDisplayPreference({ title, description, options, value = options.map(({ id }) => ({
    id,
    visible: true,
})), onChange, liveAnnouncementDndStarted, liveAnnouncementDndItemReordered, liveAnnouncementDndItemCommitted, liveAnnouncementDndDiscarded, dragHandleAriaDescription, dragHandleAriaLabel, enableColumnFiltering = false, i18nStrings, }) {
    const idPrefix = useUniqueId(componentPrefix);
    const i18n = useInternalI18n('collection-preferences');
    const [columnFilteringText, setColumnFilteringText] = useState('');
    const titleId = `${idPrefix}-title`;
    const descriptionId = `${idPrefix}-description`;
    const [sortedOptions, sortedAndFilteredOptions] = useMemo(() => {
        const sorted = getSortedOptions({ options, contentDisplay: value });
        const filtered = getFilteredOptions(sorted, columnFilteringText);
        return [sorted, filtered];
    }, [columnFilteringText, options, value]);
    const onToggle = (option) => {
        // We use sortedOptions as base and not value because there might be options that
        // are not in the value yet, so they're added as non-visible after the known ones.
        onChange(sortedOptions.map(({ id, visible }) => ({ id, visible: id === option.id ? !option.visible : visible })));
    };
    const { activeItem, collisionDetection, handleKeyDown, sensors, setActiveItem } = useDragAndDropReorder({
        sortedOptions: sortedAndFilteredOptions,
    });
    const activeOption = activeItem ? sortedAndFilteredOptions.find(({ id }) => id === activeItem) : null;
    const announcements = useLiveAnnouncements({
        isDragging: activeItem !== null,
        liveAnnouncementDndStarted: i18n('contentDisplayPreference.liveAnnouncementDndStarted', liveAnnouncementDndStarted, format => (position, total) => format({ position, total })),
        liveAnnouncementDndItemReordered: i18n('contentDisplayPreference.liveAnnouncementDndItemReordered', liveAnnouncementDndItemReordered, format => (initialPosition, currentPosition, total) => format({ currentPosition, total, isInitialPosition: `${initialPosition === currentPosition}` })),
        liveAnnouncementDndItemCommitted: i18n('contentDisplayPreference.liveAnnouncementDndItemCommitted', liveAnnouncementDndItemCommitted, format => (initialPosition, finalPosition, total) => format({ initialPosition, finalPosition, total, isInitialPosition: `${initialPosition === finalPosition}` })),
        liveAnnouncementDndDiscarded: i18n('contentDisplayPreference.liveAnnouncementDndDiscarded', liveAnnouncementDndDiscarded),
        sortedOptions: sortedAndFilteredOptions,
    });
    const renderedDragHandleAriaDescription = i18n('contentDisplayPreference.dragHandleAriaDescription', dragHandleAriaDescription);
    return (React.createElement("div", Object.assign({ className: styles[componentPrefix] }, getAnalyticsInnerContextAttribute('contentDisplay')),
        React.createElement("h3", { className: getClassName('title'), id: titleId }, i18n('contentDisplayPreference.title', title)),
        React.createElement("p", { className: getClassName('description'), id: descriptionId }, i18n('contentDisplayPreference.description', description)),
        enableColumnFiltering && (React.createElement("div", { className: getClassName('text-filter') },
            React.createElement(InternalTextFilter, { filteringText: columnFilteringText, filteringPlaceholder: i18n('contentDisplayPreference.i18nStrings.columnFilteringPlaceholder', i18nStrings === null || i18nStrings === void 0 ? void 0 : i18nStrings.columnFilteringPlaceholder), filteringAriaLabel: i18n('contentDisplayPreference.i18nStrings.columnFilteringAriaLabel', i18nStrings === null || i18nStrings === void 0 ? void 0 : i18nStrings.columnFilteringAriaLabel), filteringClearAriaLabel: i18n('contentDisplayPreference.i18nStrings.columnFilteringClearFilterText', i18nStrings === null || i18nStrings === void 0 ? void 0 : i18nStrings.columnFilteringClearFilterText), onChange: ({ detail }) => setColumnFilteringText(detail.filteringText), countText: i18n('contentDisplayPreference.i18nStrings.columnFilteringCountText', (i18nStrings === null || i18nStrings === void 0 ? void 0 : i18nStrings.columnFilteringCountText)
                    ? i18nStrings === null || i18nStrings === void 0 ? void 0 : i18nStrings.columnFilteringCountText(sortedAndFilteredOptions.length)
                    : undefined, format => format({ count: sortedAndFilteredOptions.length })) }))),
        sortedAndFilteredOptions.length === 0 && (React.createElement("div", { className: getClassName('no-match') },
            React.createElement(InternalSpaceBetween, { size: "s", alignItems: "center" },
                React.createElement(InternalBox, { margin: { top: 'm' } }, i18n('contentDisplayPreference.i18nStrings.columnFilteringNoMatchText', i18nStrings === null || i18nStrings === void 0 ? void 0 : i18nStrings.columnFilteringNoMatchText)),
                React.createElement(InternalButton, { onClick: () => setColumnFilteringText('') }, i18n('contentDisplayPreference.i18nStrings.columnFilteringClearFilterText', i18nStrings === null || i18nStrings === void 0 ? void 0 : i18nStrings.columnFilteringClearFilterText))))),
        React.createElement(DndContext, { sensors: sensors, collisionDetection: collisionDetection, accessibility: {
                announcements,
                restoreFocus: false,
                screenReaderInstructions: renderedDragHandleAriaDescription
                    ? { draggable: renderedDragHandleAriaDescription }
                    : undefined,
            }, onDragStart: ({ active }) => setActiveItem(active.id), onDragEnd: event => {
                setActiveItem(null);
                const { active, over } = event;
                if (over && active.id !== over.id) {
                    const oldIndex = sortedOptions.findIndex(({ id }) => id === active.id);
                    const newIndex = sortedOptions.findIndex(({ id }) => id === over.id);
                    // We need to remember to trim the options down to id and visible to emit changes.
                    onChange(arrayMove([...sortedOptions], oldIndex, newIndex).map(({ id, visible }) => ({ id, visible })));
                }
            }, onDragCancel: () => setActiveItem(null) },
            React.createElement("ul", { className: getClassName('option-list'), "aria-describedby": descriptionId, "aria-labelledby": titleId, role: "list" },
                React.createElement(SortableContext, { disabled: columnFilteringText.trim().length > 0, items: sortedAndFilteredOptions.map(({ id }) => id), strategy: verticalListSortingStrategy }, sortedAndFilteredOptions.map(option => {
                    return (React.createElement(DraggableOption, { dragHandleAriaLabel: i18n('contentDisplayPreference.dragHandleAriaLabel', dragHandleAriaLabel), key: option.id, onKeyDown: handleKeyDown, onToggle: onToggle, option: option }));
                }))),
            React.createElement(Portal, null,
                React.createElement(DragOverlay, { className: styles['drag-overlay'], dropAnimation: null, style: { zIndex: 5000 } }, activeOption && (React.createElement(ContentDisplayOption, { listeners: { onKeyDown: handleKeyDown }, dragHandleAriaLabel: i18n('contentDisplayPreference.dragHandleAriaLabel', dragHandleAriaLabel), onToggle: onToggle, option: activeOption })))))));
}
//# sourceMappingURL=index.js.map