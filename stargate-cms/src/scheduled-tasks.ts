// #src/scheduledTasks.js
import cron from 'node-cron';
import payload from 'payload';

/**
 * Resets user credits every 12 hours.
 */
const refillCredits = async () => {
  try {
    console.log("Refilling user credits...");

    // Fetch all users
    const users = await payload.find({
      collection: 'users',
      limit: 10000, // Adjust based on your expected number of users
    //   fields: ['id']  // Only fetch the ids to minimize data transfer
    });

    // Update each user's credits
    const updates = users.docs.map(async (user) => {
      return payload.update({
        collection: 'users',
        id: user.id,
        data: {
          credits: 80 // Reset credits to 80 for each user
        }
      });
    });

    // Wait for all updates to complete
    await Promise.all(updates);

    console.log("Credits refilled for all users.");
  } catch (error) {
    console.error("Error refilling credits:", error);
  }
};

// Schedule the task to run every 12 hours
cron.schedule('0 */12 * * *', refillCredits);

// testing for 20 seconds
// cron.schedule('*/20 * * * * *', refillCredits);