// UserProfile.ts
import { CollectionConfig } from 'payload/types';

const UserProfile: CollectionConfig = {
    slug: 'user-profiles',
    admin: {
        useAsTitle: 'user.email',
    },
    fields: [
        {
            name: 'user',
            type: 'relationship',
            relationTo: 'users',
            // hasOne: true,
            required: true,
        },
        {
            name: 'data',
            type: 'json',
            required: true,
        },
        {
            name: 'suggestedJobRole',
            type: 'text',
            required: false,
        },
        {
            name: 'academicPerformanceOverall',
            type: 'number',
            required: false,
        },
    ],
};

export default UserProfile;