import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import clsx from 'clsx';
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import { BookmarkListItem } from '@/components/BookmarkListItem/BookmarkListItem';
import { BasePage } from '@/pages/BasePage/BasePage';
import LoadingPage from '@/pages/LoadingPage/LoadingPage';
import { bookmarksKeys, deleteBookmarkMutation, getBookmarksQuery } from '@/react-query/bookmarks';
import { isUserLoggedIn } from '@/tools/tools';

export interface IBookmarkListPageProps {
    className?: string;
}

const BookmarkListPage: React.FC<IBookmarkListPageProps> = ({ className }) => {
    const navigate = useNavigate();
    const queryClient = useQueryClient();

    if (!isUserLoggedIn()) navigate('/');

    const { mutate: deleteBookmarkMutate } = useMutation({
        mutationFn: deleteBookmarkMutation,
        onMutate: () => toast('Deleting bookmark...', { type: 'info' }),
        onSuccess: () => {
            toast('The bookmark was deleted successfully!', { type: 'success' });
            queryClient.invalidateQueries(bookmarksKeys.getBookmarksQuery());
        },
        onError: () => toast('Something went wrong while deleting the bookmark.', { type: 'error' })
    });

    const {
        data: bookmarks,
        isFetching,
        isLoading,
        isError
    } = useQuery({
        queryKey: bookmarksKeys.getBookmarksQuery(),
        queryFn: () => getBookmarksQuery({}),
        refetchOnWindowFocus: false
    });

    if (isFetching || isLoading) return <LoadingPage />;

    if (isError) {
        toast('There was an error loading the bookmarks information.', { type: 'error' });
        return <></>;
    }

    const rootClasses = clsx('np-bookmark-list-page', className);

    return (
        <BasePage className={rootClasses}>
            {bookmarks?.data?.length ? (
                <div className="np-bookmark-list-page__list">
                    {bookmarks?.data.map((bookmark) => {
                        return (
                            <Link key={`bookmark-${bookmark.id}`} to={bookmark.url ?? '/'}>
                                <BookmarkListItem bookmark={bookmark} onClick={(id) => deleteBookmarkMutate({ id })} />
                            </Link>
                        );
                    })}
                </div>
            ) : (
                <div className="np-bookmark-list-page__empty-view">
                    <p>You haven't saved any bookmarks yet.</p>
                    <p>
                        Go read some{' '}
                        <Link className="np-bookmark-list-page__link" to="/">
                            articles
                        </Link>{' '}
                        and click on the "Add to bookmarks" button.
                    </p>
                </div>
            )}
        </BasePage>
    );
};

export default BookmarkListPage;
