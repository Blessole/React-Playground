import {BrowserRouter, Routes, Route} from "react-router-dom";

// 페이지 컴포넌트
import Index from "@pages/index/index";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route index path="/" element={<Index />}/>
            </Routes>
        </BrowserRouter>
    )
}

export default App