import { Test } from '@nestjs/testing'
import { PingController } from "src/Controllers/PingController"
import { PingDao } from "src/Daos/PingDao";
import { StatusCodeEnums } from 'src/Enums/StatusCodeEnums';
import Response from 'src/Helpers/Formatter/Response';
import { PingService } from "src/Services/PingService";
import { mockPingTest, mockPostPingTest } from './MockPingTest';

describe('Ping Test', () => {
    let pingController: PingController;
    let pingDao: PingDao;

    beforeEach(async () => {
        const moduleRef = await Test.createTestingModule({
            controllers: [PingController],
            providers: [PingService, PingDao]
        }).compile();
        pingController = moduleRef.get<PingController>(PingController);
        pingDao = moduleRef.get<PingDao>(PingDao);
    });
    afterEach(() => {
        jest.clearAllMocks();
    });

    describe('get ping controller', () => {
        const mockPing = mockPingTest();
        it('should return result message from controller', async () => {
            const result = await pingController.getPing();
            expect(result).toEqual(Response.create(mockPing));
        });
        it('should return an error', async () => {
            jest.spyOn(pingDao, 'getPing').mockImplementation(() => Promise.resolve(undefined));
            try {
                expect.assertions(2);
                await pingController.getPing();
            } catch (error) {
                expect(error.status).toEqual(400);
                expect(error.response.statusCode).toEqual(StatusCodeEnums.PONG_NOT_FOUND);
            }
        })
    })

    describe('post ping controller', () => {
        const mockPing = mockPostPingTest();
        it('should return result message from controller', async () => {
            const result = await pingController.postPing(mockPing);
            expect(result).toEqual(Response.create({ message: 'Ping' }));
        });
        it('should return an error', async () => {
            try {
                expect.assertions(2);
                await pingController.postPing({ message: 'someDiferentToPing' });
            } catch (error) {
                expect(error.status).toEqual(400);
                expect(error.response.statusCode).toEqual(StatusCodeEnums.MESSAGE_NOT_EQUAL_TO_PING);
            }
        })
    })
})