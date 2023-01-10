type EnumDictionary<T extends string | symbol | number, U> = {
    [K in T]: U;
};

enum StatusCodeEnums {
    ROLE_ALREADY_EXISTS = 10000,
    ROLE_NOT_FOUND,
    ROLES_NOT_FOUND
}

const StatusCodeExceptionText: EnumDictionary<StatusCodeEnums, string> = {
    [StatusCodeEnums.ROLE_ALREADY_EXISTS]: "ROLE_ALREADY_EXISTS",
    [StatusCodeEnums.ROLE_NOT_FOUND]: "ROLE_NOT_FOUND",
    [StatusCodeEnums.ROLES_NOT_FOUND]: "ROLES_NOT_FOUND"
};

export { StatusCodeEnums, StatusCodeExceptionText };