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

export function useActivateAgent() {
  const { accessToken } = useAuthStore()
  return useMutation({
    mutationKey: ['activate-agent'],
    mutationFn: async (agentId: number) => {
      const url = `${process.env.NEXT_PUBLIC_BASE_URL}/auth/activate-account`
      const response = await axios.post(
        url,
        { user_id: agentId },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      )

      console.log('Activate Agent Response:', response.data)
      return response.data
    },
  })
}

export function useUpdateAgent() {
  const { accessToken } = useAuthStore()
  return useMutation({
    mutationKey: ['update-agent'],
    mutationFn: async ({
      agentId,
      payload,
    }: {
      agentId: number
      payload: any
    }) => {
      const url = `${process.env.NEXT_PUBLIC_BASE_URL}/admin/agents/${agentId}`
      const response = await axios.put(url, payload, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })

      return response.data
    },
  })
}
