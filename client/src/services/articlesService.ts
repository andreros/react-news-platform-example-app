import { AxiosPromise } from 'axios';

import { IAddArticleApiResponse, IAddArticleParams, IArticle, IGetArticleParams, IGetArticlesApiResponse, IGetArticlesParams } from '@/models/Article';
import { api } from '@/services/api';

export const getArticlesApi = (params: IGetArticlesParams): AxiosPromise<IGetArticlesApiResponse> => {
    const { page, userEmail, category } = params;
    return api({ method: 'get', url: '/articles', params: { page, userEmail, category } });
};

export const getArticleApi = (params: IGetArticleParams): AxiosPromise<IArticle> => {
    const { id } = params;
    return api({ method: 'get', url: `/articles/${id}` });
};

export const addArticleApi = (params: IAddArticleParams): AxiosPromise<IAddArticleApiResponse> => {
    const { article } = params;
    return api({ method: 'post', url: '/articles', data: article });
};
