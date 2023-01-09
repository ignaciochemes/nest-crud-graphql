import { Module } from "@nestjs/common";
import { importAllFromRequireContext } from "src/Helpers/Utilities/RequireContext";

@Module({
    providers: [
        ...importAllFromRequireContext(require.context('../Daos', true, /\.ts$/)),
        ...importAllFromRequireContext(require.context('../Services', true, /\.ts$/)),
    ],
    controllers: importAllFromRequireContext(require.context('../Controllers', true, /\.ts$/)),
})
export class ApplicationModule { }