import clsx from 'clsx';
import React from 'react';

import { IBookmark } from '@/models/Bookmark';

export interface IBookmarkListItemProps {
    className?: string;
    bookmark: IBookmark;
    onClick?: (id: number, e: React.MouseEvent<HTMLButtonElement>) => void;
}

export const BookmarkListItem: React.FC<IBookmarkListItemProps> = ({ className, bookmark, onClick }) => {
    const rootClasses = clsx('np-bookmark-list-item', className);

    const handleDeleteButtonClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        e.stopPropagation();
        onClick && onClick(bookmark.id!, e);
    };

    return (
        <div className={rootClasses}>
            <div className="np-bookmark-list-item__title np-truncate">
                Read "<span className="np-bookmark-list-item__highlight">{bookmark.title}</span>"
            </div>
            <button className="np-button np-button--primary" onClick={handleDeleteButtonClick}>
                Delete
            </button>
        </div>
    );
};
