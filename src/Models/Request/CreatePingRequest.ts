import { IsNotEmpty, IsString } from "class-validator";

export default class CreatePingRequest {

    @IsNotEmpty()
    @IsString()
    message: string;
}