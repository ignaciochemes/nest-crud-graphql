import { Injectable } from "@nestjs/common";
import { PingDao } from "src/Daos/PingDao";
import { StatusCodeEnums } from "src/Enums/StatusCodeEnums";
import { HttpCustomException } from "src/Exceptions/HttpCustomException";
import CreatePingRequest from "src/Models/Request/CreatePingRequest";
import PongResponse from "src/Models/Response/PongResponse";

@Injectable()
export class PingService {
    constructor(private readonly _pingDao: PingDao) { }

    async getPing(): Promise<PongResponse> {
        const ping = await this._pingDao.getPing();
        if (!ping) throw new HttpCustomException("Ping not found", StatusCodeEnums.PONG_NOT_FOUND);
        return new PongResponse(ping);
    }

    async postPing(data: CreatePingRequest): Promise<PongResponse> {
        if (data.message !== 'Ping') throw new HttpCustomException("Message not equal to Ping", StatusCodeEnums.MESSAGE_NOT_EQUAL_TO_PING);
        const ping = await this._pingDao.postPing(data.message);
        return new PongResponse(ping);
    }
}