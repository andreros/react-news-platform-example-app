import clsx from 'clsx';
import React from 'react';

import { Footer } from '@/components/Footer/Footer';
import { Header } from '@/components/Header/Header';

export interface IBasePageProps extends React.HTMLProps<HTMLDivElement> {
    className?: string;
    children?: string | React.ReactElement | React.ReactElement[];
}

export const BasePage: React.FC<IBasePageProps> = ({ className, children, ...otherProps }) => {
    const rootClasses = clsx('sh-base-page', className);
    return (
        <div className={rootClasses} {...otherProps}>
            <header className="sh-base-page__header">
                <Header />
            </header>
            <main className="sh-base-page__main">{children}</main>
            <footer className="sh-base-page__footer">
                <Footer />
            </footer>
        </div>
    );
};
