import { Field, InputType } from "@nestjs/graphql";
import { IsNumber, IsOptional, IsString, Max, Min } from "class-validator";

@InputType()
export default class GetDeveloperByFiltersRequest {
    @Field({ nullable: true })
    @IsOptional()
    @IsString()
    public name: string;

    @Field({ nullable: true })
    @IsOptional()
    @IsString()
    public role: string;

    @Field({ nullable: true })
    @IsOptional()
    @IsString()
    public projectName: string;

    @Field({ nullable: true })
    @IsOptional()
    @IsNumber()
    public projectId: number;

    @Field({ nullable: true })
    @IsOptional()
    @IsString()
    public orderBy: string;

    @Field({ nullable: true })
    @IsOptional()
    @IsNumber()
    @Min(0)
    @Max(100)
    public limit: number;

    @Field({ nullable: true })
    @IsOptional()
    @IsNumber()
    @Min(0)
    public offset: number;
}