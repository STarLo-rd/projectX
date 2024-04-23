// #src/utils/findUser.js
import payload from "payload";

/**
 * Finds a user by ID and collection name using Payload CMS.
 * @param {Object} params - The parameters containing the ID and collection name of the user.
 * @returns {Promise<Object|null>} The user object if found, otherwise null.
 */
const findUser = async ({ _id, collection }) => {
  try {
    // Access the database using Payload's find operation
    const user = await payload.find({
      collection,
      where: {
        id: {
          equals: _id,
        },
      },
      limit: 1,
    });

    if (user && user.docs.length > 0) {
      return user.docs[0];
    } else {
      console.error(
        `No user found with ID '${_id}' in collection '${collection}'.`
      );
      return null;
    }
  } catch (error) {
    console.error("Error finding user:", error);
    return null;
  }
};

/**
 * Deducts credits from the user's account.
 * @param {string} userId - The ID of the user whose credits are to be deducted.
 * @param {number} amount - The amount of credits to deduct.
 * @returns {Promise<boolean>} Returns true if the operation is successful, false otherwise.
 */
const deductCredits = async (userId, amount) => {
  try {
    // Fetch the current user to check the available credits
    const currentUser = await payload.find({
      collection: "users",
      where: {
        id: {
          equals: userId,
        },
      },
      limit: 1,
    });

    if (!currentUser || currentUser.docs.length === 0) {
      console.error(`No user found with ID '${userId}'.`);
      return false;
    }

    const user = currentUser.docs[0];
    if (user.credits < amount) {
      console.error(`Insufficient credits for user ID '${userId}'.`);
      return false;
    }

    // Update the user's credits
    const result = await payload.update({
      collection: "users",
      id: userId,
      data: {
        credits: user.credits - amount,
      },
    });

    return true;
  } catch (error) {
    console.error("Error deducting credits:", error);
    return false;
  }
};

export { findUser, deductCredits };
