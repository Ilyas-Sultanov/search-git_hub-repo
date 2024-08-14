import { Box } from '@mui/material'
import { RepoData } from './RepoData/RepoData'
import { RepoDescripton } from './RepoDescripton/RepoDescripton'
import classes from './Repositories.module.scss'

export function Repositories() {
  
  return (
    <Box className={classes.repositories}>
      <RepoData />
      <RepoDescripton />
    </Box>
  )
}
