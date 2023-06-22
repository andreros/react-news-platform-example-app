import {
    IAddBookmarkApiResponse,
    IAddBookmarkParams,
    IBookmark,
    IDeleteBookmarkApiResponse,
    IDeleteBookmarkParams,
    IGetBookmarkByEmailParams,
    IGetBookmarksParams,
    IGetBookmarksQueryResponse
} from '@/models/Bookmark';
import { addBookmarkApi, deleteBookmarkApi, getBookmarkByEmailApi, getBookmarksApi } from '@/services/bookmarksService';

export const bookmarksKeys = {
    all: ['bookmarks'] as const,
    getBookmarksQuery: (extraKeys: unknown[] = []) => [...bookmarksKeys.all, ...extraKeys] as const,
    getBookmarkByEmailQuery: (extraKeys: unknown[] = []) => [...bookmarksKeys.all, ...extraKeys] as const
};

export const getBookmarksQuery = async (params: IGetBookmarksParams): Promise<IGetBookmarksQueryResponse> => {
    try {
        const response = await getBookmarksApi(params);
        return {
            data: response.data.data || [],
            page: response.data.meta?.page || 1,
            totalCount: response.data.meta?.total || 0
        };
    } catch (error: unknown) {
        throw error;
    }
};

export const getBookmarkByEmailQuery = async (params: IGetBookmarkByEmailParams): Promise<IBookmark | null> => {
    try {
        const response = await getBookmarkByEmailApi(params);
        return response.data;
    } catch (error: unknown) {
        return null;
    }
};

export const addBookmarkMutation = async (params: IAddBookmarkParams): Promise<IAddBookmarkApiResponse> => {
    try {
        const response = await addBookmarkApi(params);
        return response.data;
    } catch (error: unknown) {
        throw error;
    }
};

export const deleteBookmarkMutation = async (params: IDeleteBookmarkParams): Promise<IDeleteBookmarkApiResponse> => {
    try {
        const response = await deleteBookmarkApi(params);
        return response.data;
    } catch (error: unknown) {
        throw error;
    }
};
