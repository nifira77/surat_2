import React, { createContext, useContext, useState, useEffect } from 'react';
import { SuratMasuk, SuratKeluar, ProfilSekolah, DisposisiData } from '../types';
import { INITIAL_PROFIL_SEKOLAH, INITIAL_SURAT_MASUK, INITIAL_SURAT_KELUAR } from '../data/initialData';

interface SuratContextType {
  profil: ProfilSekolah;
  updateProfil: (profil: ProfilSekolah) => void;
  suratMasukList: SuratMasuk[];
  suratKeluarList: SuratKeluar[];
  addSuratMasuk: (item: Omit<SuratMasuk, 'id' | 'createdAt'>) => string;
  updateSuratMasuk: (id: string, item: Partial<SuratMasuk>) => void;
  deleteSuratMasuk: (id: string) => void;
  simpanDisposisi: (id: string, disposisi: DisposisiData) => void;
  addSuratKeluar: (item: Omit<SuratKeluar, 'id' | 'createdAt'>) => string;
  updateSuratKeluar: (id: string, item: Partial<SuratKeluar>) => void;
  deleteSuratKeluar: (id: string) => void;
  getNextNoAgenda: (type: 'masuk' | 'keluar') => string;
  generateNoSuratKeluar: (kodeKlasifikasi: string, tglSurat: string) => string;
  resetToSampleData: () => void;
  exportDataJSON: () => void;
  importDataJSON: (jsonStr: string) => boolean;
}

const SuratContext = createContext<SuratContextType | undefined>(undefined);

const STORAGE_KEYS = {
  PROFIL: 'esurat_smpn14_profil_v1',
  SURAT_MASUK: 'esurat_smpn14_masuk_v1',
  SURAT_KELUAR: 'esurat_smpn14_keluar_v1',
};

