import axios from 'axios'
import { useMutation } from '@tanstack/react-query'
import { Login, LoginResponse } from '@/types/auth'
import { removeLocalStorage } from '@/utils/remove-session-storage'

export function useLoginAdmin() {
  return useMutation({
    mutationKey: ['login-admin'],
    mutationFn: async ({ data }: { data: Login }) => {
      const url = `${process.env.NEXT_PUBLIC_BASE_URL}/admin/login`
      const response = await axios.post<LoginResponse>(url, data)
      return response.data
    },
  })
}

export function useLogoutAdmin() {
  return useMutation({
    mutationKey: ['logout-admin'],
    mutationFn: async () => {
      const url = `${process.env.NEXT_PUBLIC_BASE_URL}/admin/logout`
      const response = await axios.post(url)

      if (response.status !== 200) {
        throw new Error('Failed to logout')
      }
      removeLocalStorage('auth_token')

      console.log('Logout response:', response.data)
    },
  })
}
