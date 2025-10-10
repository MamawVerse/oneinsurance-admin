'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useForm } from '@tanstack/react-form'
import Link from 'next/link'
import { Loader2 } from 'lucide-react'
import Image from 'next/image'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { FieldInfo } from '@/components/ui/form'
import { PasswordInput } from '@/components/ui/password-input'
import { LoginSchema, type Login, type LoginResponse } from '@/types/auth'
import { useLoginAdmin } from '@/app/data/mutations/auth'
import { useAuthStore } from '@/store/auth-store'
import { toast } from 'sonner'

export default function LoginPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [loginError, setLoginError] = useState<string | null>(null)
  const { mutateAsync: loginAdmin } = useLoginAdmin()
  const { login, isAuthenticated } = useAuthStore()
  const [hydrated, setHydrated] = useState(false)

  useEffect(() => {
    setHydrated(true)
  }, [])

  useEffect(() => {
    // Check if agent is authenticated
    if (isAuthenticated && hydrated) {
      // Redirect to login page if not authenticated
      router.push('/inquiries')
      return
    }
  }, [isAuthenticated, router, hydrated])

  const form = useForm({
    defaultValues: {
      email: '',
      password: '',
    } as Login,
    validators: {
      onChange: LoginSchema,
    },
    onSubmit: async ({ value }) => {
      try {
        setIsLoading(true)
        setLoginError(null)

        const result = (await loginAdmin({ data: value })) as LoginResponse

        // Store authentication data in the store
        login(result)

        // Handle successful login
        toast.success(`Welcome back, ${result.data.user.name}!`)

        // Redirect to admin inquiries
        router.push('/inquiries')
      } catch (error: any) {
        console.error('Login error:', error)

        // Handle different types of errors
        if (error?.response?.status === 422) {
          setLoginError('Invalid email or password format')
        } else if (error?.response?.status === 401) {
          setLoginError(
            'Invalid credentials. Please check your email and password.'
          )
        } else if (error?.response?.status === 403) {
          setLoginError('Account not verified or access denied')
        } else {
          setLoginError('Login failed. Please try again.')
        }
      } finally {
        setIsLoading(false)
      }
    },
  })

  return (
    <div className="flex w-full flex-col gap-4 rounded-2xl bg-white p-10">
      <div className="flex justify-between">
        <Image
          src="/images/logo.png"
          alt="Company Logo"
          width={150}
          height={100}
          className="object-contain"
        />
        <Image
          src="/images/IFRC.png"
          alt="IFRC Logo"
          width={100}
          height={100}
          className="object-contain"
        />
      </div>
      <h1 className="from-primary to-lilac w-fit bg-gradient-to-r bg-clip-text py-2 text-3xl font-black text-transparent md:text-6xl">
        Log In
      </h1>

      <form
        onSubmit={(e) => {
          e.preventDefault()
          form.handleSubmit()
        }}
      >
        <div className="flex w-full flex-col gap-4">
          {/* Email Field */}
          <form.Field name="email">
            {(field) => (
              <div className="flex w-full flex-col gap-2">
                <Label htmlFor={field.name}>Email *</Label>
                <Input
                  name={field.name}
                  type="email"
                  value={field.state.value}
                  onChange={(e) => {
                    field.handleChange(e.target.value)
                  }}
                  placeholder="Enter your email address"
                  disabled={isLoading}
                />
                <FieldInfo field={field} />
              </div>
            )}
          </form.Field>

          {/* Password Field */}
          <form.Field name="password">
            {(field) => (
              <div className="flex w-full flex-col gap-2">
                <Label htmlFor={field.name}>Password *</Label>
                <PasswordInput
                  name={field.name}
                  value={field.state.value}
                  onChange={(e) => {
                    field.handleChange(e.target.value)
                  }}
                  placeholder="Enter your password"
                  disabled={isLoading}
                />
                <FieldInfo field={field} />
              </div>
            )}
          </form.Field>

          {/* Error Message */}
          {loginError && (
            <div className="bg-destructive/15 text-destructive rounded-md p-3 text-sm">
              {loginError}
            </div>
          )}

          <div className="text-muted-foreground flex justify-end text-sm">
            <Link
              href="/agent/forgot-password"
              className="hover:text-primary underline underline-offset-4"
            >
              Forgot your password?
            </Link>
          </div>

          {/* Login Button */}
          <div className="flex justify-end">
            <form.Subscribe
              selector={(state) => [state.canSubmit, state.isSubmitting]}
            >
              {([canSubmit, isSubmitting]) => (
                <Button
                  type="submit"
                  disabled={!canSubmit || isSubmitting || isLoading}
                  className="from-primary to-lilac hover:from-primary/90 hover:to-lilac/90 focus:from-primary/90 focus:to-lilac/90 w-fit rounded-full bg-gradient-to-r px-4 text-white"
                >
                  {isSubmitting || isLoading ? (
                    <Loader2 className="animate-spin" />
                  ) : (
                    <span className="px-5">Log in</span>
                  )}
                </Button>
              )}
            </form.Subscribe>
          </div>
        </div>
      </form>

      {/* Additional Actions */}
      <div className="relative flex items-center justify-start py-4">
        <div className="text-muted-foreground flex flex-col items-start gap-2 text-sm">
          <p>
            Don't have an account?{' '}
            <Link
              href="/agent/signup"
              className="hover:text-primary underline underline-offset-4"
            >
              Sign up now!
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
