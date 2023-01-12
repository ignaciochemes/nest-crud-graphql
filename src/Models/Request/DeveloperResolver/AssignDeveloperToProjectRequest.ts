import { Field, InputType } from "@nestjs/graphql";
import { IsNotEmpty, IsNumber } from "class-validator";

@InputType()
export default class AssignDeveloperToProjectRequest {
    @Field({ nullable: false })
    @IsNotEmpty()
    @IsNumber()
    public projectId: number;

    @Field({ nullable: false })
    @IsNotEmpty()
    @IsNumber()
    public developerId: number;
}