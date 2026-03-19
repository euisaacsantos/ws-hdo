import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import App from './App.tsx';
import Credenciamento from './Credenciamento.tsx';
import PreCheckout from './PreCheckout.tsx';
import Obrigado from './Obrigado.tsx';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/credenciamento" element={<Credenciamento />} />
        <Route path="/checkout" element={<PreCheckout />} />
        <Route path="/obrigado" element={<Obrigado />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
);
