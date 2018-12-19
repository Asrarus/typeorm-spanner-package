var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
import { QueryBuilder } from "./QueryBuilder";
import { SqlServerDriver } from "../driver/sqlserver/SqlServerDriver";
import { PostgresDriver } from "../driver/postgres/PostgresDriver";
import { DeleteResult } from "./result/DeleteResult";
import { ReturningStatementNotSupportedError } from "../error/ReturningStatementNotSupportedError";
import { SqljsDriver } from "../driver/sqljs/SqljsDriver";
import { BroadcasterResult } from "../subscriber/BroadcasterResult";
import { EntitySchema } from "../index";
import { ObserverExecutor } from "../observer/ObserverExecutor";
/**
 * Allows to build complex sql queries in a fashion way and execute those queries.
 */
var DeleteQueryBuilder = /** @class */ (function (_super) {
    __extends(DeleteQueryBuilder, _super);
    // -------------------------------------------------------------------------
    // Constructor
    // -------------------------------------------------------------------------
    function DeleteQueryBuilder(connectionOrQueryBuilder, queryRunner) {
        var _this = _super.call(this, connectionOrQueryBuilder, queryRunner) || this;
        _this.expressionMap.aliasNamePrefixingEnabled = false;
        return _this;
    }
    // -------------------------------------------------------------------------
    // Public Implemented Methods
    // -------------------------------------------------------------------------
    /**
     * Gets generated sql query without parameters being replaced.
     */
    DeleteQueryBuilder.prototype.getQuery = function () {
        var sql = this.createDeleteExpression();
        return sql.trim();
    };
    /**
     * Executes sql generated by query builder and returns raw database results.
     */
    DeleteQueryBuilder.prototype.execute = function () {
        return __awaiter(this, void 0, void 0, function () {
            var queryRunner, transactionStartedByUs, broadcastResult, deleteResult, _a, broadcastResult, error_1, rollbackError_1;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        queryRunner = this.obtainQueryRunner();
                        transactionStartedByUs = false;
                        _b.label = 1;
                    case 1:
                        _b.trys.push([1, 13, 18, 23]);
                        if (!(this.expressionMap.useTransaction === true && queryRunner.isTransactionActive === false)) return [3 /*break*/, 3];
                        return [4 /*yield*/, queryRunner.startTransaction()];
                    case 2:
                        _b.sent();
                        transactionStartedByUs = true;
                        _b.label = 3;
                    case 3:
                        if (!(this.expressionMap.callListeners === true && this.expressionMap.mainAlias.hasMetadata)) return [3 /*break*/, 5];
                        broadcastResult = new BroadcasterResult();
                        queryRunner.broadcaster.broadcastBeforeRemoveEvent(broadcastResult, this.expressionMap.mainAlias.metadata);
                        if (!(broadcastResult.promises.length > 0)) return [3 /*break*/, 5];
                        return [4 /*yield*/, Promise.all(broadcastResult.promises)];
                    case 4:
                        _b.sent();
                        _b.label = 5;
                    case 5:
                        deleteResult = new DeleteResult();
                        _a = deleteResult;
                        return [4 /*yield*/, queryRunner.queryByBuilder(this)];
                    case 6:
                        _a.raw = _b.sent();
                        if (!(this.expressionMap.callListeners === true && this.expressionMap.mainAlias.hasMetadata)) return [3 /*break*/, 8];
                        broadcastResult = new BroadcasterResult();
                        queryRunner.broadcaster.broadcastAfterRemoveEvent(broadcastResult, this.expressionMap.mainAlias.metadata);
                        if (!(broadcastResult.promises.length > 0)) return [3 /*break*/, 8];
                        return [4 /*yield*/, Promise.all(broadcastResult.promises)];
                    case 7:
                        _b.sent();
                        _b.label = 8;
                    case 8:
                        if (!transactionStartedByUs) return [3 /*break*/, 10];
                        return [4 /*yield*/, queryRunner.commitTransaction()];
                    case 9:
                        _b.sent();
                        _b.label = 10;
                    case 10:
                        if (!this.expressionMap.callObservers) return [3 /*break*/, 12];
                        if (!(transactionStartedByUs || (this.expressionMap.useTransaction === false && queryRunner.isTransactionActive === false))) return [3 /*break*/, 12];
                        return [4 /*yield*/, new ObserverExecutor(this.connection.observers).execute()];
                    case 11:
                        _b.sent();
                        _b.label = 12;
                    case 12: return [2 /*return*/, deleteResult];
                    case 13:
                        error_1 = _b.sent();
                        if (!transactionStartedByUs) return [3 /*break*/, 17];
                        _b.label = 14;
                    case 14:
                        _b.trys.push([14, 16, , 17]);
                        return [4 /*yield*/, queryRunner.rollbackTransaction()];
                    case 15:
                        _b.sent();
                        return [3 /*break*/, 17];
                    case 16:
                        rollbackError_1 = _b.sent();
                        return [3 /*break*/, 17];
                    case 17: throw error_1;
                    case 18:
                        if (!(queryRunner !== this.queryRunner)) return [3 /*break*/, 20];
                        return [4 /*yield*/, queryRunner.release()];
                    case 19:
                        _b.sent();
                        _b.label = 20;
                    case 20:
                        if (!(this.connection.driver instanceof SqljsDriver && !queryRunner.isTransactionActive)) return [3 /*break*/, 22];
                        return [4 /*yield*/, this.connection.driver.autoSave()];
                    case 21:
                        _b.sent();
                        _b.label = 22;
                    case 22: return [7 /*endfinally*/];
                    case 23: return [2 /*return*/];
                }
            });
        });
    };
    // -------------------------------------------------------------------------
    // Public Methods
    // -------------------------------------------------------------------------
    /**
     * Specifies FROM which entity's table select/update/delete will be executed.
     * Also sets a main string alias of the selection data.
     */
    DeleteQueryBuilder.prototype.from = function (entityTarget, aliasName) {
        entityTarget = entityTarget instanceof EntitySchema ? entityTarget.options.name : entityTarget;
        var mainAlias = this.createFromAlias(entityTarget, aliasName);
        this.expressionMap.setMainAlias(mainAlias);
        return this;
    };
    /**
     * Sets WHERE condition in the query builder.
     * If you had previously WHERE expression defined,
     * calling this function will override previously set WHERE conditions.
     * Additionally you can add parameters used in where expression.
     */
    DeleteQueryBuilder.prototype.where = function (where, parameters) {
        this.expressionMap.wheres = []; // don't move this block below since computeWhereParameter can add where expressions
        var condition = this.computeWhereParameter(where);
        if (condition)
            this.expressionMap.wheres = [{ type: "simple", condition: condition }];
        if (parameters)
            this.setParameters(parameters);
        return this;
    };
    /**
     * Adds new AND WHERE condition in the query builder.
     * Additionally you can add parameters used in where expression.
     */
    DeleteQueryBuilder.prototype.andWhere = function (where, parameters) {
        this.expressionMap.wheres.push({ type: "and", condition: this.computeWhereParameter(where) });
        if (parameters)
            this.setParameters(parameters);
        return this;
    };
    /**
     * Adds new OR WHERE condition in the query builder.
     * Additionally you can add parameters used in where expression.
     */
    DeleteQueryBuilder.prototype.orWhere = function (where, parameters) {
        this.expressionMap.wheres.push({ type: "or", condition: this.computeWhereParameter(where) });
        if (parameters)
            this.setParameters(parameters);
        return this;
    };
    /**
     * Adds new AND WHERE with conditions for the given ids.
     */
    DeleteQueryBuilder.prototype.whereInIds = function (ids) {
        return this.where(this.createWhereIdsExpression(ids));
    };
    /**
     * Adds new AND WHERE with conditions for the given ids.
     */
    DeleteQueryBuilder.prototype.andWhereInIds = function (ids) {
        return this.andWhere(this.createWhereIdsExpression(ids));
    };
    /**
     * Adds new OR WHERE with conditions for the given ids.
     */
    DeleteQueryBuilder.prototype.orWhereInIds = function (ids) {
        return this.orWhere(this.createWhereIdsExpression(ids));
    };
    /**
     * Optional returning/output clause.
     */
    DeleteQueryBuilder.prototype.output = function (output) {
        return this.returning(output);
    };
    /**
     * Optional returning/output clause.
     */
    DeleteQueryBuilder.prototype.returning = function (returning) {
        // not all databases support returning/output cause
        if (!this.connection.driver.isReturningSqlSupported())
            throw new ReturningStatementNotSupportedError();
        this.expressionMap.returning = returning;
        return this;
    };
    // -------------------------------------------------------------------------
    // Protected Methods
    // -------------------------------------------------------------------------
    /**
     * Creates DELETE express used to perform query.
     */
    DeleteQueryBuilder.prototype.createDeleteExpression = function () {
        var tableName = this.getTableName(this.getMainTableName());
        var whereExpression = this.createWhereExpression();
        var returningExpression = this.createReturningExpression();
        if (returningExpression && this.connection.driver instanceof PostgresDriver) {
            return "DELETE FROM " + tableName + whereExpression + " RETURNING " + returningExpression;
        }
        else if (returningExpression !== "" && this.connection.driver instanceof SqlServerDriver) {
            return "DELETE FROM " + tableName + " OUTPUT " + returningExpression + whereExpression;
        }
        else {
            return "DELETE FROM " + tableName + whereExpression;
        }
    };
    return DeleteQueryBuilder;
}(QueryBuilder));
export { DeleteQueryBuilder };

//# sourceMappingURL=DeleteQueryBuilder.js.map