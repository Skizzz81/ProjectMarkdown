import {createBrowserRouter, RouterProvider}    from 'react-router-dom';
import Home                                     from './pages/Home';
import ImageLibraryPage                         from './pages/ImageLibraryPage';
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
]);

export default function App(){ return <RouterProvider router = {router} />; };