// socket.ts
import { io } from "socket.io-client";

export const socket = io(import.meta.env.VITE_API_URL, {
  path: "/ws",
  auth: { userId: currentUser.id }, // minimal auth used by server
  transports: ["websocket"]
});
