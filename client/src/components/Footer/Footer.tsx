import clsx from 'clsx';
import React from 'react';

export interface IFooterProps {
    className?: string;
}

export const Footer: React.FC<IFooterProps> = ({ className }) => {
    const rootClasses = clsx('np-footer', className);
    return <div className={rootClasses}>© News 2023</div>;
};
