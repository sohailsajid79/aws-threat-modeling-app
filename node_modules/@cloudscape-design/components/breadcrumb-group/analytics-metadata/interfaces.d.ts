import { LabelIdentifier } from '@cloudscape-design/component-toolkit/internal/analytics-metadata';
export interface GeneratedAnalyticsMetadataBreadcrumbGroupClick {
    action: 'click';
    detail: {
        label: string;
        position: string;
        href: string;
    };
}
export interface GeneratedAnalyticsMetadataBreadcrumbGroupExpand {
    action: 'expand';
    detail: {
        label: string;
        expanded: string;
    };
}
export interface GeneratedAnalyticsMetadataBreadcrumbGroupComponent {
    name: 'awsui.BreadcrumbGroup';
    label: string | LabelIdentifier;
}
//# sourceMappingURL=interfaces.d.ts.map