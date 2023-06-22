import { AxiosPromise } from 'axios';

import {
    IAddBookmarkApiResponse,
    IAddBookmarkParams,
    IBookmark,
    IDeleteBookmarkApiResponse,
    IDeleteBookmarkParams,
    IGetBookmarkByEmailParams,
    IGetBookmarksApiResponse,
    IGetBookmarksParams
} from '@/models/Bookmark';
import { api } from '@/services/api';

export const getBookmarksApi = (params: IGetBookmarksParams): AxiosPromise<IGetBookmarksApiResponse> => {
    const { page, userEmail } = params;
    return api({ method: 'get', url: '/bookmarks', params: { page, userEmail } });
};

export const getBookmarkByEmailApi = (params: IGetBookmarkByEmailParams): AxiosPromise<IBookmark> => {
    const { userEmail, url } = params;
    return api({ method: 'get', url: `/bookmarks/${userEmail}`, params: { url } });
};

export const addBookmarkApi = (params: IAddBookmarkParams): AxiosPromise<IAddBookmarkApiResponse> => {
    const { bookmark } = params;
    return api({ method: 'post', url: '/bookmarks', data: bookmark });
};

export const deleteBookmarkApi = (data: IDeleteBookmarkParams): AxiosPromise<IDeleteBookmarkApiResponse> => {
    const { id } = data;
    return api({ method: 'delete', url: '/bookmarks', data: { id } });
};
