import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import clsx from 'clsx';
import React from 'react';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

import { BasePage } from '@/pages/BasePage/BasePage';
import LoadingPage from '@/pages/LoadingPage/LoadingPage';
import { articlesKeys, getArticleQuery } from '@/react-query/articles';
import { addBookmarkMutation, bookmarksKeys, deleteBookmarkMutation, getBookmarkByEmailQuery } from '@/react-query/bookmarks';
import { getLoggedInUser, isUserLoggedIn } from '@/tools/tools';

export interface IArticleDetailsPageProps {
    className?: string;
}

const ArticleDetailsPage: React.FC<IArticleDetailsPageProps> = ({ className }) => {
    const params = useParams();
    const queryClient = useQueryClient();
    const { id: articleId } = params;
    const id = parseInt(articleId ?? '0');
    let userEmail: string;
    let url: string;
    const user = getLoggedInUser();

    const { mutate: addBookmarkMutate } = useMutation({
        mutationFn: addBookmarkMutation,
        onSuccess: () => {
            // toggle bookmark ON
            queryClient.invalidateQueries(articlesKeys.getArticleQuery([{ id }]));
            queryClient.invalidateQueries(bookmarksKeys.getBookmarkByEmailQuery([{ userEmail, url }]));
        }
    });

    const { mutate: deleteBookmarkMutate } = useMutation({
        mutationFn: deleteBookmarkMutation,
        onSuccess: () => {
            // toggle bookmark OFF
            queryClient.invalidateQueries(articlesKeys.getArticleQuery([{ id }]));
            queryClient.invalidateQueries(bookmarksKeys.getBookmarkByEmailQuery([{ userEmail, url }]));
        }
    });

    const {
        data: article,
        isFetching: isFetchingArticle,
        isLoading: isLoadingArticle,
        isError
    } = useQuery({
        queryKey: articlesKeys.getArticleQuery([{ id }]),
        queryFn: () => getArticleQuery({ id }),
        refetchOnWindowFocus: false
    });

    userEmail = article?.userEmail ?? '';
    url = `/articles/${article?.id}`;

    const {
        data: bookmark,
        isFetching: isFetchingBookmark,
        isLoading: isLoadingBookmark
    } = useQuery({
        queryKey: bookmarksKeys.getBookmarkByEmailQuery([{ userEmail, url }]),
        queryFn: () => getBookmarkByEmailQuery({ userEmail, url }),
        enabled: !!article,
        refetchOnWindowFocus: true
    });

    if (isFetchingArticle || isLoadingArticle || isFetchingBookmark || isLoadingBookmark) return <LoadingPage />;

    if (isError) {
        toast('An error occurred while loading the article data.', { type: 'error' });
        return <></>;
    }

    const rootClasses = clsx('np-article-details-page', className);

    return (
        <BasePage className={rootClasses}>
            <div className="np-article-details-page__image">
                <img src={article?.image} alt={article?.title} />
            </div>
            <h1 className="np-article-details-page__title">{article?.title}</h1>
            <h2 className="np-article-details-page__category">
                <span className="np-article-details-page__highlight">Category: </span>
                {article?.category}
            </h2>
            <h3 className="np-article-details-page__author">
                <span className="np-article-details-page__highlight">Published by: </span>
                {article?.userEmail}
            </h3>
            <>
                {isUserLoggedIn() && (
                    <div className="np-article-details-page__bookmark">
                        {bookmark?.id ? (
                            <button className="np-button np-button--primary" onClick={() => deleteBookmarkMutate({ id: bookmark.id! })}>
                                Remove from bookmarks
                            </button>
                        ) : (
                            <button
                                className="np-button np-button--primary"
                                onClick={() => {
                                    addBookmarkMutate({
                                        bookmark: {
                                            userEmail: user.email,
                                            title: article?.title,
                                            url: `/articles/${article?.id}`
                                        }
                                    });
                                }}>
                                Add to bookmarks
                            </button>
                        )}
                    </div>
                )}
            </>
            {/* `dangerouslySetInnerHTML` below set only for demonstration purposes. */}
            {/* Injected content must be properly sanitized to protect against XSS or malicious code injection attacks. */}
            <div className="np-article-details-page__content" dangerouslySetInnerHTML={{ __html: article?.content ?? '' }}></div>
        </BasePage>
    );
};

export default ArticleDetailsPage;
