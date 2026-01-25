import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'DevOS CLI - Documentation',
  description: 'Complete guide to using DevOS CLI - your comprehensive development toolkit',
}

export default function DocsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
