type EnumDictionary<T extends string | symbol | number, U> = {
    [K in T]: U;
};

enum StatusCodeEnums {
    ROLE_ALREADY_EXISTS = 10000,
}

const StatusCodeExceptionText: EnumDictionary<StatusCodeEnums, string> = {
    [StatusCodeEnums.ROLE_ALREADY_EXISTS]: "ROLE_ALREADY_EXISTS",
};

export { StatusCodeEnums, StatusCodeExceptionText };