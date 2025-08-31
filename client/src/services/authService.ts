// import API from "../utils/api";

// // ✅ Register User
// // export const registerUser = async (data: {
// //   name: string;
// //   email: string;
// //   password: string;
// //   role: string;
// // }) => {
// //   try {
// //     const res = await API.post("/auth/register", data);
// //     return res.data;
// //   } catch (error: any) {
// //     throw error.response?.data || { msg: "Registration failed" };
// //   }
// // };

// export const registerUser = async (data: {
//   username: string;  // frontend uses username
//   email: string;
//   password: string;
//   role: string;
//   institution?: string;
//   subjects?: string;
// }) => {
//   try {
//     const payload = {
//       name: data.username,  // map username → name
//       email: data.email,
//       password: data.password,
//       role: data.role,
//       ...(data.role === 'teacher' && data.institution ? { institution: data.institution } : {}),
//       ...(data.role === 'teacher' && data.subjects ? { subject: data.subjects } : {}),
//     };

//     const res = await API.post("/auth/register", payload);
//     return res.data;
//   } catch (error: any) {
//     throw error.response?.data || { msg: "Registration failed" };
//   }
// };


// // ✅ Login User
// export const loginUser = async (data: {
//   email: string;
//   password: string;
// }) => {
//   try {
//     const res = await API.post("/auth/login", data);
//     // token ko localStorage me save kar lo
//     if (res.data.token) {
//       localStorage.setItem("token", res.data.token);
//     }
//     return res.data;



import axios from "axios";

// ✅ Use deployed backend URL from Vercel env
const API_BASE = import.meta.env.VITE_API_URL; // must be set in Vercel env variables
export const API = axios.create({
  baseURL: API_BASE,
  headers: { "Content-Type": "application/json" },
});

// ✅ Register User
export const registerUser = async (data: {
  username: string;  
  email: string;
  password: string;
  role: string;
  institution?: string;
  subjects?: string;
}) => {
  try {
    const payload = {
      name: data.username,  // map username → name
      email: data.email,
      password: data.password,
      role: data.role,
      ...(data.role === 'teacher' && data.institution ? { institution: data.institution } : {}),
      ...(data.role === 'teacher' && data.subjects ? { subject: data.subjects } : {}),
    };

    const res = await API.post("/register", payload); // API_BASE already has /auth
    return res.data;
  } catch (error: any) {
    throw error.response?.data || { msg: "Registration failed" };
  }
};

// ✅ Login User
export const loginUser = async (data: {
  email: string;
  password: string;
}) => {
  try {
    const res = await API.post("/login", data); // API_BASE already has /auth
    if (res.data.token) {
      localStorage.setItem("token", res.data.token); // save token
    }
    return res.data;
  } catch (error: any) {
    throw error.response?.data || { msg: "Login failed" };
  }
};

//   } catch (error: any) {
//     throw error.response?.data || { msg: "Login failed" };
//   }
// };

