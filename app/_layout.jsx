// 📌 QUESTÃO 18 - Layout Principal do App
// Este arquivo envolve todas as telas e fornece configurações globais
import { Stack } from 'expo-router';
import { Provider as PaperProvider } from 'react-native-paper';
import { AuthProvider } from '../src/contexts/AuthContext';

export default function RootLayout() {
  return (
    // 📌 PaperProvider: necessário para componentes do React Native Paper funcionarem
    <PaperProvider>
      {/* 📌 AuthProvider: fornece estado de autenticação para todo o app */}
      <AuthProvider>
        {/* 📌 Stack: gerencia a navegação entre telas */}
        <Stack
          screenOptions={{
            headerStyle: {
              backgroundColor: '#6200ee',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
          }}
        >
          {/* Tela de Login (index) */}
          <Stack.Screen 
            name="index" 
            options={{ 
              title: 'Login',
              headerShown: false, // Esconde o header na tela de login
            }} 
          />
          
          {/* Tela Home */}
          <Stack.Screen 
            name="home" 
            options={{ 
              title: 'Início',
              headerLeft: () => null, // Remove botão de voltar
            }} 
          />
          
          {/* 📌 Tela de Cadastro (Parte 2) */}
          {/* Quando criar, adicione aqui:
          <Stack.Screen 
            name="cadastro" 
            options={{ title: 'Criar Conta' }} 
          />
          */}
        </Stack>
      </AuthProvider>
    </PaperProvider>
  );
}