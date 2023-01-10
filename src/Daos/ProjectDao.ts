import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Project } from "src/Models/Entities/ProjectEntity";
import { Repository } from "typeorm";

@Injectable()
export class ProjectDao {
    constructor(@InjectRepository(Project) private readonly _projectRepository: Repository<Project>) { }

    async getProjects(): Promise<Project[]> {
        const query = this._projectRepository.createQueryBuilder("project")
            .getMany();
        return query;
    }
}