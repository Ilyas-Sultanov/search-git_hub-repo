import { ReactNode, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Box, Typography } from '@mui/material'
import { AppState, useAppDispatch } from '@/store/store'
import { fetchRepos, setSelectedRepo } from '@/store/slices/repositories/repositoriesSlice'
import { RepoPagination } from './RepoPagination/RepoPagination'
import { RepoTable } from './RepoTable/RepoTable'
import classes from './RepoData.module.scss'

/** Компонент в котором тригерится запрос данных и отображение результата в зависимости от статуса запроса */
export function RepoData() {
  const dispatch = useAppDispatch()
  const { isLoading, errorMsg, params, result } = useSelector((state: AppState) => state.repositories)
  
  useEffect(() => {
    if (params.q) {
      dispatch(fetchRepos(params))
      dispatch(setSelectedRepo(null))
    }
  }, [params, dispatch])

  let content: ReactNode = null
  if (errorMsg) {
    content = <Typography component='p' className={classes.error}>{errorMsg}</Typography>
    console.error(errorMsg)
  } else if (result === null && !isLoading) {
    content = <p className={classes.greetingsText}>Добро пожаловать</p>
  } else {
    content = (
      <>
        <h1 className={classes.title}>Результаты поиска</h1>
        <RepoTable data={result?.items ?? []} />
        <RepoPagination />
        {isLoading ? (
          <Box className={classes.tableLoader}>
            <Box className={classes.ldsRing}><Box></Box><Box></Box><Box></Box><Box></Box></Box>
          </Box>
        ) : null}
      </>
    )
  }

  return (
    <Box component='section' className={classes.repoData}>
      {content}
    </Box>
  )
}
