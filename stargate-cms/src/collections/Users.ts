import { CollectionConfig } from 'payload/types'

const Users: CollectionConfig = {
  slug: 'users',
  access: {
    read: () => true,
    create: ()=>true,
    update: ()=>true,
    delete: ()=>true,
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
    useAsTitle: 'email',
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
      name: 'interests',
      type: 'relationship',
      relationTo: 'domains', // Make sure this matches the slug of your 'domains' collection
      hasMany: true,
    },
    {
      name: 'credits',
      type: 'number',
      defaultValue: 100, // Set the initial credit points here
    },
  ],
}

export default Users
