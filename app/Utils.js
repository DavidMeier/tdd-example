function Utils() {}

Utils.prototype.flattenObject = function(object, separator) {
    if (object instanceof Array || object instanceof Function)
        throw new Error('Expected object!');

    return this._hasChildObjects(object) ? this._addFlattenedAttributes(object, separator) : object;
};

Utils.prototype.inflateObject = function(object, separator) {
    if (object instanceof Array || object instanceof Function)
        throw new Error('Expected object!');

    var inflated = object instanceof Object ? {} : null;

    for (var attr in object)
        this._addInflatedAttributes(inflated, attr, object[attr], separator);

    return inflated;
};

Utils.prototype._addFlattenedAttributes = function(object, separator, flattened, parentNames) {
    flattened = flattened || {};
    parentNames = parentNames || [];

    var newParents;
    for (var i in object) {
        newParents = parentNames.concat([i]);
        if (object[i] instanceof Object) {
            this._addFlattenedAttributes(object[i], separator, flattened, newParents);
        } else {
            flattened[newParents.join(separator)] = object[i];
        }
    }

    return flattened;
};

Utils.prototype._hasChildObjects = function(object) {
    var hasChildren = false;

    for (var attr in object)
        if (object[attr] instanceof Object)
            hasChildren = true;

    return hasChildren;
};

Utils.prototype._addInflatedAttributes = function(inflated, attr, value, separator) {
    var children = attr.split(separator),
        tempObj = inflated,
        childCount = children.length,
        attribute;

    for (var j = 0; j < childCount; j++) {
        attribute = children[j];
        if (this._isLastChild(j, childCount))
            tempObj[attribute] = value;
        else {
            if (!this._hasAttribute(tempObj, attribute))
                tempObj[attribute] = {};
            tempObj = tempObj[attribute];
        }
    }
};

Utils.prototype._isLastChild = function(child, count) {
    return child + 1 == count
};

Utils.prototype._hasAttribute = function(object, attribute) {
    return object[attribute] != undefined;
};