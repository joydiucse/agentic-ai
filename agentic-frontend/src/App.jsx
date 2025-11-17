import { Routes, Route } from "react-router-dom";
import Chat from "./pages/Chat.jsx";
import Layout from "./components/layouts/Layout.jsx";
function App() {
    return (
        <>
            <Routes>
                <Route element={<Layout />}>
                    <Route path="/" element={<Chat />} />
                </Route>
            </Routes>
        </>
    )
}

export default App;
