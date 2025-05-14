import {Route, Routes, useLocation} from 'react-router'
import {useStore} from '@/store.ts'
import {useEffect} from 'react'
import ProtectedRoute from '@/components/protected-route.tsx'
import {protectedRoutes, publicRoutes} from '@/utils/routes.tsx'
import PublicRoute from '@/components/public-route.tsx'
import {Navbar1} from '@/components/navbar1.tsx'
import {Skeleton} from '@/components/ui/skeleton.tsx'

const hideNavbarPaths = ['/login', '/register']
const onlyAdminPages = ['/admin-panel']
const menu = [
    {
        title: "Admin Panel",
        url: "/admin-panel"
    }
]

function App() {
    const location = useLocation()
    console.log(location)
    const isNavbarVisible = !hideNavbarPaths.includes(location.pathname)

    const loading = useStore(state => state.loading)
    const user = useStore(state => state.user)
    const refresh = useStore(state => state.refresh)

    useEffect(() => {
        void refresh()
    }, [])
    return (
        <>
            {isNavbarVisible && (loading
                ? <Skeleton className={'w-[100%-32px] h-10 m-4'}/>
                : <Navbar1 menu={user?.role === "admin" ? menu : menu.filter(item => !onlyAdminPages.includes(item.url))} />
            )}
            <Routes>
                {publicRoutes.map(({path, element, redirectIfAuth}) => (
                    <Route key={path} path={path} element={
                        <PublicRoute isAuthenticated={!!user} redirectIfAuth={redirectIfAuth}>
                            {element}
                        </PublicRoute>
                    }/>
                ))}

                {user && protectedRoutes.map(({path, element, admin}) => (
                    <Route
                        key={path}
                        path={path}
                        element={
                            <ProtectedRoute isAuthenticated={!!user} admin={!!admin}>
                                {element}
                            </ProtectedRoute>
                        }
                    />
                ))}
            </Routes>
        </>
    )
}

export default App
