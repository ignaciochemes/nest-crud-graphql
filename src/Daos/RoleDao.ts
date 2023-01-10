import { InjectRepository } from "@nestjs/typeorm";
import { Role } from "src/Models/Entities/RoleEntity";
import { Repository } from "typeorm";

export class RoleDao {
    constructor(@InjectRepository(Role) private readonly _roleRepository: Repository<Role>) { }

    async createRole(data: Role): Promise<Role> {
        return await this._roleRepository.save(data);
    }

    async getRoles(): Promise<Role[]> {
        const pepe = await this._roleRepository.find();
        return pepe;
    }

    async getRoleByDescription(description: string): Promise<Role> {
        const query = this._roleRepository.createQueryBuilder('role')
            .where('role.description = :description', { description: description })
            .getOne();
        return query;
    }
}