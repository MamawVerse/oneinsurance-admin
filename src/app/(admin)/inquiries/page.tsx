'use client'

import { useState } from 'react'
import { InquiryList } from '@/components/inquiries/inquire-list'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { MessageSquare, Clock, CheckCircle, XCircle } from 'lucide-react'
import type { Inquiry } from '@/types/inquiry'

const mockInquiries: Inquiry[] = [
  {
    id: '1',
    type: 'agent-enrollment',
    status: 'new',
    message: 'I would like to be part of your agents team.',
    customerInfo: {
      firstName: 'Sarah',
      lastName: 'Wilson',
      email: 'sarah.wilson@email.com',
      phone: '+1 (555) 234-5678',
      preferredContact: 'email',
    },
    submittedAt: '2024-01-20T14:30:00Z',
    updatedAt: '2024-01-20T14:30:00Z',
  },
  {
    id: '2',
    type: 'claim',
    status: 'in-progress',
    message:
      "I submitted a claim last week and haven't heard back. Can you please provide an update?",
    customerInfo: {
      firstName: 'Robert',
      lastName: 'Brown',
      email: 'robert.brown@email.com',
      phone: '+1 (555) 345-6789',
      preferredContact: 'phone',
    },
    policyNumber: 'POL-2024-001',
    submittedAt: '2024-01-19T09:15:00Z',
    updatedAt: '2024-01-20T10:30:00Z',
    assignedTo: 'John Smith',
  },
  {
    id: '3',
    type: 'support',
    status: 'resolved',
    message:
      "I'm unable to access my account. Can you help me reset my password?",
    customerInfo: {
      firstName: 'Emily',
      lastName: 'Davis',
      email: 'emily.davis@email.com',
      phone: '+1 (555) 456-7890',
      preferredContact: 'email',
    },
    submittedAt: '2024-01-18T16:45:00Z',
    updatedAt: '2024-01-19T08:20:00Z',
    assignedTo: 'Jane Doe',
    response: 'Password reset link has been sent to your email address.',
    responseAt: '2024-01-19T08:20:00Z',
  },
]

export default function InquiriesPage() {
  const [inquiries, setInquiries] = useState<Inquiry[]>(mockInquiries)

  const inquiryCounts = {
    total: inquiries.length,
    new: inquiries.filter((i) => i.status === 'new').length,
    inProgress: inquiries.filter((i) => i.status === 'in-progress').length,
    resolved: inquiries.filter((i) => i.status === 'resolved').length,
    closed: inquiries.filter((i) => i.status === 'closed').length,
  }

  const handleUpdateInquiry = (updatedInquiry: Inquiry) => {
    setInquiries(
      inquiries.map((inquiry) =>
        inquiry.id === updatedInquiry.id ? updatedInquiry : inquiry
      )
    )
  }

  return (
    <div className="container mx-auto space-y-6 py-6">
      <div>
        <h1 className="text-3xl font-bold">Customer Inquiries</h1>
        <p className="text-muted-foreground">
          Manage customer questions, requests, and support tickets
        </p>
      </div>

      <div className="grid grid-cols-2 gap-4 md:grid-cols-5">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Inquiries
            </CardTitle>
            <MessageSquare className="text-muted-foreground h-4 w-4" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{inquiryCounts.total}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">New</CardTitle>
            <div className="h-2 w-2 rounded-full bg-blue-500"></div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{inquiryCounts.new}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">In Progress</CardTitle>
            <Clock className="h-4 w-4 text-yellow-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{inquiryCounts.inProgress}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Resolved</CardTitle>
            <CheckCircle className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{inquiryCounts.resolved}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Closed</CardTitle>
            <XCircle className="h-4 w-4 text-gray-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{inquiryCounts.closed}</div>
          </CardContent>
        </Card>
      </div>

      <InquiryList
        inquiries={inquiries}
        onUpdateInquiry={handleUpdateInquiry}
      />
    </div>
  )
}
