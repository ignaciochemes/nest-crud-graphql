import EnumEnv from './EnumEnv';

export const envFilePathConfiguration = (): string => {
    console.log(`Environment - ${process.env.CRUD}`);
    let envFilePath;
    switch (process.env.CRUD) {
        case EnumEnv.LOCAL:
            envFilePath = '.env.local';
            break;
        case EnumEnv.DEV:
            envFilePath = '.env.dev';
            break;
        case EnumEnv.PRODUCTION:
            envFilePath = '.env';
            break;
        default:
            envFilePath = '.env';
    }
    console.log(`envFilePath: ` + envFilePath);
    return envFilePath;
};