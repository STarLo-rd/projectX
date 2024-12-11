const { OAuth2Client } = require("google-auth-library");

// Replace with your Google API client ID
const CLIENT_ID =
  "662460220289-bbjjlhmt16nf1ogjt2odpqn545shsugi.apps.googleusercontent.com";

// Initialize the Google API client
const client = new OAuth2Client(CLIENT_ID);

// Function to validate the SSO token
const validateSSOToken = async (ssoToken) => {
  try {
    // Verify the token
    const ticket = await client.verifyIdToken({
      idToken: ssoToken.credential,
      audience: CLIENT_ID,
    });

    // Get the payload from the verified token
    const payload = ticket.getPayload();

    // Return the user information from the payload
    return payload;
  } catch (error) {
    console.error("Error verifying SSO token:", error);
    return null;
  }
};


export {validateSSOToken}