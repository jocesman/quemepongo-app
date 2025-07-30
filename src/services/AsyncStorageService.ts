// AsyncStorageService.ts
import AsyncStorage from '@react-native-async-storage/async-storage';

export const AsyncStorageService = {
  // Guardar token y datos de usuario
  async saveSession(token: string, user: any) {
    try {
      await AsyncStorage.setItem('token', token);
      await AsyncStorage.setItem('user', JSON.stringify(user));
    } catch (error) {
      console.error('Error al guardar sesión:', error);
    }
  },

  // Obtener token
  async getToken(): Promise<string | null> {
    try {
      return await AsyncStorage.getItem('token');
    } catch (error) {
      console.error('Error al obtener token:', error);
      return null;
    }
  },

  // Obtener usuario
  async getUser(): Promise<any | null> {
    try {
      const userStr = await AsyncStorage.getItem('user');
      return userStr ? JSON.parse(userStr) : null;
    } catch (error) {
      console.error('Error al obtener usuario:', error);
      return null;
    }
  },

  // Borrar sesión
  async clearSession() {
    try {
      await AsyncStorage.removeItem('token');
      await AsyncStorage.removeItem('user');
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
    }
  }
};
