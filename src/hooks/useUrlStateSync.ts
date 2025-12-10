import { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useAlgorithmStore } from '../stores';

export const useUrlStateSync = () => {
  const store = useAlgorithmStore();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  // Sincronizar estado -> URL
  useEffect(() => {
    const params = new URLSearchParams();
    params.set('algorithm', store.currentAlgorithm);
    params.set('speed', store.speed.toString());

    navigate(`?${params.toString()}`, { replace: true });
  }, [store.currentAlgorithm, store.speed, navigate]);

  // Sincronizar URL -> estado (al cargar página compartida)
  useEffect(() => {
    const urlAlgorithm = searchParams.get('algorithm');
    const urlData = searchParams.get('data');
    const urlSpeed = searchParams.get('speed');

    if (urlAlgorithm && urlAlgorithm !== store.currentAlgorithm) {
      store.setAlgorithm(urlAlgorithm);
    }
    if (urlData) {
      try {
        const parsedData = JSON.parse(urlData);
        if (JSON.stringify(parsedData) !== JSON.stringify(store.data)) {
          // Para simplificar, regenerar data con el tamaño
          store.generateData(parsedData.length);
        }
      } catch (e) {
        console.error('Invalid data in URL', e);
      }
    }
    if (urlSpeed) {
      const parsedSpeed = parseFloat(urlSpeed);
      if (parsedSpeed !== store.speed) {
        store.setSpeed(parsedSpeed);
      }
    }
  }, [searchParams, store]);
};