import './App.css'
import HomePage from "./components/home/HomePage.tsx";
import {Route, Routes} from "react-router-dom";
import NoMatchPage from "./components/404/NoMatchPage.tsx";
import CategoryCreatePage from "./components/categories/create/CategoryCreatePage.tsx";
import CategoryAllPage from "./components/categories/all/CategoryAllPage.tsx";
import MainMenu from "./components/menu/MainMenu.tsx";

const App = () => {
    return (
        <>
            <MainMenu />
            <Routes>
                <Route path="/">
                    <Route index element={<HomePage/>} />
                    <Route path={"/categories/create"} element={<CategoryCreatePage/>} />
                    <Route path={"/categories/all"} element={<CategoryAllPage/>} />
                    <Route path="*" element={<NoMatchPage />} />
                </Route>
            </Routes>
        </>
    )
}

export default App
