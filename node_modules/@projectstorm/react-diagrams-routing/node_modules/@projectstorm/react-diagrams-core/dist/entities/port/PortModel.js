import _forEach from 'lodash/forEach';
import _isFinite from 'lodash/isFinite';
import _map from 'lodash/map';
import _size from 'lodash/size';
import _values from 'lodash/values';
import { Point, Rectangle } from '@projectstorm/geometry';
import { BasePositionModel } from '@projectstorm/react-canvas-core';
export var PortModelAlignment;
(function (PortModelAlignment) {
    PortModelAlignment["TOP"] = "top";
    PortModelAlignment["LEFT"] = "left";
    PortModelAlignment["BOTTOM"] = "bottom";
    PortModelAlignment["RIGHT"] = "right";
})(PortModelAlignment || (PortModelAlignment = {}));
export class PortModel extends BasePositionModel {
    constructor(options) {
        super(options);
        this.links = {};
        this.reportedPosition = false;
    }
    deserialize(event) {
        super.deserialize(event);
        this.reportedPosition = false;
        this.options.name = event.data.name;
        this.options.alignment = event.data.alignment;
    }
    serialize() {
        return Object.assign(Object.assign({}, super.serialize()), { name: this.options.name, alignment: this.options.alignment, parentNode: this.parent.getID(), links: _map(this.links, (link) => {
                return link.getID();
            }) });
    }
    setPosition(x, y) {
        let old = this.position;
        super.setPosition(x, y);
        _forEach(this.getLinks(), (link) => {
            let point = link.getPointForPort(this);
            point.setPosition(point.getX() + x - old.x, point.getY() + y - old.y);
        });
    }
    doClone(lookupTable = {}, clone) {
        clone.links = {};
        clone.parent = this.getParent().clone(lookupTable);
    }
    getNode() {
        return this.getParent();
    }
    getName() {
        return this.options.name;
    }
    getMaximumLinks() {
        return this.options.maximumLinks;
    }
    setMaximumLinks(maximumLinks) {
        this.options.maximumLinks = maximumLinks;
    }
    removeLink(link) {
        delete this.links[link.getID()];
    }
    addLink(link) {
        this.links[link.getID()] = link;
    }
    getLinks() {
        return this.links;
    }
    createLinkModel() {
        if (_isFinite(this.options.maximumLinks)) {
            var numberOfLinks = _size(this.links);
            if (this.options.maximumLinks === 1 && numberOfLinks >= 1) {
                return _values(this.links)[0];
            }
            else if (numberOfLinks >= this.options.maximumLinks) {
                return null;
            }
        }
        return null;
    }
    reportPosition() {
        _forEach(this.getLinks(), (link) => {
            link.getPointForPort(this).setPosition(this.getCenter());
        });
        this.fireEvent({
            entity: this
        }, 'reportInitialPosition');
    }
    getCenter() {
        return new Point(this.getX() + this.width / 2, this.getY() + this.height / 2);
    }
    getBoundingBox() {
        return Rectangle.fromPointAndSize(this.position, this.width, this.height);
    }
    updateCoords(coords) {
        this.width = coords.getWidth();
        this.height = coords.getHeight();
        this.setPosition(coords.getTopLeft());
        this.reportedPosition = true;
        this.reportPosition();
    }
    canLinkToPort(port) {
        return true;
    }
    isLocked() {
        return super.isLocked() || this.getParent().isLocked();
    }
}
//# sourceMappingURL=PortModel.js.map