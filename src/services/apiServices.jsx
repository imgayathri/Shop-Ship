// src/config/apiConfig.js



const API_BASE_URL = 'https://auto-spare-parts-backend-gbsc.onrender.com';

export const API_URL = {
  //GetUrls
  Countries:`${API_BASE_URL}/locations/getAllCountries`,
  Cities:`${API_BASE_URL}/locations/getAllCities`,
   //posturls
  Login:`${API_BASE_URL}/allusers/userLogin`,
  Register:`${API_BASE_URL}/allusers/registerUser`,
  Otp:`${API_BASE_URL}/allusers/verifyUser`,
  ResendOtp:`${API_BASE_URL}/allusers/resendOtp`
};