import { Box } from '@mui/material'
import classes from './RepoData.module.scss'

export function RepoData() {
  return (
    <Box component='section' className={classes.repoData}>
      <h1 className={classes.title}>Результаты поиска</h1>
      <table></table>
    </Box>
  )
}
