import './App.css'
import { HashRouter, Route, Routes } from 'react-router-dom'
import Home from '@/pages/home'
import ProjectDetail from '@/pages/projectDetail'

function App() {

    return (
        <HashRouter>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/detail/:id" element={<ProjectDetail />} />
            </Routes>
        </HashRouter>
    )
}

export default App
