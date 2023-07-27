import { User } from '@auth0/auth0-react';
import clsx from 'clsx';
import React from 'react';
import { useNavigate } from 'react-router-dom';

import { LogoutButton } from '@/components/LogoutButton/LogoutButton';
import { BasePage } from '@/pages/BasePage/BasePage';

export interface IUserProfilePageProps {
    className?: string;
}

const UserProfilePage: React.FC<IUserProfilePageProps> = ({ className }) => {
    const navigate = useNavigate();

    if (!localStorage.getItem('user')) navigate('/');

    const user = JSON.parse(localStorage.getItem('user') ?? '') as User;

    const rootClasses = clsx('np-user-profile-page', className);

    return (
        <BasePage className={rootClasses}>
            <div className="np-user-profile-page__content">
                {user.picture && <img className="np-user-profile-page__avatar" src={user.picture} alt="User avatar" />}
                {user.nickname && (
                    <div className="np-user-profile-page__field">
                        <span className="np-user-profile-page__label">Nickname: </span>
                        {user.nickname}
                    </div>
                )}
                {user.name && (
                    <div className="np-user-profile-page__field">
                        <span className="np-user-profile-page__label">Name: </span>
                        {user.name}
                    </div>
                )}
                {user.email && (
                    <div className="np-user-profile-page__field">
                        <span className="np-user-profile-page__label">Email: </span>
                        {user.email}
                    </div>
                )}
                {user.birthdate && (
                    <div className="np-user-profile-page__field">
                        <span className="np-user-profile-page__label">Birthdate: </span>
                        {user.birthdate}
                    </div>
                )}
                {user.address && (
                    <div className="np-user-profile-page__field">
                        <span className="np-user-profile-page__label">Address: </span>
                        {user.address}
                    </div>
                )}
                {user.phone_number && (
                    <div className="np-user-profile-page__field">
                        <span className="np-user-profile-page__label">Phone: </span>
                        {user.phone_number}
                    </div>
                )}
                {user.website && (
                    <div className="np-user-profile-page__field">
                        <span className="np-user-profile-page__label">Website: </span>
                        {user.website}
                    </div>
                )}
                <LogoutButton className="np-button np-button--primary" />
            </div>
        </BasePage>
    );
};

export default UserProfilePage;
