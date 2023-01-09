import { Body, Controller, Get, Post } from "@nestjs/common";
import Response from "src/Helpers/Formatter/Response";
import CreatePingRequest from "src/Models/Request/CreatePingRequest";
import PongResponse from "src/Models/Response/PongResponse";
import { PingService } from "src/Services/PingService";

@Controller('ping')
export class PingController {
    constructor(private readonly _pingService: PingService) { }

    @Get()
    async getPing(): Promise<Response<PongResponse>> {
        const response = await this._pingService.getPing();
        return Response.create<PongResponse>(response);
    }

    @Post()
    async postPing(
        @Body() data: CreatePingRequest
    ): Promise<Response<PongResponse>> {
        const response = await this._pingService.postPing(data);
        return Response.create<PongResponse>(response);
    }
}