import { useMutation, useQueryClient } from '@tanstack/react-query';
import clsx from 'clsx';
import { useFormik } from 'formik';
import { Dropdown } from 'primereact/dropdown';
import { InputText } from 'primereact/inputtext';
import { InputTextarea } from 'primereact/inputtextarea';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import { IArticle } from '@/models/Article';
import { validateForm } from '@/pages/Articles/ArticleCreatePage/validateForm';
import { BasePage } from '@/pages/BasePage/BasePage';
import { addArticleMutation, articlesKeys } from '@/react-query/articles';
import { ARTICLE_CATEGORIES, ARTICLE_STATUS, getLoggedInUser, isUserLoggedIn } from '@/tools/tools';

export interface IArticleCreatePageProps {
    className?: string;
}

const ArticleCreatePage: React.FC<IArticleCreatePageProps> = ({ className }) => {
    const navigate = useNavigate();
    const queryClient = useQueryClient();
    const user = getLoggedInUser();

    if (!isUserLoggedIn()) navigate('/');

    const { mutate: addArticleMutate } = useMutation({
        mutationFn: addArticleMutation,
        onSuccess: () => {
            formik.resetForm();
            toast('The article was created successfully.', { type: 'success' });
            // update cached articles list
            queryClient.invalidateQueries(articlesKeys.getArticlesQuery());
        },
        onError: () => {
            toast('There was an error while creating the new article.', { type: 'error' });
        }
    });

    const formik = useFormik<IArticle>({
        initialValues: {
            userEmail: user.email,
            category: '',
            title: '',
            description: '',
            image: '',
            content: '',
            published: 1
        },
        validate: validateForm,
        onSubmit: (values) => addArticleMutate({ article: values })
    });

    const rootClasses = clsx('np-article-create-page', className);

    return (
        <BasePage className={rootClasses}>
            <h1 className="np-article-create-page__title">Create new article</h1>
            <form className="np-article-create-page__form">
                <div className="flex flex-column gap-2 mb-6">
                    <div className="p-float-label">
                        <InputText id="title" className={clsx({ 'p-invalid': !!formik.errors.title })} onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.title} />
                        <label htmlFor="title">Title</label>
                    </div>
                    {formik.errors.title && <small className="p-error">{formik.errors.title}</small>}
                </div>
                <div className="flex flex-column gap-2 mb-6">
                    <div className="p-float-label">
                        <InputTextarea
                            id="description"
                            className={clsx({ 'p-invalid': !!formik.errors.description })}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.description}
                            rows={5}
                        />
                        <label htmlFor="description">Small description</label>
                    </div>
                    {formik.errors.description && <small className="p-error">{formik.errors.description}</small>}
                </div>
                <div className="flex flex-column gap-2 mb-6">
                    <div className="p-float-label">
                        <InputText id="image" className={clsx({ 'p-invalid': !!formik.errors.image })} onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.image} />
                        <label htmlFor="image">Image</label>
                    </div>
                    {formik.errors.image && <small className="p-error">{formik.errors.image}</small>}
                </div>
                <div className="flex flex-column gap-2 mb-6">
                    <div className="p-float-label">
                        <Dropdown
                            id="category"
                            className={clsx({ 'p-invalid': !!formik.errors.category })}
                            options={ARTICLE_CATEGORIES}
                            optionLabel="name"
                            optionValue="value"
                            placeholder="Select a category"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.category}
                        />
                        <label htmlFor="category">Category</label>
                    </div>
                    {formik.errors.category && <small className="p-error">{formik.errors.category}</small>}
                </div>
                <div className="flex flex-column gap-2 mb-6">
                    <div className="p-float-label">
                        <InputTextarea
                            id="content"
                            className={clsx({ 'p-invalid': !!formik.errors.content })}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.content}
                            rows={20}
                        />
                        <label htmlFor="content">Content</label>
                    </div>
                    {formik.errors.content && <small className="p-error">{formik.errors.content}</small>}
                </div>

                <div className="flex flex-column gap-2 mb-6">
                    <div className="p-float-label">
                        <Dropdown
                            id="published"
                            options={ARTICLE_STATUS}
                            optionLabel="name"
                            optionValue="value"
                            placeholder="Select a status"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.published}
                        />
                        <label htmlFor="published">Status</label>
                    </div>
                </div>

                <button className="np-button np-button--primary np-button--large" type="button" onClick={() => formik.handleSubmit()}>
                    Submit
                </button>
            </form>
        </BasePage>
    );
};

export default ArticleCreatePage;
