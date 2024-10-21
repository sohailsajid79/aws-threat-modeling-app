import { DiagramEngine, PointModel } from '@projectstorm/react-diagrams-core';
import * as React from 'react';
import { MouseEvent } from 'react';
import { DefaultLinkModel } from './DefaultLinkModel';
export interface DefaultLinkProps {
    link: DefaultLinkModel;
    diagramEngine: DiagramEngine;
    pointAdded?: (point: PointModel, event: MouseEvent) => any;
    renderPoints?: boolean;
    selected?: (event: MouseEvent) => any;
}
export declare const DefaultLinkWidget: React.FC<DefaultLinkProps>;
