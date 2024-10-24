import { createRoot } from 'react-dom/client';
import { App } from './components/App/App';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Suspense } from 'react';
import { Registration } from '@/pages/RegistrationPage';
import { Login } from '@/pages/LoginPage';
import { Profile } from '@/pages/ProfilePage';


const root = document.getElementById('root')

if (!root) {
    throw new Error('root not found')
}

const container = createRoot(root)

const router = createBrowserRouter([
    {
        path: '/',
        element: <App/>,
        children: [
            {
                path: '/registration',
                element: <Suspense fallback={'Loading...'}><Registration/></Suspense>
            },
            {
                path: '/login',
                element: <Suspense fallback={'Loading...'}><Login/></Suspense>
            },
            {
                path: '/profile',
                element: <Suspense fallback={'Loading...'}><Profile/></Suspense>
            },
        ]

    }
])

container.render(<RouterProvider router={router} />)
