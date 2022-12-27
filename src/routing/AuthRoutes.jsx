import React from 'react'
import { Route } from 'react-router-dom'
import { NotFoundComponent } from '../components/NotFoundComponent'
import { publicRoutes } from '../helpers/routes'
import { LoginPage } from '../pages/LoginPage'

export const AuthRoutes = ({ stateUser, setStateUser }) => {
  return (
    <NotFoundComponent>
      <Route path={publicRoutes.LOGIN} element={<LoginPage stateUser={stateUser} setStateUser={setStateUser}/>} />
    </NotFoundComponent>
  )
}
