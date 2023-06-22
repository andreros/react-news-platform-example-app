import { IArticle } from '@/models/Article';

export const validateForm = (values: IArticle) => {
    const errors = {} as IArticle;

    const category = values.category?.trim();
    const title = values.title?.trim();
    const description = values.description?.trim();
    const image = values.image?.trim();
    const content = values.content?.trim();

    if (!category) errors.category = 'This field is required.';
    if (!title) errors.title = 'This field is required.';
    if (!description) errors.description = 'This field is required.';
    if (!image) errors.image = 'This field is required.';
    if (!content) errors.content = 'This field is required.';

    return errors;
};
