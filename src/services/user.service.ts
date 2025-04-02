import api from "./api"
import type { EditRequest, User } from "../types/user"

interface PaginatedUsersResponse {
    users: User[];
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  }
  
interface PaginatedEditRequestsResponse {
  editRequests: EditRequest[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

  interface PaginationParams {
    page?: number;
    limit?: number;
    search?: string;
    sort?: string;
    status?: string;
  }
class UserService {
    async getPaginatedUsers(params: PaginationParams): Promise<PaginatedUsersResponse> {
        const response = await api.get("/users-admin", { params });
        return response.data;
      }

      async getPaginatedEditRequests(params: PaginationParams): Promise<PaginatedEditRequestsResponse> {
        const response = await api.get("/users-admin/edit-requests", { params });
        return response.data;
      }
        async approveEditRequest(id: string): Promise<EditRequest> {
            const response = await api.post(`/users-admin/edit-requests/${id}/approve`);
            return response.data;
        }
    
        async rejectEditRequest(id: string): Promise<EditRequest> {
            const response = await api.post(`/users-admin/edit-requests/${id}/reject`);
            return response.data;
        }
    
}
export default new UserService()
