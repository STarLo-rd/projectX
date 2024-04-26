import { TOKEN } from "../constants/constant-values";

export const getAuthorizationHeader = () => {
  const token = localStorage.getItem(TOKEN);
  if (!token) {
    throw new Error("Could not find access token");
  }
  return {
    Authorization: `JWT ${token}`,
  };
};

// Function to scroll to the top of the page smoothly
export const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth", // Smooth scroll
  });
};
