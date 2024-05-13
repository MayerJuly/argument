import * as React from "react"
import '@fontsource/inter/400.css'
import '@fontsource/inter/700.css'
import '@fontsource/inter/600.css'
import {
  ChakraProvider,

} from "@chakra-ui/react"
import HomePage from "./components/HomePage/HomePage";
import theme from './Theme'

export const App = () => (
  <ChakraProvider theme={theme}>
    <HomePage/>
  </ChakraProvider>
)
