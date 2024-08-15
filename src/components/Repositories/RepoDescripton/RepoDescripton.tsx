import { ReactNode } from 'react'
import { Box, Typography } from '@mui/material'
import { useAppSelector } from '@/store/store'
import { repositoriesSlice } from '@/store/slices/repositories/repositoriesSlice'
import { StarIcon } from '@/components/ui/Icons'
import classes from './RepoDescripton.module.scss'

/** Компонент в котором отображается описание выбранного репозитория */
export function RepoDescripton() {
  const repository = useAppSelector(repositoriesSlice.selectors.selectSelectedRepo)
  
  let content: ReactNode = null
  if (!repository) {
    content = (
      <Box className={classes.manualTextBox}>
        <Typography component='p' className={classes.manualText}>Выберите репозитарий</Typography>
      </Box>
    )
  } else {
    content = (
      <>
        <Typography component='h3' className={classes.title}>{repository.name}</Typography>
        <Box className={classes.languageStars}>
          <Typography component='span' className={classes.language}>{repository.language}</Typography>
          <Box className={classes.starsBox}>
            <StarIcon />
            <Typography
              component='span'
              className={classes.stargazersCount}
            >
              {repository.stargazers_count.toLocaleString()}
            </Typography>
          </Box>
        </Box>
        <Box className={classes.topics}>
          {repository.topics.map((topic) => {
            return (
              <Typography
                key={topic}
                component='span'
                className={classes.topic}
              >{topic}</Typography>
            )
          })}
        </Box>
        {
          repository.license ? (
            <Typography component='p'>{repository.license.name ?? ''}</Typography>
          ) : null
        }
      </>
    )
  }

  return (
    <Box component='section' className={classes.repoDescription}>
      {content}
    </Box>
  )
}
