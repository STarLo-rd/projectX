import { motion } from "framer-motion";
import SSOLogin from "../../components/sso";
const Signup = () => {
  return (
    <>
      <div className="relative flex items-center justify-center min-h-screen overflow-hidden">
        {/* Background Animation */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.2 }}
          transition={{ duration: 2, delay: 1 }}
          className="absolute top-0 left-0 w-full h-full"
        >
          <svg
            className="w-full h-full"
            viewBox="0 0 200 200"
            xmlns="http://www.w3.org/2000/svg"
          >
            <motion.path
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 2, delay: 1, ease: "easeInOut" }}
              d="M 20 100 C 20 50 80 50 80 100 C 80 150 120 150 120 100 C 120 50 180 50 180 100 C 180 150 120 150 120 100"
              stroke="#4299e1"
              strokeWidth="2"
              fill="none"
            />
          </svg>
        </motion.div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.2 }}
          transition={{ duration: 2, delay: 1 }}
          className="absolute top-0 left-0 w-full h-full"
        >
          <svg
            className="w-full h-full"
            viewBox="0 0 200 200"
            xmlns="http://www.w3.org/2000/svg"
          >
            <motion.path
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 2, delay: 1, ease: "easeInOut" }}
              d="M 20 100 C 20 50 80 50 80 100 C 80 150 20 150 20 100"
              stroke="#4299e1"
              strokeWidth="2"
              fill="none"
            />
          </svg>
        </motion.div>

        <div className="mx-auto max-w-3xl px-4 space-y-8 z-10">
          <motion.div
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="space-y-2 text-center"
          >
            <h1 className="text-4xl font-bold">Create an account</h1>
            <p className="text-gray-500 dark:text-gray-400">
              We provide only SSO for better security.
            </p>
          </motion.div>
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.8 }}
            className="mx-auto grid max-w-[400px] gap-4 justify-center"
          >
            <SSOLogin />
          </motion.div>
        </div>
      </div>
    </>
  );
};

export default Signup;
