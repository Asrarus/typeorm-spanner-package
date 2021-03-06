import { ObjectLiteral } from "../common/ObjectLiteral";
import { SaveOptions } from "../repository/SaveOptions";
import { RemoveOptions } from "../repository/RemoveOptions";
import { QueryRunner } from "../query-runner/QueryRunner";
import { Connection } from "../connection/Connection";
/**
 * Persists a single entity or multiple entities - saves or removes them.
 */
export declare class EntityPersistExecutor {
    protected connection: Connection;
    protected queryRunner: QueryRunner | undefined;
    protected mode: "save" | "remove";
    protected target: Function | string | undefined;
    protected entity: ObjectLiteral | ObjectLiteral[];
    protected options?: (SaveOptions & RemoveOptions) | undefined;
    constructor(connection: Connection, queryRunner: QueryRunner | undefined, mode: "save" | "remove", target: Function | string | undefined, entity: ObjectLiteral | ObjectLiteral[], options?: (SaveOptions & RemoveOptions) | undefined);
    /**
     * Executes persistence operation ob given entity or entities.
     */
    execute(): Promise<void>;
}
