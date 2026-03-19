import { useState, useRef, useEffect } from 'react';

interface Country {
  name: string;
  code: string;
  dial: string;
  flag: string;
  minDigits: number;
}

const COUNTRIES: Country[] = [
  { name: 'Brasil', code: 'BR', dial: '+55', flag: '\u{1F1E7}\u{1F1F7}', minDigits: 10 },
  { name: 'Portugal', code: 'PT', dial: '+351', flag: '\u{1F1F5}\u{1F1F9}', minDigits: 9 },
  { name: 'Estados Unidos', code: 'US', dial: '+1', flag: '\u{1F1FA}\u{1F1F8}', minDigits: 10 },
  { name: 'Argentina', code: 'AR', dial: '+54', flag: '\u{1F1E6}\u{1F1F7}', minDigits: 10 },
  { name: 'Chile', code: 'CL', dial: '+56', flag: '\u{1F1E8}\u{1F1F1}', minDigits: 9 },
  { name: 'Colombia', code: 'CO', dial: '+57', flag: '\u{1F1E8}\u{1F1F4}', minDigits: 10 },
  { name: 'Mexico', code: 'MX', dial: '+52', flag: '\u{1F1F2}\u{1F1FD}', minDigits: 10 },
  { name: 'Espanha', code: 'ES', dial: '+34', flag: '\u{1F1EA}\u{1F1F8}', minDigits: 9 },
  { name: 'Italia', code: 'IT', dial: '+39', flag: '\u{1F1EE}\u{1F1F9}', minDigits: 9 },
  { name: 'Franca', code: 'FR', dial: '+33', flag: '\u{1F1EB}\u{1F1F7}', minDigits: 9 },
  { name: 'Alemanha', code: 'DE', dial: '+49', flag: '\u{1F1E9}\u{1F1EA}', minDigits: 10 },
  { name: 'Reino Unido', code: 'GB', dial: '+44', flag: '\u{1F1EC}\u{1F1E7}', minDigits: 10 },
  { name: 'Japao', code: 'JP', dial: '+81', flag: '\u{1F1EF}\u{1F1F5}', minDigits: 10 },
  { name: 'Angola', code: 'AO', dial: '+244', flag: '\u{1F1E6}\u{1F1F4}', minDigits: 9 },
  { name: 'Mocambique', code: 'MZ', dial: '+258', flag: '\u{1F1F2}\u{1F1FF}', minDigits: 9 },
  { name: 'Cabo Verde', code: 'CV', dial: '+238', flag: '\u{1F1E8}\u{1F1FB}', minDigits: 7 },
  { name: 'Peru', code: 'PE', dial: '+51', flag: '\u{1F1F5}\u{1F1EA}', minDigits: 9 },
  { name: 'Uruguai', code: 'UY', dial: '+598', flag: '\u{1F1FA}\u{1F1FE}', minDigits: 8 },
  { name: 'Paraguai', code: 'PY', dial: '+595', flag: '\u{1F1F5}\u{1F1FE}', minDigits: 9 },
  { name: 'Bolivia', code: 'BO', dial: '+591', flag: '\u{1F1E7}\u{1F1F4}', minDigits: 8 },
  { name: 'Equador', code: 'EC', dial: '+593', flag: '\u{1F1EA}\u{1F1E8}', minDigits: 9 },
  { name: 'Venezuela', code: 'VE', dial: '+58', flag: '\u{1F1FB}\u{1F1EA}', minDigits: 10 },
  { name: 'Canada', code: 'CA', dial: '+1', flag: '\u{1F1E8}\u{1F1E6}', minDigits: 10 },
  { name: 'Australia', code: 'AU', dial: '+61', flag: '\u{1F1E6}\u{1F1FA}', minDigits: 9 },
  { name: 'India', code: 'IN', dial: '+91', flag: '\u{1F1EE}\u{1F1F3}', minDigits: 10 },
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
}

export default function PhoneInput({ value, onChange, className }: PhoneInputProps) {
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
        className="flex items-center gap-1.5 px-3 py-3 bg-gray-50 border border-r-0 border-gray-400 rounded-l-xl text-sm shrink-0"
      >
        <span className="text-lg">{country.flag}</span>
        <span className="text-gray-600 text-xs">{country.dial}</span>
        <svg className="w-3 h-3 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
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
                <span className="text-lg">{c.flag}</span>
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
        className={className || 'flex-1 px-4 py-3 border border-gray-400 rounded-r-xl text-sm text-gray-800 outline-none focus:border-brand-gold transition-colors placeholder:text-gray-400'}
      />
    </div>
  );
}
