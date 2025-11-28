// 📌 Tela Home - será melhorada na Parte 2
import { router } from 'expo-router';
import { signOut } from 'firebase/auth';
import { StyleSheet, View } from 'react-native';
import { Button, Text } from 'react-native-paper';
import { auth } from '../src/config/firebaseConfig';
import { useAuth } from '../src/contexts/AuthContext';

export default function HomeScreen() {
  // Obtém o usuário logado do contexto
  const { user } = useAuth();

  // Função para fazer logout
  const handleLogout = async () => {
    try {
      await signOut(auth);
      router.replace('/');
    } catch (error) {
      console.error('Erro ao fazer logout:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Bem-vindo!</Text>
      <Text style={styles.email}>{user?.email}</Text>
      <Text style={styles.mensagem}>
        Login realizado com sucesso! 🎉
      </Text>
      <Text style={styles.info}>
        Na Parte 2 do laboratório, você criará uma tela home completa
        com mais funcionalidades.
      </Text>
      <Button 
        mode="contained" 
        onPress={handleLogout}
        style={styles.botao}
      >
        Sair
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  titulo: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#333',
  },
  email: {
    fontSize: 18,
    color: '#666',
    marginBottom: 24,
  },
  mensagem: {
    fontSize: 20,
    textAlign: 'center',
    marginBottom: 16,
    color: '#4caf50',
  },
  info: {
    fontSize: 14,
    textAlign: 'center',
    color: '#999',
    marginBottom: 32,
    paddingHorizontal: 20,
  },
  botao: {
    paddingHorizontal: 32,
  },
});