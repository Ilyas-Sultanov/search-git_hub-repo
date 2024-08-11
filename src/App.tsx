import { Box } from '@mui/material'
import { Header } from '@/components/Header/Header'
import { Repositories } from '@/components/Repositories/Repositories'
import classes from './App.module.scss'

function App() {
  return (
    <Box className={classes.app}>
      <Header />
      <Box component='main' className={classes.main}>
        <Repositories />
      </Box>
      <Box component='footer' className={classes.footer} />
    </Box>
  )
}

export default App
