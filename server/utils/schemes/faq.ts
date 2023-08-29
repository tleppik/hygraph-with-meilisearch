import { astToHtmlString } from '@graphcms/rich-text-html-renderer';

export interface FAQ {
    id: string;
    created: Date;
    answer: string;
    question: string;
}

/**
 * Convert the Hygraph model to a Meilisearch compatible model 
 * @param article - Hygraph Model
 * @returns {FAQ} FAQ Article for Meilisearch Index
 */
export function convertToFAQ(article: any): FAQ {
    
    const locale = article.data.localizations;
    const content = locale[0].answer.raw;

    const answer = astToHtmlString({
        content,
    });
    
    const document: FAQ = {
        id: article.data.id,
        created: article.data.createdAt,
        answer: answer,
        question: locale[0].question
    }

    return document;
}