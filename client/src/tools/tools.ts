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

/**
 * Function responsible for retrieving an environment variable declared in the .env file.
 * @param envVariable the environment variable key.
 * @return string | undefined The environment variable, if the variable key exists. `undefined` otherwise.
 */
export const getEnvironmentVariables = (envVariable: string): string | undefined => {
    return process.env[envVariable];
};

/**
 * Function responsible for checking if a user is logged in or not.
 */
export const isUserLoggedIn = () => !!localStorage.getItem('user');

/**
 * Function responsible for retrieving the logged-in user.
 * @return User The logged-in user if it exists, an empty User object otherwise.
 */
export const getLoggedInUser = () => JSON.parse(localStorage.getItem('user') ?? '{}') as User;
