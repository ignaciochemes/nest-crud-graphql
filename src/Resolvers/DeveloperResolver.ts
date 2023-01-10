import { Args, Mutation, Resolver } from "@nestjs/graphql";
import { Developer } from "src/Models/Entities/DeveloperEntity";
import CreateDeveloperRequest from "src/Models/Request/DeveloperResolver/CreateDeveloperRequest";
import { DeveloperServices } from "src/Services/DeveloperServices";

@Resolver((of: any) => Developer)
export class DeveloperResolver {
    constructor(private readonly _developerServices: DeveloperServices) { }

    @Mutation(returns => Developer)
    async createDeveloper(
        @Args("developer") data: CreateDeveloperRequest
    ): Promise<Developer> {
        const response = await this._developerServices.createDeveloper(data);
        return response;
    }
}