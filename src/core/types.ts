export const httpMethods = [
    "POST",
    "PUT",
    "GET",
    "HEAD",
    "PATCH",
    "HEAD",
    "OPTIONS",
    "CONNECT",
    "TRACE",
    "DELETE"
]

export const httpErrors = {
    badRequest: 400,
    forbidden: 403,
    notFound: 404,
    methodNotAllow: 405,
    unauthorized: 401,
    serverError: 500
}

export type HttpMethodType = typeof httpMethods[number]

export type ResponseType = {
    code: number;
    data: unknown;
}
