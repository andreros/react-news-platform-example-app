import { useInfiniteQuery } from '@tanstack/react-query';
import clsx from 'clsx';
import React, { useEffect } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';

import { BasePage } from '@/pages/BasePage/BasePage';
import LoadingPage from '@/pages/LoadingPage/LoadingPage';
import { articlesKeys, getArticlesQuery } from '@/react-query/articles';
import { ArticleListItem } from '@/components/ArticleListItem/ArticleListItem';
import { toast } from 'react-toastify';

import { getEnvironmentVariables } from '@/tools/tools';

export interface IArticleListPageProps {
    className?: string;
}

const ArticleListPage: React.FC<IArticleListPageProps> = ({ className }) => {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const category = searchParams.get('category') ?? '';
    let showLoadMoreButton = true;

    const {
        data: articlesPages,
        fetchNextPage,
        isFetching,
        isLoading,
        isError
    } = useInfiniteQuery({
        queryKey: articlesKeys.getArticlesQuery([{ category }]),
        queryFn: ({ pageParam = 1 }) => getArticlesQuery({ page: pageParam, category }),
        getNextPageParam: (lastPage) => lastPage.page + 1,
        refetchOnWindowFocus: false,
        refetchOnMount: true
    });

    const handlePageScroll = () => {
        localStorage.setItem('ArticleListPageScrollY', `${window.scrollY}`);
    };

    useEffect(() => {
        window.scrollTo(0, Number.parseInt(localStorage.getItem('ArticleListPageScrollY') ?? '0'));
    }, [articlesPages]);

    useEffect(() => {
        document.addEventListener('scroll', handlePageScroll);
        localStorage.setItem('ArticleListPageScrollY', '0');
        return () => {
            localStorage.removeItem('ArticleListPageScrollY');
            document.removeEventListener('scroll', handlePageScroll);
        };
    }, []);

    /**
     * Verify if `Load more` articles button should be shown or not.
     */
    if (articlesPages?.pages?.length) {
        const totalArticles = articlesPages?.pages[0].totalCount;
        const loadedArticles = articlesPages?.pages.length * Number.parseInt(getEnvironmentVariables('recordsPerPage') || '0');
        showLoadMoreButton = loadedArticles < totalArticles;
    }

    if (isFetching || isLoading) return <LoadingPage />;

    if (isError) {
        toast('There was an error loading the articles information.', { type: 'error' });
        return <></>;
    }

    const rootClasses = clsx('np-article-list-page', className);

    return (
        <BasePage className={rootClasses}>
            <div className="np-article-list-page__filters">
                <span className="np-article-list-page__filters-label">Categories</span>
                <Link className="np-button np-button--pill" to="/articles?category=Marketing">
                    Marketing
                </Link>
                <Link className="np-button np-button--pill" to="/articles?category=Design">
                    Design
                </Link>
                <Link className="np-button np-button--pill" to="/articles?category=Engineering">
                    Engineering
                </Link>
            </div>
            <div className="np-article-list-page__list">
                {articlesPages?.pages.map((articlePage, articlePageIndex) => (
                    <React.Fragment key={`article-page-${articlePageIndex}`}>
                        {articlePage.data.map((article) => (
                            <ArticleListItem
                                key={`article-${article.id}`}
                                article={article}
                                onClick={(id) => {
                                    navigate(`/articles/${id}`);
                                }}
                            />
                        ))}
                    </React.Fragment>
                ))}
            </div>
            <>
                {showLoadMoreButton && (
                    <div className="np-article-list-page__load-more">
                        <button className="np-button np-button--primary np-button--large" onClick={() => fetchNextPage()}>
                            Load more
                        </button>
                    </div>
                )}
            </>
        </BasePage>
    );
};

export default ArticleListPage;
