import clsx from 'clsx';
import React from 'react';

export interface ILoadingPageProps {
    className?: string;
}

const LoadingPage: React.FC<ILoadingPageProps> = ({ className }) => {
    const rootClasses = clsx('np-loading-page', className);
    return (
        <div className={rootClasses}>
            <h1>Loading...</h1>
        </div>
    );
};

export default LoadingPage;
