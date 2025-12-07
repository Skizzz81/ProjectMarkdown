import {createBrowserRouter, RouterProvider}    from 'react-router-dom';
import Home                                     from './pages/Home';
import ImageLibraryPage                         from './pages/ImageLibraryPage';
import BlockLibraryPage                         from './pages/BlockLibraryPage';
import './App.css';

const router = createBrowserRouter([
    {
        path: '/',
        element: <Home/>,
        errorElement: <div>Error</div>,
    },
    {
        path: '/images',
        element: <ImageLibraryPage/>,
    },
    {
        path: '/blocks',
        element: <BlockLibraryPage/>,
    },
]);

export default function App(){ return <RouterProvider router = {router} />; };