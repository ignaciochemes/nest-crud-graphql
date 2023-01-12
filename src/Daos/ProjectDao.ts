import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Project } from "src/Models/Entities/ProjectEntity";
import GetProjectByFiltersRequest from "src/Models/Request/ProjectResolver/GetProjectByQueryRequest";
import { Repository } from "typeorm";

@Injectable()
export class ProjectDao {
    constructor(@InjectRepository(Project) private readonly _projectRepository: Repository<Project>) { }

    async getProjectByName(name: string): Promise<Project> {
        const query = this._projectRepository.createQueryBuilder("project")
            .where("project.name = :name", { name })
            .getOne();
        return query;
    }

    async getAllProjects(): Promise<Project[]> {
        const query = this._projectRepository.createQueryBuilder("project")
            .limit(100)
            .getMany();
        return query;
    }

    async getProjectWithRoles(): Promise<Project[]> {
        const query = this._projectRepository.createQueryBuilder("project")
            .innerJoinAndSelect("project.roles", "roles")
            .getMany();
        return query;
    }

    async getProjectById(id: number): Promise<Project> {
        const query = this._projectRepository.createQueryBuilder("project")
            .where("project.id = :id", { id })
            .innerJoinAndSelect("project.roles", "roles")
            .getOne();
        return query;
    }

    async createProject(data: Project): Promise<Project> {
        return await this._projectRepository.save(data);
    }

    async getProjectByFilters(filters: GetProjectByFiltersRequest): Promise<Project[]> {
        const query = this._projectRepository.createQueryBuilder("project")
            .limit(filters.limit)
            .offset(filters.offset)

        if (filters.name) {
            query.andWhere("project.name = :name", { name: filters.name });
        }
        if (filters.uuid) {
            query.andWhere("project.uuid = :uuid", { uuid: filters.uuid });
        }
        if (filters.description) {
            query.andWhere("project.description = :description", { description: filters.description });
        }
        if (filters.status) {
            query.andWhere("project.status = :status", { status: filters.status });
        }
        if (filters.role) {
            query.andWhere("project.role = :role", { role: filters.role });
        }
        if (filters.orderBy === "ASC") {
            query.orderBy("project.createdAt", "ASC");
        } else if (filters.orderBy === "DESC") {
            query.orderBy("project.createdAt", "DESC");
        }
        if (filters.completed) {
            query.innerJoinAndSelect("project.roles", "role")
        }

        return await query.getMany();
    }
}