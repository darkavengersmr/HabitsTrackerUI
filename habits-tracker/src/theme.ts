import { extendTheme, type ThemeConfig } from '@chakra-ui/react'

const config: ThemeConfig = {
  initialColorMode: "dark", 
  useSystemColorMode: false,
}

const defaultTheme = extendTheme({ config })

export default defaultTheme