import { useState, useEffect, useRef, ReactNode } from 'react'
import { ColumnDef, flexRender, getCoreRowModel, getExpandedRowModel, RowSelectionState, SortingState, Updater, useReactTable } from '@tanstack/react-table'
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography } from '@mui/material'
import classNames from 'classnames'
import { SearchParamsObj, type Repository } from '@/store/slices/repositories/types'
import { useAppDispatch, useAppSelector } from '@/store/store'
import { setRepoSearchParams, removeSortFromSearchParams, setSelectedRepo, repositoriesSlice } from '@/store/slices/repositories/repositoriesSlice'
import { ArrowUpIcon } from '@/components/ui/Icons'
import classes from './RepoTable.module.scss'

const columns: Array<ColumnDef<Repository>> = [
  {
    accessorKey: 'name',
    header: 'Название',
    enableSorting: false,
  },
  {
    accessorKey: 'language',
    header: 'Язык',
    enableSorting: false,
  },
  {
    accessorKey: 'forks_count',
    header: 'Число форков',
  },
  {
    accessorKey: 'stargazers_count',
    header: 'Число звезд',
  },
  {
    accessorKey: 'updated_at',
    header: 'Дата обновления',
    cell: (info) => {
      const isoDate = info.cell.getValue() as string
      return new Date(isoDate).toLocaleDateString()
    }
  },
]

type Props = {
  /** Массив найденных репозиториев */
  data: Array<Repository>
}

/** Компонент в котором отображены данные найденных репозиториев в виде таблицы. */
export function RepoTable({ data }: Props) {
  const containerRef = useRef<null | HTMLDivElement>(null)
  const dispatch = useAppDispatch()
  const selectedRepository = useAppSelector(repositoriesSlice.selectors.selectSelectedRepo)
  const [sorting, setSorting] = useState<SortingState>([])
  const [rowSelection, setRowSelection] = useState<RowSelectionState>({})

  useEffect(() => {
    if (!containerRef.current) {
      return
    }
    containerRef.current.scrollTo({ top: 0 })
  }, [data])

  function onSortingChange(updaterFn: Updater<SortingState>) {
    setSorting(updaterFn)
    if (updaterFn instanceof Function) {
      const sortingObj = updaterFn(sorting ?? [])[0]
      if (sortingObj) {
        const sortMap: Record<string, string> = {
          stargazers_count: 'stars',
          forks_count: 'forks',
          updated_at: 'updated',
        }
        dispatch(setRepoSearchParams({
          sort: sortMap[sortingObj.id] as SearchParamsObj['sort'],
          order: sortingObj.desc ? 'desc' : 'asc',
        }))
      } else {
        dispatch(removeSortFromSearchParams())
      }
    }
  }

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getExpandedRowModel: getExpandedRowModel(),
    manualSorting: true,
    manualPagination: true,
    onSortingChange,
    enableRowSelection: true,
    enableMultiRowSelection: false,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      rowSelection,
    },
  })

  useEffect(() => {
    const selectedRow = table.getSelectedRowModel().rows[0]
    if ( Object.keys(rowSelection).length === 1 && selectedRow) {
      dispatch(setSelectedRepo(selectedRow.original))
    }
  }, [rowSelection, table, dispatch])

  let content: ReactNode = null

  if (data.length) {
    content = (
      <Table>
        <TableHead className={classes.thead}>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                const sorting = header.column.getIsSorted()
                const sortable = header.column.getCanSort()
                return (
                  <TableCell
                    className={classNames(classes.th, { [classes.sortable]: sortable })}
                    key={header.id}
                    {
                      ...(sortable
                      ? { onClick: header.column.getToggleSortingHandler() }
                      : {})
                    }
                  >
                    {
                      sorting
                        ? <ArrowUpIcon className={classNames(classes.arrow, { [classes.desc]: sorting === 'desc' })} />
                        : null
                    }
                    {flexRender(header.column.columnDef.header, header.getContext())}
                  </TableCell>
                )
              })}
            </TableRow>
          ))}
        </TableHead>
        <TableBody>
          {
            table.getRowModel().rows.map((row) => {
              const isSelected = row.original.id === selectedRepository?.id
              return (
                <TableRow
                  key={row.id}
                  className={classNames(classes.row, { [classes.selected]: isSelected })}
                  onClick={row.getToggleSelectedHandler()}
                >
                  {
                    row.getVisibleCells().map((cell) => {
                      return (
                        <TableCell key={cell.id}>
                          {flexRender(cell.column.columnDef.cell, cell.getContext())}
                        </TableCell>
                      )
                    })
                  }
                </TableRow>
                )
            })
          }
        </TableBody>
      </Table>
    )
  } else {
    content = (
      <Typography component='p'>Ничего не найдено</Typography>
    )
  }

  return (
    <TableContainer component={Paper} ref={containerRef} className={classes.repoTableContainer}>
      {content}
    </TableContainer>
  )
}
