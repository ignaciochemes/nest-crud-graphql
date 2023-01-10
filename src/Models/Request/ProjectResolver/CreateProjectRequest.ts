import { Field, InputType } from "@nestjs/graphql";
import { IsArray, IsNotEmpty, IsString, IsUppercase } from "class-validator";

@InputType()
export default class CreateProjectRequest {
    @Field({ nullable: false })
    @IsString()
    @IsNotEmpty()
    public name: string;

    @Field({ nullable: false })
    @IsString()
    @IsNotEmpty()
    public description: string;

    @Field({ nullable: false })
    @IsString()
    @IsNotEmpty()
    @IsUppercase()
    public status: string;

    @Field(type => [Number], { nullable: false })
    @IsArray()
    @IsNotEmpty()
    public roles: number[];
}