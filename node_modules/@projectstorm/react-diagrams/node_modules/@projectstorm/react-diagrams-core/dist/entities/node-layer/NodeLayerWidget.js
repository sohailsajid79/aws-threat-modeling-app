import * as React from 'react';
import _map from 'lodash/map';
import { NodeWidget } from '../node/NodeWidget';
export class NodeLayerWidget extends React.Component {
    render() {
        return (React.createElement(React.Fragment, null, _map(this.props.layer.getNodes(), (node) => {
            return React.createElement(NodeWidget, { key: node.getID(), diagramEngine: this.props.engine, node: node });
        })));
    }
}
//# sourceMappingURL=NodeLayerWidget.js.map