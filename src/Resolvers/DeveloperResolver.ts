import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";
import { Developer } from "src/Models/Entities/DeveloperEntity";
import CreateDeveloperRequest from "src/Models/Request/DeveloperResolver/CreateDeveloperRequest";
import GetDeveloperByFiltersRequest from "src/Models/Request/DeveloperResolver/GetDeveloperByQueryRequest";
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

    @Query(returns => [Developer])
    async getDevelopersByFilters(
        @Args("filters") filters: GetDeveloperByFiltersRequest,
    ): Promise<Developer[]> {
        const response = await this._developerServices.getDevelopersByFilters(filters);
        return response;
    }
}