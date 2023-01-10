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

    private async _roleSelector(data: number[]): Promise<Role[]> {
        const roles: Role[] = [];
        const findRoles: Role[] = await this._roleDao.getRoles();
        findRoles.forEach((role: Role) => {
            if (data.includes(role.id)) {
                roles.push(role);
            }
        });
        if (roles.length === 0) {
            throw new HttpCustomException("Roles not found", StatusCodeEnums.ROLES_NOT_FOUND);
        } else if (roles.length !== data.length) {
            throw new HttpCustomException("Some role not found", StatusCodeEnums.SOME_ROLE_NOT_FOUND);
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
        if (projects.length === 0) {
            throw new HttpCustomException("Projects not found", StatusCodeEnums.PROJECTS_NOT_FOUND);
        } else if (projects.length !== data.length) {
            throw new HttpCustomException("Some project not found", StatusCodeEnums.SOME_PROJECT_NOT_FOUND);
        }
        return projects;
    }

}