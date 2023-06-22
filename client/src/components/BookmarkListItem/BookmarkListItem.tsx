import clsx from 'clsx';
import React from 'react';

import { IBookmark } from '@/models/Bookmark';

export interface IBookmarkListItemProps {
    className?: string;
    bookmark: IBookmark;
    onClick?: (id: number, e: React.MouseEvent<HTMLButtonElement>) => void;
}

export const BookmarkListItem: React.FC<IBookmarkListItemProps> = ({ className, bookmark, onClick }) => {
    const rootClasses = clsx('sh-bookmark-list-item', className);

    const handleDeleteButtonClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        e.stopPropagation();
        onClick && onClick(bookmark.id!, e);
    };

    return (
        <div className={rootClasses}>
            <div className="sh-bookmark-list-item__title sh-truncate">
                Read "<span className="sh-bookmark-list-item__highlight">{bookmark.title}</span>"
            </div>
            <button className="sh-button sh-button--primary" onClick={handleDeleteButtonClick}>
                Delete
            </button>
        </div>
    );
};
