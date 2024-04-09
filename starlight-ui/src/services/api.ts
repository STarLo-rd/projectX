/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import axios from "axios";
import qs from "qs";
import { LOCAL_API_URL } from "../constants/global";
import {
    DeepPartial,
    PaginatedDocs,
    PatchResponse,
    PostResponse,
} from "../types";
import { getAuthorizationHeader } from "../utils/utils";
import AxiosInstance from "./axios-instance";

export const getRequestById = async <T = any>(
    collectionSlug: string,
    documentId: string
) => {
    const url = `/${collectionSlug}/${documentId}`;
    const { data } = await AxiosInstance.get<T>(url, {
        headers: getAuthorizationHeader(),
    });
    return data;
};

export const getRequestByQuery = async <T = any>(
    collectionSlug: string,
    query: any
) => {
    const stringifiedQuery = qs.stringify(query, { addQueryPrefix: true });
    const { data } = await AxiosInstance.get<PaginatedDocs<T>>(
        `/${collectionSlug}/${stringifiedQuery}`,
        { headers: getAuthorizationHeader() }
    );
    return data;
};

export const patchRequest = async <T = any>(
    collectionSlug: string,
    documentId: string,
    patchData: DeepPartial<T>
) => {
    const url = `${LOCAL_API_URL}/${collectionSlug}/${documentId}`;
    const { data } = await axios.patch<PatchResponse<T>>(url, patchData, {
        headers: getAuthorizationHeader(),
    });
    const updatedDocument = data.doc;
    return updatedDocument;
};

export const postRequest = async <T = any>(
    collectionSlug: string,
    newDocumentData: Omit<T, "createdAt" | "updatedAt">
) => {
    const url = `/${collectionSlug}`;
    const { data } = await AxiosInstance.post<PostResponse<T>>(
        url,
        newDocumentData,
        { headers: getAuthorizationHeader() }
    );
    const newDocument = data.doc;
    return newDocument;
};


