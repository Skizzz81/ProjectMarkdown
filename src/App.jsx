import {createBrowserRouter, RouterProvider}    from 'react-router-dom';
import Home                                     from './pages/Home';
import KeyboardShortcutsMenu                    from './pages/KeyboardShortcutsMenu';
import './App.css';

const router = createBrowserRouter([
    {
        path: '/',
        element: <Home/>,
        errorElement: <div>Error</div>,
    },
    {
        path: '/keyboard_shortcuts',
        element: <KeyboardShortcutsMenu />,
        errorElement: <div>Error</div>,
    },
]);

export default function App(){ return <RouterProvider router = {router} />; };