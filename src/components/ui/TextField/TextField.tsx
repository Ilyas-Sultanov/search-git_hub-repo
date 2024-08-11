import { TextField as MuiTextField, TextFieldProps, styled } from '@mui/material'

export function TextField(props: TextFieldProps) {
  const StyledTextField = styled(MuiTextField)({
    width: '100%',
    height: 42,
    backgroundColor: '#F2F2F2',
    borderRadius: 4,
    padding: 0,
    '& .MuiInputBase-input': {
      border: 'none',
      backgroundColor: 'transparent',
      padding: '11.5px 14px',
      fontWeight: 500,
      '&::placeholder': {
        color: '#828282',
        fontStyle: 'italic',
        fontSize: 'inherit',
      }
    },
  })
  return (
    <StyledTextField  autoComplete='off' {...props} />
  )
}
