import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Developer } from "src/Models/Entities/DeveloperEntity";
import { Repository } from "typeorm";

@Injectable()
export class DeveloperDao {
    constructor(@InjectRepository(Developer) private readonly _developerRepository: Repository<Developer>) { }

    async createDeveloper(data: Developer): Promise<Developer> {
        return await this._developerRepository.save(data);
    }

    async getDeveloperByEmail(email: string): Promise<Developer> {
        const query = this._developerRepository.createQueryBuilder("developer")
            .where("developer.email = :email", { email: email })
            .innerJoinAndSelect("developer.roles", "roles")
            .getOne();
        return query;
    }

}