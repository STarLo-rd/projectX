import { CollectionConfig } from 'payload/types';

const Domains: CollectionConfig = {
    slug: 'domains',
    admin: {
        useAsTitle: 'name',
    },
    fields: [
        {
            name: 'name',
            type: 'text',
            required: true,
        },
        {
            name: 'description',
            type: 'text',
            required: false,
        },
        // Add any other fields relevant to your domain/interest representation
    ],
};

export default Domains;