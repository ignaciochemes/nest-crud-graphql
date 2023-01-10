import { Field, InputType } from "@nestjs/graphql";
import { IsArray, IsNotEmpty, IsString, Matches } from "class-validator";
import { EmailConstants } from "src/Constants/EmailConstants";

@InputType()
export default class CreateDeveloperRequest {
    @Field({ nullable: false, description: "Developer's name" })
    @IsString()
    @IsNotEmpty()
    public name: string;

    @Field({ nullable: false, description: "Developer's email" })
    @IsNotEmpty()
    @IsString()
    @Matches(EmailConstants.REGEX_VALID_EMAIL, { message: "The $property must be an email" })
    public email: string;

    @Field(type => [Number], { nullable: false })
    @IsArray()
    @IsNotEmpty()
    public projects: number[];

    @Field(type => [Number], { nullable: false })
    @IsArray()
    @IsNotEmpty()
    public roles: number[];
}