import { User } from '@auth0/auth0-react';

export const ARTICLE_CATEGORIES = [
    { name: 'Marketing', value: 'Marketing' },
    { name: 'Design', value: 'Design' },
    { name: 'Engineering', value: 'Engineering' }
];

export const ARTICLE_STATUS = [
    { name: 'Draft', value: 0 },
    { name: 'Published', value: 1 }
];

export const isUserLoggedIn = () => !!localStorage.getItem('user');

export const getLoggedInUser = () => JSON.parse(localStorage.getItem('user') ?? '{}') as User;
