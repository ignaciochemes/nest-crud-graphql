import { Injectable } from "@nestjs/common";
import { ProjectDao } from "src/Daos/ProjectDao";

@Injectable()
export class ProjectServices {
    constructor(private readonly _projectDao: ProjectDao) { }

    async getProjects(): Promise<any> {
        return { pedra: "pedra" }
        const response = await this._projectDao.getProjects();
        return response;
    }
}