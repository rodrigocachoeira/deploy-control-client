import React from 'react'
import { positions, Provider as AlertProvider, transitions } from 'react-alert'
import AlertTemplate from 'react-alert-template-basic'
import { render } from 'react-dom'

const options = {
  position: positions.TOP_CENTER,
  timeout: 5000,
  offset: '30px',
  transition: transitions.SCALE
}

export function AlertContext({ children }: any)  {
  return (
    <AlertProvider template={AlertTemplate} { ... options } >
      { children }
    </AlertProvider>
  );
}