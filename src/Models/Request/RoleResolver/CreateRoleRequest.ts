import { Field, InputType } from "@nestjs/graphql";
import { IsBoolean, IsNotEmpty, IsString } from "class-validator";

@InputType()
export default class CreateRoleRequest {
    @Field({ nullable: false })
    @IsString()
    @IsNotEmpty()
    public description: string;

    @Field(type => Boolean, { nullable: false })
    @IsBoolean()
    @IsNotEmpty()
    public enable: boolean;
}