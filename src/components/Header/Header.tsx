import { FormEvent } from 'react'
import { Box } from '@mui/material'
import { setRepoSearchParams } from '@/store/slices/repositories/repositoriesSlice'
import { useAppDispatch } from '@/store/store'
import { Button } from '../ui/Button/Button'
import { TextField } from '../ui/TextField/TextField'
import classes from './Header.module.scss'

export function Header() {
  const dispatch = useAppDispatch()

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const value = ((e.target as HTMLFormElement).elements[0] as HTMLInputElement).value
    dispatch(setRepoSearchParams({ q: value, page: 0 }))
  }

  return (
    <Box component='header' className={classes.header}>
      <Box component='form' className={classes.form} onSubmit={handleSubmit}>
        <TextField variant='outlined' placeholder='Введите поисковый запрос' name='q' />
        <Button variant='contained' type='submit'>ИСКАТЬ</Button>
      </Box>
    </Box>
  )
}
