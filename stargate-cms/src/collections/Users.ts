import { CollectionConfig } from "payload/types";

const Users: CollectionConfig = {
  slug: "users",
  access: {
    read: () => true,
    create: () => true,
    update: () => true,
    delete: () => true,
  },
  auth: {
    useAPIKey: true,
    tokenExpiration: 3600,
    maxLoginAttempts: 5,
    lockTime: 24 * 60 * 60 * 1000,

    cookies: {
      secure: true,
      sameSite: "strict",
    },
    // verify: {
    //   generateEmailHTML: generateVerifyEmailHTML,
    //   generateEmailSubject: generateVerifyEmailSubject,
    // },
    // forgotPassword: {
    //   generateEmailHTML: generateForgotPasswordEmailHTML,
    // },
  },
  admin: {
    useAsTitle: "email",
  },
  hooks: {
    beforeChange: [
      async ({ data, operation, req }) => {
        const { role, credits } = data;
        const isCreate = operation === "create";
        const isUpdate = operation === "update";
        const user = req?.user || {};

        if (isCreate) {
          // Set credits based on role for new user creation
          switch (role) {
            case "guest":
              data.credits = 10;
              break;
            case "user":
              data.credits = 100;
              break;
            case "premium":
              data.credits = 200;
              break;
            default:
              data.credits = 100;
          }
        } else if (isUpdate && user.role) {
          // Update credits based on new role when role changes
          console.log("called from 58");
          switch (role) {
            case "guest":
              data.credits = 10;
              break;
            case "user":
              data.credits = 100;
              break;
            case "premium":
              data.credits = 200;
              break;
            default:
              data.credits = 100;
          }
        } else if (isUpdate) {
          // Preserve existing credits when only other fields are updated
          data.credits = user.credits || credits;
        }
      },
    ],
  },
  fields: [
    // Email added by default
    // Add more fields as needed
    {
      name: "email",
      type: "text",
      required: true,
      unique: true, // Ensure unique email addresses
    },
    {
      name: "name",
      type: "text",
      required: false,
    },

    {
      name: "interests",
      type: "relationship",
      relationTo: "domains", // Make sure this matches the slug of your 'domains' collection
      hasMany: true,
    },
    {
      name: "credits",
      type: "number",
      access: {
        read: () => true,
        create: () => false,
        update: () => true,
      },
    },
    {
      name: "role",
      type: "select",
      required: true,
      options: [
        {
          label: "User",
          value: "user",
        },
        {
          label: "Premium",
          value: "premium",
        },
        {
          label: "Guest",
          value: "guest",
        },
      ],
    },
  ],
};

export default Users;
