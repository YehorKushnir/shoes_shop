import {Navigate} from 'react-router'
import React, {type FC} from 'react'

interface Props {
    isAuthenticated: boolean
    children: React.ReactNode
}

const ProtectedRoute: FC<Props> = ({isAuthenticated, children}) => {
    return isAuthenticated ? children : <Navigate to="/login"/>
}

export default ProtectedRoute