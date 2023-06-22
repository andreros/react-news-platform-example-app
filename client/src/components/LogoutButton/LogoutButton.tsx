import { useAuth0 } from '@auth0/auth0-react';
import clsx from 'clsx';
import React from 'react';

export interface ILogoutButtonProps extends React.HTMLProps<HTMLButtonElement> {
    className?: string;
}

export const LogoutButton: React.FC<ILogoutButtonProps> = ({ className, ...otherProps }) => {
    const { logout } = useAuth0();

    const handleLogoutButtonClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        logout({ logoutParams: { returnTo: window.location.origin } });
        localStorage.removeItem('user');
        otherProps.onClick && otherProps.onClick(e);
    };

    const rootClasses = clsx('np-logout-button', className);

    return (
        <button {...otherProps} className={rootClasses} type="button" onClick={handleLogoutButtonClick}>
            Log Out
        </button>
    );
};
