export interface IBookmark {
    id?: number;
    userEmail?: string;
    title?: string;
    url?: string;
}

// Get Bookmarks
export interface IGetBookmarksParams {
    page?: number;
    userEmail?: string;
}

export interface IGetBookmarksApiResponse {
    data: IBookmark[];
    meta: {
        page: number;
        total: number;
    };
}

export interface IGetBookmarksQueryResponse {
    data: IBookmark[];
    page: number;
    totalCount: number;
}

// Get Bookmarks by email
export interface IGetBookmarkByEmailParams {
    userEmail: string;
    url: string;
}

// Add Bookmark
export interface IAddBookmarkParams {
    bookmark: IBookmark;
}

export interface IAddBookmarkApiResponse {
    message: string;
}

// Delete Bookmark
export interface IDeleteBookmarkParams {
    id: number;
}

export interface IDeleteBookmarkApiResponse {
    message: string;
}
