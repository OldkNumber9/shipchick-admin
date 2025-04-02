import api from "./api"

export interface LoginCredentials {
  email: string
  password: string
}

export interface RegisterCredentials {
  email: string
  password: string
  username: string
}

export interface User {
  id: string
  email: string
  name: string
  role: string
}

class AuthService {
  async login(credentials: LoginCredentials): Promise<string> {
    const response = await api.post("/auth/admin/login", credentials)
    const { token } = response.data

    // Store the token in localStorage
    localStorage.setItem("token", token)

    return token
  }

  async register(credentials: RegisterCredentials): Promise<User> {
    const response = await api.post("/auth/admin/register", credentials)
    return response.data
  }

  async logout(): Promise<void> {
    localStorage.removeItem("token")
  }

  // async getCurrentUser(): Promise<User | null> {
  //   try {
  //     const response = await api.get("/auth/me")
  //     return response.data
  //   } catch (error) {
  //     return null
  //   }
  // }

  isAuthenticated(): boolean {
    return !!localStorage.getItem("token")
  }
}

export default new AuthService()

