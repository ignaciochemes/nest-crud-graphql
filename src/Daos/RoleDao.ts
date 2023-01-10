import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Role } from "src/Models/Entities/RoleEntity";
import { Repository } from "typeorm";

@Injectable()
export class RoleDao {
    constructor(@InjectRepository(Role) private readonly _roleRepository: Repository<Role>) { }

    async createRole(data: Role): Promise<Role> {
        return await this._roleRepository.save(data);
    }

    async getRoles(): Promise<Role[]> {
        const pepe = await this._roleRepository.find();
        return pepe;
    }

    async getRoleByName(name: string): Promise<Role> {
        const query = this._roleRepository.createQueryBuilder('role')
            .where('role.name = :name', { name: name })
            .getOne();
        return query;
    }

    async getRoleById(id: number): Promise<Role> {
        const query = this._roleRepository.createQueryBuilder('role')
            .where('role.id = :id', { id: id })
            .getOne();
        return query;
    }
}