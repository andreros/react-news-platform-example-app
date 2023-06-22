export interface IArticle {
    id?: number;
    userEmail?: string;
    category?: string;
    title?: string;
    description?: string;
    image?: string;
    content?: string;
    published?: number;
}

// Get Articles
export interface IGetArticlesParams {
    page?: number;
    userEmail?: string;
    category?: string;
}

export interface IGetArticlesApiResponse {
    data: IArticle[];
    meta: {
        page: number;
        total: number;
    };
}

// Get Article
export interface IGetArticlesQueryResponse {
    data: IArticle[];
    page: number;
    totalCount: number;
}

export interface IGetArticleParams {
    id: number;
}

// Add Article
export interface IAddArticleParams {
    article: IArticle;
}

export interface IAddArticleApiResponse {
    message: string;
}
