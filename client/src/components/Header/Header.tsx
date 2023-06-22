import { useAuth0 } from '@auth0/auth0-react';
import clsx from 'clsx';
import React from 'react';
import { Link } from 'react-router-dom';

import { LoginButton } from '@/components/LoginButton/LoginButton';
import { ProfileAvatar } from '@/components/ProfileAvatar/ProfileAvatar';

import logo from '../../../public/assets/logo.png';

export interface IHeaderProps {
    className?: string;
}

export const Header: React.FC<IHeaderProps> = ({ className }) => {
    const { isAuthenticated, isLoading } = useAuth0();

    const rootClasses = clsx('sh-header', className);

    return (
        <div className={rootClasses}>
            <Link to="/">
                <img className="sh-header__logo" src={logo} alt="News platform logo" />
            </Link>

            <div className="sh-header__navigation">
                {(isAuthenticated || localStorage.getItem('user')) && !isLoading && (
                    <>
                        <Link className="sh-header__link" to="/bookmarks">
                            My Bookmarks
                        </Link>
                        <Link className="sh-header__link" to="/articles/new">
                            New article
                        </Link>
                    </>
                )}
            </div>

            <div className="sh-header__authentication">
                {isAuthenticated || (localStorage.getItem('user') && !isLoading) ? <ProfileAvatar /> : <LoginButton className="sh-button sh-button--primary" />}
            </div>
        </div>
    );
};
