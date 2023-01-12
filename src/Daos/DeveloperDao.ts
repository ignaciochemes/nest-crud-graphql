import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Developer } from "src/Models/Entities/DeveloperEntity";
import GetDeveloperByFiltersRequest from "src/Models/Request/DeveloperResolver/GetDeveloperByQueryRequest";
import { Repository } from "typeorm";

@Injectable()
export class DeveloperDao {
    constructor(@InjectRepository(Developer) private readonly _developerRepository: Repository<Developer>) { }

    async createDeveloper(data: Developer): Promise<Developer> {
        return await this._developerRepository.save(data);
    }

    async getDeveloperByEmail(email: string): Promise<Developer> {
        const query = this._developerRepository.createQueryBuilder("developer")
            .where("developer.email = :email", { email: email })
            .innerJoinAndSelect("developer.roles", "roles")
            .getOne();
        return query;
    }

    async getAllDevelopers(): Promise<Developer[]> {
        const query = this._developerRepository.createQueryBuilder("developer")
            .innerJoinAndSelect("developer.roles", "roles")
            .limit(100)
            .getMany();
        return query;
    }

    async getDeveloperByFilters(filters: GetDeveloperByFiltersRequest): Promise<Developer[]> {
        const query = this._developerRepository.createQueryBuilder("developer")
            .limit(filters.limit)
            .offset(filters.offset)

        if (filters.name) {
            query.andWhere("developer.name = :name", { name: filters.name });
        }
        if (filters.role) {
            query.innerJoinAndSelect("developer.roles", "roles")
                .andWhere("roles.name = :role", { role: filters.role });
        }
        if (filters.projectId) {
            query.innerJoinAndSelect("developer.projects", "projects")
                .andWhere("projects.id = :projectId", { projectId: filters.projectId });
        }
        if (filters.orderBy === "ASC") {
            query.orderBy("developer.createdAt", "ASC");
        } else if (filters.orderBy === "DESC") {
            query.orderBy("developer.createdAt", "DESC");
        }
        return query.getMany();
    }

}