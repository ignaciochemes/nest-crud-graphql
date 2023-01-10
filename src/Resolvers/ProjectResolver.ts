import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";
import { Project } from "src/Models/Entities/ProjectEntity";
import CreateProjectRequest from "src/Models/Request/ProjectResolver/CreateProjectRequest";
import { ProjectServices } from "src/Services/ProjectServices";

@Resolver((of: any) => Project)
export class ProjectResolver {
    constructor(private readonly _projectService: ProjectServices) { }

    @Mutation(returns => Project)
    async createProject(
        @Args("project") data: CreateProjectRequest
    ): Promise<Project> {
        const response = await this._projectService.createProject(data);
        return response;
    }

    @Query(returns => [Project])
    async getProjects(): Promise<Project[]> {
        const response = await this._projectService.getProjects();
        return response;
    }
}