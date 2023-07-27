import React, { lazy, Suspense } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import LoadingPage from '@/pages/LoadingPage/LoadingPage';

const ArticleCreatePage = lazy(() => import('@/pages/Articles/ArticleCreatePage/ArticleCreatePage'));
const ArticleDetailsPage = lazy(() => import('@/pages/Articles/ArticleDetailsPage/ArticleDetailsPage'));
const ArticleListPage = lazy(() => import('@/pages/Articles/ArticleListPage/ArticleListPage'));
const BookmarkListPage = lazy(() => import('@/pages/Bookmarks/BookmarkListPage/BookmarkListPage'));
const UserProfilePage = lazy(() => import('@/pages/Users/UserProfilePage/UserProfilePage'));

export const AppRouter: React.FC = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route
                    index
                    path="/"
                    element={
                        <Suspense fallback={<LoadingPage />}>
                            <ArticleListPage />
                        </Suspense>
                    }
                />
                <Route
                    path="/articles"
                    element={
                        <Suspense fallback={<LoadingPage />}>
                            <ArticleListPage />
                        </Suspense>
                    }
                />
                <Route
                    path="/articles/new"
                    element={
                        <Suspense fallback={<LoadingPage />}>
                            <ArticleCreatePage />
                        </Suspense>
                    }
                />
                <Route
                    path="/articles/:id"
                    element={
                        <Suspense fallback={<LoadingPage />}>
                            <ArticleDetailsPage />
                        </Suspense>
                    }
                />
                <Route
                    path="/bookmarks"
                    element={
                        <Suspense fallback={<LoadingPage />}>
                            <BookmarkListPage />
                        </Suspense>
                    }
                />
                <Route
                    path="/user"
                    element={
                        <Suspense fallback={<LoadingPage />}>
                            <UserProfilePage />
                        </Suspense>
                    }
                />
                <Route
                    index
                    path="*"
                    element={
                        <Suspense fallback={<LoadingPage />}>
                            <ArticleListPage />
                        </Suspense>
                    }
                />
            </Routes>
        </BrowserRouter>
    );
};
