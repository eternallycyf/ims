import { Suspense } from 'react'

import ProgressBar from '@/components/ProgressBar'
import { Content, Header } from '@/layouts/core'

import { useThemeToken } from '@/hooks/theme'
import { CircleLoading } from '@/components'

function BasicLayout() {
  const { colorBgElevated, colorTextBase } = useThemeToken()

  return (
    <section h-full w-full>
      <ProgressBar />

      <section
        className="h-full w-full flex flex-col overflow-hidden"
        style={{
          color: colorTextBase,
          background: colorBgElevated,
          transition:
            'color 200ms cubic-bezier(0.4, 0, 0.2, 1) 0ms, background 150ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',
        }}
      >
        <Suspense fallback={<CircleLoading />}>
          <Header />
          <Content />
        </Suspense>
      </section>
    </section>
  )
}

export default BasicLayout
