import {BrowserRouter, Routes, Route} from "react-router-dom";
import {RecoilRoot} from "recoil";

// 페이지 컴포넌트
import Index from "@pages/index/index";

function App() {
    return (
        <RecoilRoot>
            <BrowserRouter>
                <Routes>
                    <Route index path="/" element={<Index />}/>
                </Routes>
            </BrowserRouter>
        </RecoilRoot>
    )
}

export default App