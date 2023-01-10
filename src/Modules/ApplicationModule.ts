import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { importAllFromRequireContext } from "src/Helpers/Utilities/RequireContext";

@Module({
    imports: [
        TypeOrmModule.forFeature(importAllFromRequireContext(require.context('../Models/Entities', true, /Entity\.ts$/))),
    ],
    providers: [
        ...importAllFromRequireContext(require.context('../Daos', true, /\.ts$/)),
        ...importAllFromRequireContext(require.context('../Services', true, /\.ts$/)),
        ...importAllFromRequireContext(require.context('../Resolvers', true, /\.ts$/)),
    ],
    exports: [TypeOrmModule],
})
export class ApplicationModule { }