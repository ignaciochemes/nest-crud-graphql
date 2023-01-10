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
        const findRoleByDescription = await this._roleDao.getRoleByDescription(data.description);
        if (findRoleByDescription) {
            throw new HttpCustomException("Role already exists", StatusCodeEnums.ROLE_ALREADY_EXISTS);
        }
        const newRole = new Role();
        newRole.setDescription(data.description);
        newRole.setEnable(data.enable);
        await this._roleDao.createRole(newRole);
        return newRole;
    }

    async getRoles(): Promise<Role[]> {
        return await this._roleDao.getRoles();
    }
}