import * as tslib_1 from "tslib";
/**
 * Thrown when specified entity property in the find options were not found.
 */
var FindCriteriaNotFoundError = /** @class */ (function (_super) {
    tslib_1.__extends(FindCriteriaNotFoundError, _super);
    function FindCriteriaNotFoundError(propertyPath, metadata) {
        var _this = _super.call(this) || this;
        Object.setPrototypeOf(_this, FindCriteriaNotFoundError.prototype);
        _this.message = "Property \"" + propertyPath + "\" was not found in " + metadata.targetName + ". Make sure your query is correct.";
        return _this;
    }
    return FindCriteriaNotFoundError;
}(Error));
export { FindCriteriaNotFoundError };

//# sourceMappingURL=FindCriteriaNotFoundError.js.map
