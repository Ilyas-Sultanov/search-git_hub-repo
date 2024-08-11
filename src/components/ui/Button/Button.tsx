import { Button as MuiButton, ButtonProps, styled } from '@mui/material'

export function Button(props: ButtonProps) {
  const StyledBtn = styled(MuiButton)({
    fontSize: '0.938rem',
    lineHeight: '1.625rem',
    fontWeight: 500,
    padding: '0.615em 1.68em',
    backgroundColor: '#2196F3',
    color: '#ffffff',
    borderRadius: 4,
    textTransform: 'uppercase',
  })
  return (
    <StyledBtn {...props}></StyledBtn>
  )
}
