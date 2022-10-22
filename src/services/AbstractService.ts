
import { AppDataSource } from "../data-source";
import {
    DeleteResult,
    EntityTarget,
    FindOptionsWhere,
    Repository,
    UpdateResult
} from "typeorm";
import { Request } from "express";

abstract class AbstractService<Entity> {
    protected readonly repository: Repository<Entity>;

    constructor(entity: EntityTarget<Entity>) {
        this.repository = AppDataSource.getRepository(entity);
    }

    async getAll(req: Request): Promise<Entity[]> {
        return await this.repository.find();
    }

    async create(data: Entity): Promise<Entity> {
        return await this.repository.save<Entity>(data);
    }

    async findById(id: string): Promise<Entity> {
        return await this.repository.findOneBy({ id } as FindOptionsWhere<any>);
    }

    async update(id: string, data: Entity): Promise<UpdateResult> {
        return await this.repository.update(id, data as FindOptionsWhere<any>);
    }

    async delete(id: string) {
        return await this.repository.softDelete(id);
    }

    async forceDelete(id: string): Promise<DeleteResult> {
        return await this.repository.delete({ id } as FindOptionsWhere<any>);
    }
}

export default AbstractService;
