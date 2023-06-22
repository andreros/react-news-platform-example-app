import { IAddArticleApiResponse, IAddArticleParams, IArticle, IGetArticleParams, IGetArticlesParams, IGetArticlesQueryResponse } from '@/models/Article';
import { addArticleApi, getArticleApi, getArticlesApi } from '@/services/articlesService';

export const articlesKeys = {
    all: ['articles'] as const,
    getArticlesQuery: (extraKeys: unknown[] = []) => [...articlesKeys.all, ...extraKeys] as const,
    getArticleQuery: (extraKeys: unknown[] = []) => [...articlesKeys.all, ...extraKeys] as const
};

export const getArticlesQuery = async (params: IGetArticlesParams): Promise<IGetArticlesQueryResponse> => {
    try {
        const response = await getArticlesApi(params);
        return {
            data: response.data.data || [],
            page: response.data.meta?.page || 1,
            totalCount: response.data.meta?.total || 0
        };
    } catch (error: unknown) {
        throw error;
    }
};

export const getArticleQuery = async (params: IGetArticleParams): Promise<IArticle> => {
    try {
        const response = await getArticleApi(params);
        return response.data;
    } catch (error: unknown) {
        throw error;
    }
};

export const addArticleMutation = async (params: IAddArticleParams): Promise<IAddArticleApiResponse> => {
    try {
        const response = await addArticleApi(params);
        return response.data;
    } catch (error: unknown) {
        throw error;
    }
};
