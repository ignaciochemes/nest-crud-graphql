import { Query, Resolver } from "@nestjs/graphql";
import { Project } from "src/Models/Entities/ProjectEntity";
import { ProjectServices } from "src/Services/ProjectServices";

@Resolver((of: any) => Project)
export class ProjectResolver {
    constructor(private readonly _projectService: ProjectServices) { }

    @Query(returns => [Project])
    async getProjects(): Promise<Project[]> {
        const response = await this._projectService.getProjects();
        console.log(response);
        return response;
    }
}