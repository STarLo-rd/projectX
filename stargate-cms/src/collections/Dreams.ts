// UserProfile.ts
import { CollectionConfig } from "payload/types";

const Dreams: CollectionConfig = {
  slug: "dreams",
  admin: {
    useAsTitle: "user.email",
  },
  fields: [
    {
      name: "user",
      type: "email",
      // relationTo: 'users',
      // hasOne: true,
      required: true,
    },
    // {
    //     name: 'data',
    //     type: 'text',
    //     required: true,
    // },
    {
      name: "dreams",
      type: "array",
      required: true,
      maxRows: 5,
      fields: [
        {
          name: "dream",
          type: "text",
          required: true,
        },
        {
          name: "data",
          type: "text",
          required: true,
        },
      ],
    },
    {
      name: "history",
      type: "array",
      fields: [
        {
          name: "date",
          type: "date",
          required: true,
        },
        {
          name: "day",
          type: "text",
          required: true,
        },
        {
          name: "habits",
          type: "json",
        },
      ],
    },
  ],
  hooks: {
    beforeChange: [
      async ({ req, operation, data, originalDoc }) => {
        if (operation === "create" || operation === "update") {
          if (data.interests && data.interests.length > 5) {
            throw new Error(
              "You cannot have more than five interests per roadmap."
            );
          }
        }
      },
    ],
  },
};

export default Dreams;
