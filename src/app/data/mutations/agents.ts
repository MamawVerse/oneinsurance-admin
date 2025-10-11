import { useAuthStore } from '@/store/auth-store'
import { useMutation } from '@tanstack/react-query'
import axios from 'axios'

export function useDeleteAgent() {
  const { accessToken } = useAuthStore()

  return useMutation({
    mutationKey: ['delete-agent'],
    mutationFn: async (agentId: number) => {
      const url = `${process.env.NEXT_PUBLIC_BASE_URL}/admin/agents/${agentId}`
      const response = await axios.delete(url, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })

      return response.data
    },
  })
}
