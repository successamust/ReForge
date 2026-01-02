import { useEffect } from 'react';

const SEO = ({ title, description }) => {
    useEffect(() => {
        // Update Title
        document.title = title ? `${title} | ReForge` : 'ReForge';

        // Update Meta Description
        if (description) {
            let metaDescription = document.querySelector('meta[name="description"]');
            if (!metaDescription) {
                metaDescription = document.createElement('meta');
                metaDescription.name = 'description';
                document.head.appendChild(metaDescription);
            }
            metaDescription.content = description;
        }
    }, [title, description]);

    return null;
};

export default SEO;
