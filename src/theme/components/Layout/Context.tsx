import React, { createContext, useContext, useState } from 'react'
import { DrawerProps } from '@mui/material/Drawer'
import Box from '@mui/material/Box'

type LayoutDrawers = Record<string, DrawerProps>

type LayoutContextValue = {
  getDrawers: () => LayoutDrawers
  setDrawers: React.Dispatch<React.SetStateAction<LayoutDrawers>>
  registerDrawer: (name: string, drawer: DrawerProps) => void
  unregisterDrawer: (name: string) => void
  getDrawer: (name: string) => DrawerProps | void
  setDrawer: (name: string, drawer: Partial<DrawerProps>) => void
}

const LayoutContext = createContext<LayoutContextValue | null>(null)

export const useLayoutContext = () => {
  const layoutContext = useContext(LayoutContext)

  if (!layoutContext)
    throw new Error('useLayoutContext error: LayoutContext not found')

  return layoutContext
}

type Props = {
  children: React.ReactNode
}

const LayoutContextProvider = ({ children }: Props) => {
  const [drawers, setDrawers] = useState<Record<string, DrawerProps>>({})
  const getDrawers = () => drawers
  const registerDrawer = (name: string, drawerChildren: React.ReactNode) => {
    if (drawers[name]) return

    setDrawers((currentDrawers) => ({
      ...currentDrawers,
      [name]: { children: drawerChildren, open: false },
    }))
  }
  const unregisterDrawer = (name: string) => {
    if (!drawers[name]) return

    setDrawers((currentDrawers) => {
      const newDrawers = { ...currentDrawers }
      delete newDrawers[name]
      return newDrawers
    })
  }
  const getDrawer = (name: string) => {
    if (!drawers[name]) return

    return drawers[name]
  }
  const setDrawer = (name: string, drawer: Partial<DrawerProps>) => {
    if (!drawers[name]) return

    setDrawers((currentDrawers) => {
      const newDrawers = Object.keys(currentDrawers).reduce(
        (_newDrawers, drawerName) => {
          _newDrawers[drawerName] = {
            ...drawers[drawerName],
            open: false,
          }
          return _newDrawers
        },
        {} as LayoutDrawers,
      )
      newDrawers[name] = { ...currentDrawers[name], ...drawer }

      return newDrawers
    })
  }

  const context = {
    getDrawers,
    setDrawers,
    registerDrawer,
    unregisterDrawer,
    getDrawer,
    setDrawer,
  }

  return (
    <LayoutContext.Provider value={context}>
      <Box>{children}</Box>
    </LayoutContext.Provider>
  )
}

export default LayoutContextProvider
