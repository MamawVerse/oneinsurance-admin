'use client'

import * as React from 'react'
import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { MoreHorizontal, Trash, Edit2, Check } from 'lucide-react'
import { DataTable, DataTableAction } from '@/components/ui/data-table'
import { ColumnDef } from '@tanstack/react-table'

type Agent = {
  id: number
  company_id: number | null
  role: number
  username: string | null
  first_name: string
  middle_name: string | null
  last_name: string
  designation: string | null
  avatar: string | null
  email: string
  status: string
  phone: string | null
  created_at: string
  updated_at: string
}

const mockAgents: Agent[] = [
  {
    id: 8,
    company_id: null,
    role: 20,
    username: null,
    first_name: 'John',
    middle_name: null,
    last_name: 'Doe',
    designation: 'Agent',
    avatar: null,
    email: 'johndoe2@ifrc.com',
    status: 'pending',
    phone: '09123456999',
    created_at: '2025-10-06T07:30:07.000000Z',
    updated_at: '2025-10-06T07:30:07.000000Z',
  },
  {
    id: 9,
    company_id: null,
    role: 20,
    username: null,
    first_name: 'Jane',
    middle_name: null,
    last_name: 'Smith',
    designation: 'Senior Agent',
    avatar: null,
    email: 'janesmith@ifrc.com',
    status: 'active',
    phone: '09170001111',
    created_at: '2025-08-01T10:00:00.000000Z',
    updated_at: '2025-09-01T10:00:00.000000Z',
  },
]

export default function AgentsPage() {
  const [agents] = useState<Agent[]>(mockAgents)

  const columns = React.useMemo<ColumnDef<Agent, any>[]>(
    () => [
      {
        accessorKey: 'first_name',
        header: 'Agent',
        cell: ({ row }) => {
          const a = row.original
          return (
            <div className="flex items-center gap-3">
              <Avatar>
                {a.avatar ? (
                  <AvatarImage
                    src={a.avatar}
                    alt={`${a.first_name} ${a.last_name}`}
                  />
                ) : (
                  <AvatarFallback>
                    {a.first_name.charAt(0)}
                    {a.last_name.charAt(0)}
                  </AvatarFallback>
                )}
              </Avatar>
              <div>
                <div className="font-medium">
                  {a.first_name} {a.last_name}
                </div>
                <div className="text-muted-foreground text-xs">
                  @
                  {a.username ??
                    `${a.first_name.toLowerCase()}.${a.last_name.toLowerCase()}`}
                </div>
              </div>
            </div>
          )
        },
      },
      {
        accessorKey: 'email',
        header: 'Email',
      },
      {
        accessorKey: 'phone',
        header: 'Phone',
      },
      {
        accessorKey: 'designation',
        header: 'Designation',
      },
      {
        accessorKey: 'status',
        header: 'Status',
        cell: ({ row }) => (
          <span
            className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-medium ${
              row.original.status === 'active'
                ? 'bg-green-100 text-green-800'
                : row.original.status === 'pending'
                  ? 'bg-yellow-100 text-yellow-800'
                  : 'bg-gray-100 text-gray-800'
            }`}
          >
            {row.original.status}
          </span>
        ),
      },
    ],
    []
  )

  const actions: DataTableAction<Agent>[] = [
    {
      label: 'Activate',
      icon: <Check className="h-4 w-4" />,
      onClick: () => {},
      variant: 'default',
    },
    {
      label: 'Update',
      icon: <Edit2 className="h-4 w-4" />,
      onClick: () => {},
    },
    {
      label: 'Delete',
      icon: <Trash className="h-4 w-4" />,
      onClick: () => {},
      variant: 'destructive',
    },
  ]

  return (
    <div className="container mx-auto space-y-6 py-6">
      <div>
        <h1 className="text-3xl font-bold">Agents</h1>
        <p className="text-muted-foreground">
          Manage agents registered in the system
        </p>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between px-6">
            {/* <CardTitle>Agent List</CardTitle> */}
            {/* <div className="flex items-center gap-2">
              <Button variant="outline" size="sm">
                New Agent
              </Button>
            </div> */}
          </div>
        </CardHeader>
        <CardContent>
          <div>
            <DataTable
              columns={columns}
              data={agents}
              searchKey="email"
              actions={actions}
              pageSize={5}
            />
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
