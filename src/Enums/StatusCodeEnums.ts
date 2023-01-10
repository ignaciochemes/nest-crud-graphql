type EnumDictionary<T extends string | symbol | number, U> = {
    [K in T]: U;
};

enum StatusCodeEnums {
    ROLE_ALREADY_EXISTS = 10000,
    ROLE_NOT_FOUND,
    ROLES_NOT_FOUND,
    SOME_ROLE_NOT_FOUND,

    PROJECT_ALREADY_EXISTS = 20000,
    PROJECTS_NOT_FOUND,

    STATUS_NOT_MATCHED_WITH_ENUM = 30000
}

const StatusCodeExceptionText: EnumDictionary<StatusCodeEnums, string> = {
    [StatusCodeEnums.ROLE_ALREADY_EXISTS]: "ROLE_ALREADY_EXISTS",
    [StatusCodeEnums.ROLE_NOT_FOUND]: "ROLE_NOT_FOUND",
    [StatusCodeEnums.ROLES_NOT_FOUND]: "ROLES_NOT_FOUND",
    [StatusCodeEnums.SOME_ROLE_NOT_FOUND]: "SOME_ROLE_NOT_FOUND",
    [StatusCodeEnums.PROJECT_ALREADY_EXISTS]: "PROJECT_ALREADY_EXISTS",
    [StatusCodeEnums.PROJECTS_NOT_FOUND]: "PROJECTS_NOT_FOUND",
    [StatusCodeEnums.STATUS_NOT_MATCHED_WITH_ENUM]: "STATUS_NOT_MATCHED_WITH_ENUM",
};

export { StatusCodeEnums, StatusCodeExceptionText };