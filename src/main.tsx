import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import App from './App.tsx';
import Credenciamento from './Credenciamento.tsx';
import PreCheckout from './PreCheckout.tsx';
import Obrigado from './Obrigado.tsx';
import Indicacao from './Indicacao.tsx';
import IndicacaoLink from './IndicacaoLink.tsx';
import Convite from './Convite.tsx';
import ObrigadoConvite from './ObrigadoConvite.tsx';
import Captacao from './Captacao.tsx';
import ConviteCopia from './ConviteCopia.tsx';
import ObrigadoConvite2 from './ObrigadoConvite2.tsx';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/credenciamento" element={<Credenciamento />} />
        <Route path="/checkout" element={<PreCheckout />} />
        <Route path="/obrigado" element={<Obrigado />} />
        <Route path="/indicacao" element={<Indicacao />} />
        <Route path="/indicacao/link" element={<IndicacaoLink />} />
        <Route path="/convite" element={<Convite />} />
        <Route path="/convite/obrigado" element={<ObrigadoConvite />} />
        <Route path="/captacao" element={<Captacao />} />
        <Route path="/alunas" element={<ConviteCopia />} />
        <Route path="/alunas/obrigado" element={<ObrigadoConvite2 />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
);
