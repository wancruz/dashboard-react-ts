import api from "./api";

export interface User {
  id: number;
  email: string;
  password: string;
}

export async function getUserByEmail(email: string): Promise<User> {
 const response = await api.get(`/users`,{params: {email}});
 return response.data[0];
}
