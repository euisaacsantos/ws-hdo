import { useState, useRef, useEffect } from 'react';

interface Country {
  name: string;
  code: string;
  dial: string;
  minDigits: number;
}

function FlagImg({ code, className }: { code: string; className?: string }) {
  return (
    <img
      src={`https://flagcdn.com/w40/${code.toLowerCase()}.png`}
      srcSet={`https://flagcdn.com/w80/${code.toLowerCase()}.png 2x`}
      alt={code}
      className={className || 'w-5 h-auto rounded-sm'}
    />
  );
}

const COUNTRIES: Country[] = [
  // América do Sul
  { name: 'Brasil', code: 'BR', dial: '+55', minDigits: 10 },
  { name: 'Argentina', code: 'AR', dial: '+54', minDigits: 10 },
  { name: 'Bolivia', code: 'BO', dial: '+591', minDigits: 8 },
  { name: 'Chile', code: 'CL', dial: '+56', minDigits: 9 },
  { name: 'Colombia', code: 'CO', dial: '+57', minDigits: 10 },
  { name: 'Equador', code: 'EC', dial: '+593', minDigits: 9 },
  { name: 'Guiana', code: 'GY', dial: '+592', minDigits: 7 },
  { name: 'Paraguai', code: 'PY', dial: '+595', minDigits: 9 },
  { name: 'Peru', code: 'PE', dial: '+51', minDigits: 9 },
  { name: 'Suriname', code: 'SR', dial: '+597', minDigits: 7 },
  { name: 'Uruguai', code: 'UY', dial: '+598', minDigits: 8 },
  { name: 'Venezuela', code: 'VE', dial: '+58', minDigits: 10 },

  // América Central e Caribe
  { name: 'Costa Rica', code: 'CR', dial: '+506', minDigits: 8 },
  { name: 'Cuba', code: 'CU', dial: '+53', minDigits: 8 },
  { name: 'El Salvador', code: 'SV', dial: '+503', minDigits: 8 },
  { name: 'Guatemala', code: 'GT', dial: '+502', minDigits: 8 },
  { name: 'Haiti', code: 'HT', dial: '+509', minDigits: 8 },
  { name: 'Honduras', code: 'HN', dial: '+504', minDigits: 8 },
  { name: 'Jamaica', code: 'JM', dial: '+1876', minDigits: 7 },
  { name: 'Nicaragua', code: 'NI', dial: '+505', minDigits: 8 },
  { name: 'Panama', code: 'PA', dial: '+507', minDigits: 8 },
  { name: 'Republica Dominicana', code: 'DO', dial: '+1809', minDigits: 7 },
  { name: 'Trinidad e Tobago', code: 'TT', dial: '+1868', minDigits: 7 },

  // América do Norte
  { name: 'Canada', code: 'CA', dial: '+1', minDigits: 10 },
  { name: 'Estados Unidos', code: 'US', dial: '+1', minDigits: 10 },
  { name: 'Mexico', code: 'MX', dial: '+52', minDigits: 10 },

  // Europa Ocidental
  { name: 'Alemanha', code: 'DE', dial: '+49', minDigits: 10 },
  { name: 'Austria', code: 'AT', dial: '+43', minDigits: 10 },
  { name: 'Belgica', code: 'BE', dial: '+32', minDigits: 9 },
  { name: 'Espanha', code: 'ES', dial: '+34', minDigits: 9 },
  { name: 'Franca', code: 'FR', dial: '+33', minDigits: 9 },
  { name: 'Irlanda', code: 'IE', dial: '+353', minDigits: 9 },
  { name: 'Italia', code: 'IT', dial: '+39', minDigits: 9 },
  { name: 'Luxemburgo', code: 'LU', dial: '+352', minDigits: 9 },
  { name: 'Monaco', code: 'MC', dial: '+377', minDigits: 8 },
  { name: 'Paises Baixos', code: 'NL', dial: '+31', minDigits: 9 },
  { name: 'Portugal', code: 'PT', dial: '+351', minDigits: 9 },
  { name: 'Reino Unido', code: 'GB', dial: '+44', minDigits: 10 },
  { name: 'Suica', code: 'CH', dial: '+41', minDigits: 9 },

  // Europa do Norte
  { name: 'Dinamarca', code: 'DK', dial: '+45', minDigits: 8 },
  { name: 'Finlandia', code: 'FI', dial: '+358', minDigits: 9 },
  { name: 'Islandia', code: 'IS', dial: '+354', minDigits: 7 },
  { name: 'Noruega', code: 'NO', dial: '+47', minDigits: 8 },
  { name: 'Suecia', code: 'SE', dial: '+46', minDigits: 9 },

  // Europa Oriental
  { name: 'Bulgaria', code: 'BG', dial: '+359', minDigits: 9 },
  { name: 'Croacia', code: 'HR', dial: '+385', minDigits: 9 },
  { name: 'Eslovaquia', code: 'SK', dial: '+421', minDigits: 9 },
  { name: 'Eslovenia', code: 'SI', dial: '+386', minDigits: 8 },
  { name: 'Estonia', code: 'EE', dial: '+372', minDigits: 7 },
  { name: 'Grecia', code: 'GR', dial: '+30', minDigits: 10 },
  { name: 'Hungria', code: 'HU', dial: '+36', minDigits: 9 },
  { name: 'Letonia', code: 'LV', dial: '+371', minDigits: 8 },
  { name: 'Lituania', code: 'LT', dial: '+370', minDigits: 8 },
  { name: 'Polonia', code: 'PL', dial: '+48', minDigits: 9 },
  { name: 'Republica Tcheca', code: 'CZ', dial: '+420', minDigits: 9 },
  { name: 'Romenia', code: 'RO', dial: '+40', minDigits: 10 },
  { name: 'Russia', code: 'RU', dial: '+7', minDigits: 10 },
  { name: 'Servia', code: 'RS', dial: '+381', minDigits: 9 },
  { name: 'Turquia', code: 'TR', dial: '+90', minDigits: 10 },
  { name: 'Ucrania', code: 'UA', dial: '+380', minDigits: 9 },

  // Ásia
  { name: 'Arabia Saudita', code: 'SA', dial: '+966', minDigits: 9 },
  { name: 'Bangladesh', code: 'BD', dial: '+880', minDigits: 10 },
  { name: 'Camboja', code: 'KH', dial: '+855', minDigits: 9 },
  { name: 'China', code: 'CN', dial: '+86', minDigits: 11 },
  { name: 'Coreia do Sul', code: 'KR', dial: '+82', minDigits: 10 },
  { name: 'Emirados Arabes', code: 'AE', dial: '+971', minDigits: 9 },
  { name: 'Filipinas', code: 'PH', dial: '+63', minDigits: 10 },
  { name: 'Hong Kong', code: 'HK', dial: '+852', minDigits: 8 },
  { name: 'India', code: 'IN', dial: '+91', minDigits: 10 },
  { name: 'Indonesia', code: 'ID', dial: '+62', minDigits: 10 },
  { name: 'Israel', code: 'IL', dial: '+972', minDigits: 9 },
  { name: 'Japao', code: 'JP', dial: '+81', minDigits: 10 },
  { name: 'Malasia', code: 'MY', dial: '+60', minDigits: 9 },
  { name: 'Nepal', code: 'NP', dial: '+977', minDigits: 10 },
  { name: 'Paquistao', code: 'PK', dial: '+92', minDigits: 10 },
  { name: 'Catar', code: 'QA', dial: '+974', minDigits: 8 },
  { name: 'Singapura', code: 'SG', dial: '+65', minDigits: 8 },
  { name: 'Sri Lanka', code: 'LK', dial: '+94', minDigits: 9 },
  { name: 'Tailandia', code: 'TH', dial: '+66', minDigits: 9 },
  { name: 'Taiwan', code: 'TW', dial: '+886', minDigits: 9 },
  { name: 'Vietna', code: 'VN', dial: '+84', minDigits: 9 },

  // África
  { name: 'Africa do Sul', code: 'ZA', dial: '+27', minDigits: 9 },
  { name: 'Angola', code: 'AO', dial: '+244', minDigits: 9 },
  { name: 'Argelia', code: 'DZ', dial: '+213', minDigits: 9 },
  { name: 'Cabo Verde', code: 'CV', dial: '+238', minDigits: 7 },
  { name: 'Camaroes', code: 'CM', dial: '+237', minDigits: 9 },
  { name: 'Costa do Marfim', code: 'CI', dial: '+225', minDigits: 10 },
  { name: 'Egito', code: 'EG', dial: '+20', minDigits: 10 },
  { name: 'Etiopia', code: 'ET', dial: '+251', minDigits: 9 },
  { name: 'Gana', code: 'GH', dial: '+233', minDigits: 9 },
  { name: 'Guine-Bissau', code: 'GW', dial: '+245', minDigits: 7 },
  { name: 'Kenya', code: 'KE', dial: '+254', minDigits: 9 },
  { name: 'Marrocos', code: 'MA', dial: '+212', minDigits: 9 },
  { name: 'Mocambique', code: 'MZ', dial: '+258', minDigits: 9 },
  { name: 'Nigeria', code: 'NG', dial: '+234', minDigits: 10 },
  { name: 'Ruanda', code: 'RW', dial: '+250', minDigits: 9 },
  { name: 'Sao Tome e Principe', code: 'ST', dial: '+239', minDigits: 7 },
  { name: 'Senegal', code: 'SN', dial: '+221', minDigits: 9 },
  { name: 'Tanzania', code: 'TZ', dial: '+255', minDigits: 9 },
  { name: 'Tunisia', code: 'TN', dial: '+216', minDigits: 8 },
  { name: 'Uganda', code: 'UG', dial: '+256', minDigits: 9 },

  // Oceania
  { name: 'Australia', code: 'AU', dial: '+61', minDigits: 9 },
  { name: 'Nova Zelandia', code: 'NZ', dial: '+64', minDigits: 9 },
];

