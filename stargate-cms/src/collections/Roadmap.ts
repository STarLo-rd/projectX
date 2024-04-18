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
        // {
        //     name: 'data',
        //     type: 'text',
        //     required: true,
        // },
        {
            name: 'interests',
            type: 'array',
            required: true,
            maxRows: 5,
            fields: [
              {
                name: 'title',
                type: 'text',
                required: true,
              },
              {
                name: 'data',
                type: 'text',
                required: true,
              },
            ],
        },
    ],
    hooks: {
        beforeChange: [async ({ req, operation, data, originalDoc }) => {
            if (operation === 'create' || operation === 'update') {
                if (data.interests && data.interests.length > 5) {
                    throw new Error('You cannot have more than five interests per roadmap.');
                }
            }
        }],
    },
};

export default RoadMap;