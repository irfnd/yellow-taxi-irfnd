/* eslint-disable */

// @ts-nocheck

// noinspection JSUnusedGlobalSymbols

// This file was automatically generated by TanStack Router.
// You should NOT make any changes in this file as it will be overwritten.
// Additionally, you should also exclude this file from your linter and/or formatter to prevent it from being checked or modified.

// Import Routes

import { Route as rootRoute } from './routes/__root'
import { Route as TripsImport } from './routes/trips'
import { Route as SignInImport } from './routes/sign-in'
import { Route as IndexImport } from './routes/index'

// Create/Update Routes

const TripsRoute = TripsImport.update({
  id: '/trips',
  path: '/trips',
  getParentRoute: () => rootRoute,
} as any)

const SignInRoute = SignInImport.update({
  id: '/sign-in',
  path: '/sign-in',
  getParentRoute: () => rootRoute,
} as any)

const IndexRoute = IndexImport.update({
  id: '/',
  path: '/',
  getParentRoute: () => rootRoute,
} as any)

// Populate the FileRoutesByPath interface

declare module '@tanstack/react-router' {
  interface FileRoutesByPath {
    '/': {
      id: '/'
      path: '/'
      fullPath: '/'
      preLoaderRoute: typeof IndexImport
      parentRoute: typeof rootRoute
    }
    '/sign-in': {
      id: '/sign-in'
      path: '/sign-in'
      fullPath: '/sign-in'
      preLoaderRoute: typeof SignInImport
      parentRoute: typeof rootRoute
    }
    '/trips': {
      id: '/trips'
      path: '/trips'
      fullPath: '/trips'
      preLoaderRoute: typeof TripsImport
      parentRoute: typeof rootRoute
    }
  }
}

// Create and export the route tree

export interface FileRoutesByFullPath {
  '/': typeof IndexRoute
  '/sign-in': typeof SignInRoute
  '/trips': typeof TripsRoute
}

export interface FileRoutesByTo {
  '/': typeof IndexRoute
  '/sign-in': typeof SignInRoute
  '/trips': typeof TripsRoute
}

export interface FileRoutesById {
  __root__: typeof rootRoute
  '/': typeof IndexRoute
  '/sign-in': typeof SignInRoute
  '/trips': typeof TripsRoute
}

export interface FileRouteTypes {
  fileRoutesByFullPath: FileRoutesByFullPath
  fullPaths: '/' | '/sign-in' | '/trips'
  fileRoutesByTo: FileRoutesByTo
  to: '/' | '/sign-in' | '/trips'
  id: '__root__' | '/' | '/sign-in' | '/trips'
  fileRoutesById: FileRoutesById
}

export interface RootRouteChildren {
  IndexRoute: typeof IndexRoute
  SignInRoute: typeof SignInRoute
  TripsRoute: typeof TripsRoute
}

const rootRouteChildren: RootRouteChildren = {
  IndexRoute: IndexRoute,
  SignInRoute: SignInRoute,
  TripsRoute: TripsRoute,
}

export const routeTree = rootRoute
  ._addFileChildren(rootRouteChildren)
  ._addFileTypes<FileRouteTypes>()

/* ROUTE_MANIFEST_START
{
  "routes": {
    "__root__": {
      "filePath": "__root.tsx",
      "children": [
        "/",
        "/sign-in",
        "/trips"
      ]
    },
    "/": {
      "filePath": "index.tsx"
    },
    "/sign-in": {
      "filePath": "sign-in.tsx"
    },
    "/trips": {
      "filePath": "trips.tsx"
    }
  }
}
ROUTE_MANIFEST_END */
