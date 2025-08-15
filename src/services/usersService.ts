import apiClient from '../config/api';
import { UpdateUserInput, UserProfile } from '@/types';

export class UsersService {
  /**
   * Update user profile information
   * @param updateData - The user data to update
   * @returns Promise with the updated user data
   */
  public static async updateUser(updateData: UpdateUserInput): Promise<UserProfile> {
    const response = await apiClient.put<{ user: UserProfile }>('/users/update-user', updateData);
    if (response.success && response.data) {
      return response.data!.user as UserProfile;
    }
    throw new Error(response.error);
  }
}