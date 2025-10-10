import axios from 'axios'
import { useMutation } from '@tanstack/react-query'
import { Login, LoginResponse } from '@/types/auth'

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
