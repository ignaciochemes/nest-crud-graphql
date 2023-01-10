import { Injectable } from "@nestjs/common";
import { ProjectDao } from "src/Daos/ProjectDao";
import { RoleDao } from "src/Daos/RoleDao";
import { ProjectStatusEnums } from "src/Enums/ProjectStatusEnums";
import { StatusCodeEnums } from "src/Enums/StatusCodeEnums";
import { HttpCustomException } from "src/Exceptions/HttpCustomException";
import { Project } from "src/Models/Entities/ProjectEntity";
import { Role } from "src/Models/Entities/RoleEntity";
import CreateProjectRequest from "src/Models/Request/ProjectResolver/CreateProjectRequest";
import GetProjectByFiltersRequest from "src/Models/Request/ProjectResolver/GetProjectByQueryRequest";
import { v4 as uuid } from "uuid";

@Injectable()
export class ProjectServices {
    constructor(
        private readonly _projectDao: ProjectDao,
        private readonly _roleDao: RoleDao,
    ) { }

    async createProject(data: CreateProjectRequest): Promise<any> {
        const findProjectByName = await this._projectDao.getProjectByName(data.name);
        if (findProjectByName) {
            throw new HttpCustomException("Project already exists", StatusCodeEnums.PROJECT_ALREADY_EXISTS);
        }
        if (!Object.keys(ProjectStatusEnums).includes(data.status)) {
            throw new HttpCustomException("Status not matched with enum", StatusCodeEnums.STATUS_NOT_MATCHED_WITH_ENUM);
        }
        const roles: Role[] = [];
        const findRoles: Role[] = await this._roleDao.getRoles();
        findRoles.forEach((role) => {
            if (data.roles.includes(role.id)) {
                roles.push(role);
            }
        });
        if (roles.length === 0) {
            throw new HttpCustomException("Roles not found", StatusCodeEnums.ROLES_NOT_FOUND);
        } else if (roles.length !== data.roles.length) {
            throw new HttpCustomException("Some role not found", StatusCodeEnums.SOME_ROLE_NOT_FOUND);
        }
        const newProject = new Project();
        newProject.setUuid(uuid());
        newProject.setName(data.name);
        newProject.setDescription(data.description);
        newProject.setStatus(data.status);
        newProject.setRoles(roles);
        await this._projectDao.createProject(newProject);
        return newProject;
    }

    async getProjects(): Promise<Project[]> {
        const findProjects: Project[] = await this._projectDao.getProjects();
        if (findProjects.length === 0) {
            throw new HttpCustomException("Projects not found", StatusCodeEnums.PROJECTS_NOT_FOUND);
        }
        return findProjects;
    }

    async getProjectByFilters(query: GetProjectByFiltersRequest): Promise<Project[]> {
        const findProjects: Project[] = await this._projectDao.getProjectByFilters(query);
        if (findProjects.length === 0) {
            throw new HttpCustomException("Projects not found", StatusCodeEnums.PROJECTS_NOT_FOUND);
        }
        return findProjects;
    }
}