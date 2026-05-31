import { Suspense } from 'react';
import ViewContent from './ViewContent';

export default function ViewPage() {
  return (
    <Suspense fallback={
      <div style={{ minHeight: '100vh', background: '#090a0c', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#F59E0B', fontFamily: 'Outfit, sans-serif' }}>
        Carregando proposta...
      </div>
    }>
      <ViewContent />
    </Suspense>
  );
}
