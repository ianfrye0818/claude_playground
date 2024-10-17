import * as React from 'react'
import { createFileRoute } from '@tanstack/react-router'
import ChatbotInterface from '@/components/chat/chat'

export const Route = createFileRoute('/')({
  component: HomeComponent,
})

function HomeComponent() {
  return (
    <ChatbotInterface />
  )
}
