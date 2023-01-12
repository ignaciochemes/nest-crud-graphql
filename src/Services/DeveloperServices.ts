import { Injectable } from "@nestjs/common";
import { DeveloperDao } from "src/Daos/DeveloperDao";
import { ProjectDao } from "src/Daos/ProjectDao";
import { RoleDao } from "src/Daos/RoleDao";
import { StatusCodeEnums } from "src/Enums/StatusCodeEnums";
import { HttpCustomException } from "src/Exceptions/HttpCustomException";
import { Developer } from "src/Models/Entities/DeveloperEntity";
import { Project } from "src/Models/Entities/ProjectEntity";
import { Role } from "src/Models/Entities/RoleEntity";
import CreateDeveloperRequest from "src/Models/Request/DeveloperResolver/CreateDeveloperRequest";
import GetDeveloperByFiltersRequest from "src/Models/Request/DeveloperResolver/GetDeveloperByQueryRequest";

@Injectable()
export class DeveloperServices {
    constructor(
        private readonly _developerDao: DeveloperDao,
        private readonly _roleDao: RoleDao,
        private readonly _projectDao: ProjectDao
    ) { }

    async createDeveloper(data: CreateDeveloperRequest): Promise<Developer> {
        const findDeveloper: Developer = await this._developerDao.getDeveloperByEmail(data.email);
        if (findDeveloper) {
            throw new HttpCustomException("Developer already exists", StatusCodeEnums.DEVELOPER_ALREADY_EXISTS);
        }
        const roles: Role[] = await this._roleSelector(data.roles);
        const projects: Project[] = await this._projectSelector(data.projects);
        // No es performante, pero es la forma más sencilla de hacerlo... creo...
        projects.forEach((project: Project) => {
            const projectRoles: Role[] = project.getRoles();
            projectRoles.forEach((projectRole: Role) => {
                roles.forEach((role: Role) => {
                    if (projectRole.id !== role.id) {
                        throw new HttpCustomException("Developer roles not matched with project roles", StatusCodeEnums.DEVELOPER_ROLES_NOT_MATCHED_WITH_PROJECT_ROLES);
                    }
                })
            })
        });

        const newDeveloper = new Developer();
        newDeveloper.setName(data.name);
        newDeveloper.setEmail(data.email);
        newDeveloper.setProjects(projects);
        newDeveloper.setRoles(roles);
        await this._developerDao.createDeveloper(newDeveloper);
        return newDeveloper;
    }

    async getDevelopersByFilters(query: GetDeveloperByFiltersRequest): Promise<Developer[]> {
        if (Object.keys(query).length === 0) {
            return await this._developerDao.getAllDevelopers();
        }
        const developers: Developer[] = await this._developerDao.getDeveloperByFilters(query);
        return developers;
    }

    private async _roleSelector(data: number[]): Promise<Role[]> {
        const roles: Role[] = [];
        const findRoles: Role[] = await this._roleDao.getRoles();
        findRoles.forEach((role: Role) => {
            if (data.includes(role.id)) {
                roles.push(role);
            }
        });
        const difference: number[] = data.filter(x => !roles.map(y => y.id).includes(x));
        if (difference.length > 0) {
            throw new HttpCustomException("Some role not found", StatusCodeEnums.SOME_ROLE_NOT_FOUND);
        } else if (roles.length === 0) {
            throw new HttpCustomException("Roles not found", StatusCodeEnums.ROLES_NOT_FOUND);
        }
        return roles;
    }

    private async _projectSelector(data: number[]): Promise<Project[]> {
        const projects: Project[] = [];
        const findProjects: Project[] = await this._projectDao.getProjectWithRoles();
        findProjects.forEach((project: Project) => {
            if (data.includes(project.id)) {
                projects.push(project);
            }
        });
        const difference: number[] = data.filter(x => !projects.map(y => y.id).includes(x));
        if (difference.length > 0) {
            throw new HttpCustomException("Some project not found", StatusCodeEnums.SOME_PROJECT_NOT_FOUND);
        } else if (projects.length === 0) {
            throw new HttpCustomException("Projects not found", StatusCodeEnums.PROJECTS_NOT_FOUND);
        }
        return projects;
    }

}