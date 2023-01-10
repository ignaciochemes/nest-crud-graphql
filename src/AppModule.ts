import { Module } from "@nestjs/common";
import { ApplicationModule } from "./Modules/ApplicationModule";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { envFilePathConfiguration } from "./Configs/EnvFilePathConfig";
import { nestEnvConfiguration } from "./Configs/NestEnvConfig";
import { GraphQLModule } from "@nestjs/graphql";
import { ApolloDriver, ApolloDriverConfig } from "@nestjs/apollo";
import { TypeOrmModule } from "@nestjs/typeorm";
import { DBConfigInterface } from "./Configs/DbConfigInterface";
import { APP_FILTER } from "@nestjs/core";
import { GraphQLCustomException } from "./Exceptions/GraphQLCustomException";

@Module({
    imports: [
        ConfigModule.forRoot({
            envFilePath: [envFilePathConfiguration()],
            load: [nestEnvConfiguration],
            isGlobal: true,
        }),
        GraphQLModule.forRoot<ApolloDriverConfig>({
            driver: ApolloDriver,
            autoSchemaFile: "schema.gql",
        }),
        TypeOrmModule.forRootAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: (configService: ConfigService) =>
                Object.assign(configService.get<DBConfigInterface>('DATABASE')),
        }),
        ApplicationModule
    ],
    providers: [{ provide: APP_FILTER, useClass: GraphQLCustomException }],
})
export class AppModule { }