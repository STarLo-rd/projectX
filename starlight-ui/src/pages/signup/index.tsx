import React, { useState, useEffect } from 'react';
import firebase from '../../firebase';
import AxiosInstance from '../../services/axios-instance';
import { useAuth } from '../../hooks/auth-context'; // Import the useAuth hook

const Signup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const { login } = useAuth(); // Get the login function from the AuthContext

  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged(async (user) => {
      if (user && user.emailVerified) {
        try {
          // Create the user in Payload CMS
          const response = await AxiosInstance.post('/users', {
            email: user.email,
            password: password, // You may need to provide a password or generate a random one
            enableAPIKey: true,
            name: user.displayName || 'User', // You can use user.displayName or provide a default name
            credits: 80, // Set the desired initial credits value
          });

          if (response.status === 200) {
            // User created successfully, now log in the user
            const loginResponse = await login(user.email, password);
            if (loginResponse.token) {
              // User logged in successfully, you can perform additional actions here
              console.log('User logged in:', user.email);
            } else {
              console.error('Failed to log in user:', loginResponse.error);
            }
          } else {
            console.error('Failed to create user:', response.data.error);
          }
        } catch (err) {
          console.error('Error creating or logging in user:', err.message);
        }
      }
    });

    return () => unsubscribe();
  }, []);

  const handleSignup = async (e) => {
    e.preventDefault();
    setError(null);
    try {
      const userCredential = await firebase.auth().createUserWithEmailAndPassword(email, password);
      const user = userCredential.user;
      await user.sendEmailVerification();
      alert('Verification email sent! Please check your inbox.');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="signup-form">
      <h2>Sign Up</h2>
      {error && <p className="error">{error}</p>}
      <form onSubmit={handleSignup}>
        <label htmlFor="email">Email:</label>
        <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        <label htmlFor="password">Password:</label>
        <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
};

export default Signup;