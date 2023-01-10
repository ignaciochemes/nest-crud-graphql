import { Field, InputType } from "@nestjs/graphql";
import { IsNotEmpty, IsString } from "class-validator";

@InputType()
export default class CreateRoleRequest {
    @Field({ nullable: false })
    @IsString()
    @IsNotEmpty()
    public name: string;
}