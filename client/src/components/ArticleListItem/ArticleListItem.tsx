import clsx from 'clsx';
import React from 'react';

import { IArticle } from '@/models/Article';

export interface IArticleListItemProps {
    className?: string;
    article: IArticle;
    onClick?: (id: number, e: React.MouseEvent<HTMLButtonElement | HTMLDivElement>) => void;
}

export const ArticleListItem: React.FC<IArticleListItemProps> = ({ className, article, onClick }) => {
    const rootClasses = clsx('sh-article-list-item', className);

    const handleReadMoreButtonClick = (e: React.MouseEvent<HTMLButtonElement | HTMLDivElement>) => {
        e.preventDefault();
        e.stopPropagation();
        onClick && onClick(article.id!, e);
    };

    return (
        <div className={rootClasses}>
            <div className="sh-article-list-item__image" role="button" tabIndex={0} onClick={handleReadMoreButtonClick}>
                <img src={article.image} alt={article.title} />
            </div>
            <div className="sh-article-list-item__contents">
                <h1 className="sh-article-list-item__title sh-line-clamp-2" title={article.title}>
                    {article.title}
                </h1>
                <h2 className="sh-article-list-item__description sh-line-clamp-3" title={article.description}>
                    {article.description}
                </h2>
                <button className="sh-button sh-button--primary" onClick={handleReadMoreButtonClick}>
                    Read more
                </button>
            </div>
        </div>
    );
};
