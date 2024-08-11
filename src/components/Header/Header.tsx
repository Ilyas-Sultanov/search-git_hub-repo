import { useSearchParams } from 'react-router-dom'
import { Box } from '@mui/material'
import { Button } from '../ui/Button/Button'
import { TextField } from '../ui/TextField/TextField'
import classes from './Header.module.scss'
import { FormEvent } from 'react'

export function Header() {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_, setSearchParams] = useSearchParams()

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const value = ((e.target as HTMLFormElement).elements[0] as HTMLInputElement).value
    setSearchParams({ q: `${value} in:name` })
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
