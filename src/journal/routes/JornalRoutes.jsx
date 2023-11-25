import { Navigate, Route, Routes } from "react-router-dom"
import { JournalPage } from '../pages/JournalPage'
export const JornalRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<JournalPage/>}/>
      <Route path="/*" element={<Navigate to="/"/>}/>
    </Routes>
  )
}
