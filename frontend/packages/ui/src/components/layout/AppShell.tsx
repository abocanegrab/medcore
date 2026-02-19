import { Box, useDisclosure } from '@chakra-ui/react'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import { Sidebar } from './Sidebar'

export function AppShell() {
  const location = useLocation()
  const navigate = useNavigate()
  const { isOpen: isDrawerOpen, onOpen: onDrawerOpen, onClose: onDrawerClose } = useDisclosure()

  return (
    <Box minH="100vh" display="flex" overflow="hidden">
      <Sidebar
        currentPath={location.pathname}
        onNavigate={navigate}
        isDrawerOpen={isDrawerOpen}
        onDrawerClose={onDrawerClose}
      />
      <Box
        as="main"
        flex={1}
        h="100vh"
        overflowY="auto"
        position="relative"
        display="flex"
        flexDir="column"
        transition="all 0.3s"
        css={{ scrollBehavior: 'smooth' }}
      >
        <Outlet context={{ onMenuOpen: onDrawerOpen }} />
      </Box>
    </Box>
  )
}