function formatBrazilPhone(digits: string): string {
  if (digits.length <= 2) return `(${digits}`;
  if (digits.length <= 7) return `(${digits.slice(0, 2)}) ${digits.slice(2)}`;
  return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7, 11)}`;
}

export function getPhoneDigits(fullPhone: string): string {
  return fullPhone.replace(/\D/g, '');
}

export function getMinDigits(fullPhone: string): number {
  const country = COUNTRIES.find((c) => fullPhone.startsWith(c.dial));
  return country?.minDigits ?? 7;
}

interface PhoneInputProps {
  value: string;
  onChange: (fullPhone: string) => void;
  className?: string;
  dark?: boolean;
}

export default function PhoneInput({ value, onChange, className, dark }: PhoneInputProps) {
  const [country, setCountry] = useState(COUNTRIES[0]);
  const [localDigits, setLocalDigits] = useState('');
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState('');
  const dropdownRef = useRef<HTMLDivElement>(null);
  const searchRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (value) {
      const match = COUNTRIES.find((c) => value.startsWith(c.dial));
      if (match) {
        setCountry(match);
        setLocalDigits(value.slice(match.dial.length).replace(/\D/g, ''));
      }
    }
  }, []);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    if (open && searchRef.current) searchRef.current.focus();
  }, [open]);

  function handleDigitsChange(raw: string) {
    const digits = raw.replace(/\D/g, '');
    const maxLen = country.code === 'BR' ? 11 : 15;
    const trimmed = digits.slice(0, maxLen);
    setLocalDigits(trimmed);
    onChange(country.dial + trimmed);
  }

  function selectCountry(c: Country) {
    setCountry(c);
    setOpen(false);
    setSearch('');
    onChange(c.dial + localDigits);
  }

  const displayValue = localDigits ? (country.code === 'BR' ? formatBrazilPhone(localDigits) : localDigits) : '';

  const filtered = COUNTRIES.filter(
    (c) =>
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.dial.includes(search)
  );

  return (
    <div className="relative flex" ref={dropdownRef}>
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className={`flex items-center gap-1.5 px-3 py-3 border border-r-0 rounded-l-xl text-sm shrink-0 ${dark ? 'bg-white/10 border-white/20' : 'bg-gray-50 border-gray-400'}`}
      >
        <FlagImg code={country.code} />
        <span className={`text-xs ${dark ? 'text-white/70' : 'text-gray-600'}`}>{country.dial}</span>
        <svg className={`w-3 h-3 ${dark ? 'text-white/40' : 'text-gray-400'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
      </button>

      {open && (
        <div className="absolute top-full left-0 mt-1 w-64 max-h-60 bg-white border border-gray-200 rounded-xl shadow-xl z-50 overflow-hidden">
          <div className="p-2 border-b border-gray-100">
            <input
              ref={searchRef}
              type="text"
              placeholder="Buscar pais..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full px-3 py-2 text-sm text-gray-800 border border-gray-200 rounded-lg outline-none focus:border-brand-gold"
            />
          </div>
          <div className="overflow-y-auto max-h-44">
            {filtered.map((c) => (
              <button
                key={c.code + c.dial}
                type="button"
                onClick={() => selectCountry(c)}
                className={`w-full flex items-center gap-2 px-3 py-2 text-sm text-left hover:bg-gray-50 ${c.code === country.code ? 'bg-gray-100 font-medium' : ''}`}
              >
                <FlagImg code={c.code} />
                <span className="text-gray-800">{c.name}</span>
                <span className="text-gray-400 ml-auto">{c.dial}</span>
              </button>
            ))}
          </div>
        </div>
      )}

      <input
        type="tel"
        value={displayValue}
        onChange={(e) => handleDigitsChange(e.target.value)}
        placeholder={country.code === 'BR' ? '(11) 99999-0001' : 'Telefone'}
        className={className || (dark ? 'flex-1 px-4 py-3 border border-white/20 rounded-r-xl text-sm text-white bg-white/10 outline-none focus:border-brand-gold transition-colors placeholder:text-white/30' : 'flex-1 px-4 py-3 border border-gray-400 rounded-r-xl text-sm text-gray-800 outline-none focus:border-brand-gold transition-colors placeholder:text-gray-400')}
      />
    </div>
  );
}
