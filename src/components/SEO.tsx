import { Helmet } from 'react-helmet-async';

interface SEOProps {
    title: string;
    description: string;
    image?: string;
    url?: string;
    type?: string;
}

const SEO = ({
    title,
    description,
    image = 'https://lovable.dev/opengraph-image-p98pqg.png',
    url = window.location.href,
    type = 'website'
}: SEOProps) => {
    const siteTitle = 'The Polissi Lab';
    const fullTitle = `${title} | ${siteTitle}`;

    return (
        <Helmet>
            {/* Standard metadata tags */}
            <title>{fullTitle}</title>
            <meta name='description' content={description} />

            {/* Open Graph tags */}
            <meta property='og:title' content={fullTitle} />
            <meta property='og:description' content={description} />
            <meta property='og:type' content={type} />
            <meta property='og:url' content={url} />
            <meta property='og:image' content={image} />

            {/* Twitter tags */}
            <meta name='twitter:card' content='summary_large_image' />
            <meta name='twitter:title' content={fullTitle} />
            <meta name='twitter:description' content={description} />
            <meta name='twitter:image' content={image} />
        </Helmet>
    );
};

export default SEO;