export const SuratProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [profil, setProfil] = useState<ProfilSekolah>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.PROFIL);
      return saved ? JSON.parse(saved) : INITIAL_PROFIL_SEKOLAH;
    } catch {
      return INITIAL_PROFIL_SEKOLAH;
    }
  });

  const [suratMasukList, setSuratMasukList] = useState<SuratMasuk[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.SURAT_MASUK);
      return saved ? JSON.parse(saved) : INITIAL_SURAT_MASUK;
    } catch {
      return INITIAL_SURAT_MASUK;
    }
  });

  const [suratKeluarList, setSuratKeluarList] = useState<SuratKeluar[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.SURAT_KELUAR);
      return saved ? JSON.parse(saved) : INITIAL_SURAT_KELUAR;
    } catch {
      return INITIAL_SURAT_KELUAR;
    }
  });

  // Save to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.PROFIL, JSON.stringify(profil));
    } catch (e) {
      console.error('Failed to save profil to localStorage', e);
    }
  }, [profil]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.SURAT_MASUK, JSON.stringify(suratMasukList));
    } catch (e) {
      console.error('Failed to save surat masuk to localStorage', e);
    }
  }, [suratMasukList]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.SURAT_KELUAR, JSON.stringify(suratKeluarList));
    } catch (e) {
      console.error('Failed to save surat keluar to localStorage', e);
    }
  }, [suratKeluarList]);

  const updateProfil = (newProfil: ProfilSekolah) => {
    setProfil(newProfil);
  };

  const getNextNoAgenda = (type: 'masuk' | 'keluar'): string => {
    const year = new Date().getFullYear();
    if (type === 'masuk') {
      const nextNum = suratMasukList.length + 1;
      return `${String(nextNum).padStart(3, '0')}/SM/${year}`;
    } else {
      const nextNum = suratKeluarList.length + 1;
      return `${String(nextNum).padStart(3, '0')}/SK/${year}`;
    }
  };

  const generateNoSuratKeluar = (kodeKlasifikasiRaw: string, tglSurat: string): string => {
    const year = tglSurat ? new Date(tglSurat).getFullYear() : new Date().getFullYear();
    const kode = kodeKlasifikasiRaw.split(' ')[0] || '420';
    const nextSeq = String(suratKeluarList.length + 1).padStart(3, '0');
    return `${kode}/${nextSeq}/${profil.kodeSuratSekolah || 'SMPN14-TBB'}/${year}`;
  };

  const addSuratMasuk = (item: Omit<SuratMasuk, 'id' | 'createdAt'>): string => {
    const newId = 'sm-' + Date.now();
    const newItem: SuratMasuk = {
      ...item,
      id: newId,
      createdAt: new Date().toISOString(),
    };
    setSuratMasukList((prev) => [newItem, ...prev]);
    return newId;
  };

  const updateSuratMasuk = (id: string, updatedFields: Partial<SuratMasuk>) => {
    setSuratMasukList((prev) =>
      prev.map((item) => (item.id === id ? { ...item, ...updatedFields } : item))
    );
  };

  const deleteSuratMasuk = (id: string) => {
    setSuratMasukList((prev) => prev.filter((item) => item.id !== id));
  };

  const simpanDisposisi = (id: string, disposisi: DisposisiData) => {
    setSuratMasukList((prev) =>
      prev.map((item) =>
        item.id === id
          ? {
              ...item,
              disposisi,
              statusDisposisi: 'Sudah Didisposisi',
            }
          : item
      )
    );
  };

  const addSuratKeluar = (item: Omit<SuratKeluar, 'id' | 'createdAt'>): string => {
    const newId = 'sk-' + Date.now();
    const newItem: SuratKeluar = {
      ...item,
      id: newId,
      createdAt: new Date().toISOString(),
    };
    setSuratKeluarList((prev) => [newItem, ...prev]);
    return newId;
  };

  const updateSuratKeluar = (id: string, updatedFields: Partial<SuratKeluar>) => {
    setSuratKeluarList((prev) =>
      prev.map((item) => (item.id === id ? { ...item, ...updatedFields } : item))
    );
  };

  const deleteSuratKeluar = (id: string) => {
    setSuratKeluarList((prev) => prev.filter((item) => item.id !== id));
  };

  const resetToSampleData = () => {
    setProfil(INITIAL_PROFIL_SEKOLAH);
    setSuratMasukList(INITIAL_SURAT_MASUK);
    setSuratKeluarList(INITIAL_SURAT_KELUAR);
    localStorage.removeItem(STORAGE_KEYS.PROFIL);
    localStorage.removeItem(STORAGE_KEYS.SURAT_MASUK);
    localStorage.removeItem(STORAGE_KEYS.SURAT_KELUAR);
  };

  const exportDataJSON = () => {
    const backupData = {
      app: 'E-Surat SMPN 14 Tulang Bawang Barat',
      version: '1.0',
      exportDate: new Date().toISOString(),
      profil,
      suratMasukList,
      suratKeluarList,
    };
    const blob = new Blob([JSON.stringify(backupData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `backup_esurat_smpn14_tubaba_${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const importDataJSON = (jsonStr: string): boolean => {
    try {
      const parsed = JSON.parse(jsonStr);
      if (parsed && Array.isArray(parsed.suratMasukList) && Array.isArray(parsed.suratKeluarList)) {
        if (parsed.profil) setProfil(parsed.profil);
        setSuratMasukList(parsed.suratMasukList);
        setSuratKeluarList(parsed.suratKeluarList);
        return true;
      }
      return false;
    } catch {
      return false;
    }
  };

  return (
    <SuratContext.Provider
      value={{
        profil,
        updateProfil,
        suratMasukList,
        suratKeluarList,
        addSuratMasuk,
        updateSuratMasuk,
        deleteSuratMasuk,
        simpanDisposisi,
        addSuratKeluar,
        updateSuratKeluar,
        deleteSuratKeluar,
        getNextNoAgenda,
        generateNoSuratKeluar,
        resetToSampleData,
        exportDataJSON,
        importDataJSON,
      }}
    >
      {children}
    </SuratContext.Provider>
  );
};

export const useSurat = () => {
  const context = useContext(SuratContext);
  if (!context) {
    throw new Error('useSurat must be used within a SuratProvider');
  }
  return context;
};
