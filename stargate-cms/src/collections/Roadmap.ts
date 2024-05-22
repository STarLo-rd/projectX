// UserProfile.ts
import { CollectionConfig } from 'payload/types';

const RoadMap: CollectionConfig = {
    slug: 'roadmaps',
    admin: {
        useAsTitle: 'user.email',
    },
    fields: [
        {
            name: 'user',
            type: 'email',
            // relationTo: 'users',
            // hasOne: true,
            required: true
        },
        {
            name: 'data',
            type: 'json',
            required: true,
        },
    ],
};

export default RoadMap;