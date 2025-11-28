// 📌 Context API do React para gerenciar estado de autenticação globalmente
import { onAuthStateChanged } from 'firebase/auth';
import { createContext, useContext, useEffect, useState } from 'react';
import { auth } from '../config/firebaseConfig';

// 📌 QUESTÃO 5 - Criar o contexto// Cria o contexto com valor inicial null
const AuthContext = createContext(null);

// 📌 QUESTÃO 6 - Provider do Contexto// Este componente envolverá todo o app e fornecerá o estado de autenticação
export function AuthProvider({ children }) {
  // Estados para armazenar o usuário atual e o status de carregamento
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 📌 onAuthStateChanged: ouve mudanças no estado de autenticação// Quando o usuário faz login/logout, esta função é chamada automaticamente
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);  // Atualiza o usuário atual
      setLoading(false);     // Terminou de carregar
    });

    // Cleanup: para de ouvir quando o componente for desmontado
    return unsubscribe;
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

// 📌 QUESTÃO 7 - Hook personalizado para usar o contexto// Facilita o acesso ao contexto em qualquer componente
export function useAuth() {
  const context = useContext(AuthContext);
  if (context === null) {
    throw new Error('useAuth deve ser usado dentro de AuthProvider');
  }
  return context;
}