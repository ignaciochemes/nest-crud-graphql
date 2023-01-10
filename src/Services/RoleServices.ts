import { Injectable } from "@nestjs/common";
import { RoleDao } from "src/Daos/RoleDao";
import { StatusCodeEnums } from "src/Enums/StatusCodeEnums";
import { HttpCustomException } from "src/Exceptions/HttpCustomException";
import { Role } from "src/Models/Entities/RoleEntity";
import CreateRoleRequest from "src/Models/Request/RoleResolver/CreateRoleRequest";

@Injectable()
export class RoleServices {
    constructor(private readonly _roleDao: RoleDao) { }


    async createRole(data: CreateRoleRequest): Promise<Role> {
        const findRoleByDescription = await this._roleDao.getRoleByName(data.name);
        if (findRoleByDescription) {
            throw new HttpCustomException("Role already exists", StatusCodeEnums.ROLE_ALREADY_EXISTS);
        }
        const newRole = new Role();
        newRole.setName(data.name);
        await this._roleDao.createRole(newRole);
        return newRole;
    }

    async getRoles(): Promise<Role[]> {
        const findRoles = await this._roleDao.getRoles();
        if (findRoles.length === 0) {
            throw new HttpCustomException("Roles not found", StatusCodeEnums.ROLES_NOT_FOUND);
        }
        return findRoles;
    }

    async getRoleById(id: number): Promise<Role> {
        const findRole = await this._roleDao.getRoleById(id);
        if (!findRole) {
            throw new HttpCustomException("Role not found", StatusCodeEnums.ROLE_NOT_FOUND);
        }
        return findRole;
    }
}