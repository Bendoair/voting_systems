import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/react'
import { BrowserRouter, Navigate, Routes, Route } from 'react-router-dom'
import { I18nProvider } from './i18n'
import { ThemeProvider } from './theme'
import { Layout } from './components/Layout'
import { Home } from './pages/Home'
import { Tour } from './pages/Tour'
import { Systems } from './pages/Systems'
import { SystemDetail } from './pages/SystemDetail'
import { Simulate } from './pages/Simulate'
import { CaseStudy } from './pages/CaseStudy'
import { Exercises } from './pages/Exercises'
import { Gerrymander } from './pages/Gerrymander'
import { SysPick } from './pages/SysPick'
import './styles/app.css'

export default function App() {
  return (
    <ThemeProvider>
      <I18nProvider>
        <BrowserRouter>
          <Routes>
            <Route element={<Layout />}>
              <Route index element={<Home />} />
              <Route path="tour" element={<Tour />} />
              <Route path="systems" element={<Systems />} />
              <Route path="systems/:id" element={<SystemDetail />} />
              <Route path="simulate" element={<Simulate />} />
              <Route path="case-study" element={<CaseStudy />} />
              <Route path="games" element={<Exercises />} />
              <Route path="games/gerrymander" element={<Gerrymander />} />
              <Route path="games/syspick" element={<SysPick />} />
              <Route path="exercises" element={<Navigate to="/games" replace />} />
              <Route
                path="exercises/gerrymander"
                element={<Navigate to="/games/gerrymander" replace />}
              />
              <Route
                path="exercises/syspick"
                element={<Navigate to="/games/syspick" replace />}
              />
            </Route>
          </Routes>
        </BrowserRouter>
        <Analytics />
        <SpeedInsights />
      </I18nProvider>
    </ThemeProvider>
  )
}
