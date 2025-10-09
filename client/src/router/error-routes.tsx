import { Suspense } from 'react'
import { Outlet } from 'react-router-dom'

import { CircleLoading } from '@/components'
import { Page403, Page404, Page500 } from '@/layouts/core'

import type { AppRouteObject } from '#/router'
import { SimpleLayout } from '@/layouts/layout'

/**
 * error routes
 * 403, 404, 500
 */
export const ErrorRoutes: AppRouteObject = {
  element: (
    <SimpleLayout>
      <Suspense fallback={<CircleLoading />}>
        <Outlet />
      </Suspense>
    </SimpleLayout>
  ),
  children: [
    { path: '403', element: <Page403 /> },
    { path: '404', element: <Page404 /> },
    { path: '500', element: <Page500 /> },
  ],
}
