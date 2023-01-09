type EnumDictionary<T extends string | symbol | number, U> = {
    [K in T]: U;
};

enum StatusCodeEnums {
    PONG_NOT_FOUND = 10000,
    MESSAGE_NOT_EQUAL_TO_PING = 10001,
}

const StatusCodeExceptionText: EnumDictionary<StatusCodeEnums, string> = {
    [StatusCodeEnums.PONG_NOT_FOUND]: 'Pong not found',
    [StatusCodeEnums.MESSAGE_NOT_EQUAL_TO_PING]: 'Message not equal to Ping',
};

export { StatusCodeEnums, StatusCodeExceptionText };