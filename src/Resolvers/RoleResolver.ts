import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";
import { Role } from "src/Models/Entities/RoleEntity";
import CreateRoleRequest from "src/Models/Request/RoleResolver/CreateRoleRequest";
import { RoleServices } from "src/Services/RoleServices";

@Resolver((of: any) => Role)
export class RoleResolver {
    constructor(private readonly _roleServices: RoleServices) { }

    @Mutation(returns => Role)
    async createRole(
        @Args("role") data: CreateRoleRequest
    ): Promise<Role> {
        const response = await this._roleServices.createRole(data);
        return response;
    }

    @Query(returns => [Role])
    async getRoles(): Promise<Role[]> {
        const response = await this._roleServices.getRoles();
        return response;
    }
}