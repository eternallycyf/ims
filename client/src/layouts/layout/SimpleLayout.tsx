import React from 'react'
import { useThemeToken } from '@/hooks/theme'
import { HeaderSimple } from '@/layouts/core'

interface Props {
  children: React.ReactNode
}
export default function SimpleLayout({ children }: Props) {
  const { colorBgElevated, colorTextBase } = useThemeToken()
  return (
    <div
      className="h-screen w-full flex flex-col"
      style={{
        color: colorTextBase,
        background: colorBgElevated,
      }}
    >
      <HeaderSimple />
      {children}
    </div>
  )
}
