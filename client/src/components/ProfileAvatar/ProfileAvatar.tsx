import { useAuth0 } from '@auth0/auth0-react';
import clsx from 'clsx';
import React from 'react';
import { Link } from 'react-router-dom';

export interface IProfileAvatarProps {
    className?: string;
}

export const ProfileAvatar: React.FC<IProfileAvatarProps> = ({ className }) => {
    const { user } = useAuth0();

    if (!user && !localStorage.getItem('user')) return <></>;

    if (!localStorage.getItem('user')) localStorage.setItem('user', JSON.stringify(user));

    const loggedInUser = JSON.parse(localStorage.getItem('user') ?? '');

    const rootClasses = clsx('np-profile-avatar', className);

    return (
        <Link className={rootClasses} to="/user">
            <img className="np-profile-avatar__avatar" src={user?.picture || loggedInUser.picture} alt={user?.name || loggedInUser.name} />
        </Link>
    );
};
