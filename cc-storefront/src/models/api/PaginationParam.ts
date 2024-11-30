import { Entity } from "@/models/Entity";


export class PaginationParam extends Entity {
    limit: number;
    skip: number;
    constructor({ limit, skip }: { limit: number; skip: number; }) {
        super();
        this.limit = limit;
        this.skip = skip;
    }
}
