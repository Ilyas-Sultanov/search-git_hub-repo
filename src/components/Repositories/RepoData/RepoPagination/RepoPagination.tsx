import { MouseEvent, ChangeEvent } from 'react'
import { TablePagination } from '@mui/material'
import { repositoriesSlice, setRepoSearchParams } from '@/store/slices/repositories/repositoriesSlice'
import { useAppSelector, useAppDispatch } from '@/store/store'

/** Компоненты с пагинацией таблицы */
export function RepoPagination() {
  const dispatch = useAppDispatch()
  const searchRepoParams = useAppSelector(repositoriesSlice.selectors.selectSearchParams)
  const result = useAppSelector(repositoriesSlice.selectors.selectResult)

  const handleChangePage = (_: MouseEvent<HTMLButtonElement> | null, newPage: number) => {
    dispatch(setRepoSearchParams({ page: newPage }))
  }

  const handleChangeRowsPerPage = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {  
    const newPerPage = parseInt(e.target.value, 10)
    dispatch(setRepoSearchParams({ per_page: newPerPage, page: 0 }))
  }

  return (
    <TablePagination
      component='div'
      rowsPerPageOptions={[4, 8, 16, 32]}
      count={result?.total_count ?? 0}
      page={searchRepoParams.page}
      onPageChange={handleChangePage}
      rowsPerPage={searchRepoParams.per_page}
      onRowsPerPageChange={handleChangeRowsPerPage}
    />
  )
}
