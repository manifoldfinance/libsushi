import {NextApiRequest, NextApiResponse} from "next";
import {httpMethods, HttpMethodType, ResponseType} from "./types";

type ApiResponse = {

}

type ReponseType = ApiResponse

export type MethodHandlerType =  (req: NextApiRequest, res: NextApiResponse) => Promise<ReponseType> | ReponseType

export const requestHandler = (req: NextApiRequest, res: NextApiResponse, handlers: {[key in HttpMethodType]: MethodHandlerType }) => {
    const { method } = req

    if(!method || !httpMethods.includes(method) || !handlers[method]) {
        res.status(405)
        res.setHeader('Allow', Object.keys(handlers).join())
        res.end()
        return false
    }

    handlers[method](req,res);
}

export const responseHandler = (res: NextApiResponse, { code, data } : ResponseType) => res.status(code).send(data)

export const errorHandler = (res: NextApiResponse, response : ResponseType) => responseHandler(res, response)
