import { Injectable } from "@nestjs/common";

@Injectable()
export class PingDao {
    // Simulate a database call
    async getPing(): Promise<string> {
        return "Pong";
    }

    async postPing(message: string): Promise<string> {
        return message;
    }
}