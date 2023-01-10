import { Field, InputType } from "@nestjs/graphql";
import { IsBoolean, IsNumber, IsOptional, IsString, Max, Min } from "class-validator";

@InputType()
export default class GetProjectByFiltersRequest {
    @Field({ nullable: true })
    @IsOptional()
    @IsString()
    public name: string;

    @Field({ nullable: true })
    @IsOptional()
    @IsString()
    public uuid: string;

    @Field({ nullable: true })
    @IsOptional()
    @IsString()
    public description: string;

    @Field({ nullable: true })
    @IsOptional()
    @IsString()
    public status: string;

    @Field({ nullable: true })
    @IsOptional()
    @IsString()
    public role: string;

    @Field({ nullable: true })
    @IsOptional()
    @IsBoolean()
    public completed: boolean;

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