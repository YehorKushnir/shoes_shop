import {Navigate, Route, Routes, useLocation} from 'react-router'
import {useStore} from '@/store.ts'
import {useEffect} from 'react'
import ProtectedRoute from '@/components/protected-route.tsx'
import {protectedRoutes, publicRoutes} from '@/utils/routes.tsx'
import PublicRoute from '@/components/public-route.tsx'
import {Navbar1} from '@/components/navbar1.tsx'

const hideNavbarPaths = ['/login', '/register']

function App() {
    const location = useLocation()
    const isNavbarVisible = !hideNavbarPaths.includes(location.pathname)

    const user = useStore(state => state.user)
    const refresh = useStore(state => state.refresh)

    useEffect(() => {
        void refresh()
    }, [])

    return (
        <>
            {isNavbarVisible && <Navbar1 />}
            <Routes>
                {publicRoutes.map(({path, element, redirectIfAuth}) => (
                    <Route key={path} path={path} element={
                        <PublicRoute isAuthenticated={!!user} redirectIfAuth={redirectIfAuth}>
                            {element}
                        </PublicRoute>
                    }/>
                ))}

                {protectedRoutes.map(({path, element}) => (
                    <Route
                        key={path}
                        path={path}
                        element={
                            <ProtectedRoute isAuthenticated={!!user}>
                                {element}
                            </ProtectedRoute>
                        }
                    />
                ))}


                <Route path="*" element={<Navigate to="/"/>}/>
            </Routes>
        </>
    )
}

export default App
