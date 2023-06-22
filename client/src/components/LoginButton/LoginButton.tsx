import { useAuth0 } from '@auth0/auth0-react';
import clsx from 'clsx';
import React from 'react';

export interface ILoginButtonProps extends React.HTMLProps<HTMLButtonElement> {
    className?: string;
}

export const LoginButton: React.FC<ILoginButtonProps> = ({ className, ...otherProps }) => {
    const { loginWithRedirect } = useAuth0();

    const handleLoginButtonClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        loginWithRedirect();
        otherProps.onClick && otherProps.onClick(e);
    };

    const rootClasses = clsx('np-login-button', className);

    return (
        <button {...otherProps} className={rootClasses} type="button" onClick={handleLoginButtonClick}>
            Log In
        </button>
    );
};
