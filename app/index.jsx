// 📌 Importações necessárias
import { auth } from '@/src/config/firebaseConfig';
import { router } from 'expo-router';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useState } from 'react';
import { Image, KeyboardAvoidingView, Platform, StyleSheet } from 'react-native';
import { Button, Snackbar, Text, TextInput } from 'react-native-paper';

export default function LoginScreen({ navigation }) {
  // 📌 QUESTÃO 5 - Estados do componente
  // Estados são variáveis especiais do React que, 
  // quando alteradas, atualizam a interface
  // todos eles irão ter o estado inicial definido como ('') - string vazia
  // Crie 3 estados usando useState:
  
  // 1. email: armazenará o email digitado pelo usuário// 🛠️ IMPLEMENTE AQUI
     const[ email, setEmail] = useState('')
  // 2. senha: armazenará a senha digitada// 🛠️ IMPLEMENTE AQUI
     const[ senha, setSenha] = useState('')
  
  // 3. mensagemErro: armazenará mensagens de erro para exibir ao usuário// 🛠️ IMPLEMENTE AQUI
       const[ mensagemErro, setMensagemErro] = useState('')

  // 📌 QUESTÃO 6 - Função de Login// Esta função será chamada quando o usuário clicar no botão "Entrar"
  const handleLogin = async () => {
    try {
      // Tenta fazer login no Firebase com email e senha// signInWithEmailAndPassword é uma função assíncrona (por isso o await)
      // Pesquise o que é uma função assincrona
      await signInWithEmailAndPassword(auth, email, senha);
      
      // Se chegou aqui, o login foi bem-sucedido!// O Firebase automaticamente atualiza o estado de autenticação
      console.log('Login realizado com sucesso!');
      router.replace('home');
      
    } catch (error) {
      // Se algo deu errado (email inválido, senha errada, etc.)
      console.error('Erro no login:', error.message);
      
      // 🛠️ IMPLEMENTE AQUI// Use setMensagemErro para mostrar uma mensagem amigável ao usuário// Sugestão: "Email ou senha incorretos. Tente novamente."
      setMensagemErro('Email ou senha incorretos. Tente novamente.');
    }
  };

  return (
    <KeyboardAvoidingView 
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      {/* 📌 QUESTÃO 7 - Logo da Aplicação */}
      {/* A imagem da logo ficará aqui */}
      {/* Use uma logo de sua preferência. */}
      <Image 
        source={require('@/assets/images/icon.png')}
        style={styles.logo}
        resizeMode="contain"
      />

      {/* Título da tela */}
      <Text style={styles.titulo}>Bem-vindo de volta!</Text>
      <Text style={styles.subtitulo}>Faça login para continuar</Text>

      {/* 📌 QUESTÃO 8 - Campo de Email */}
      {/* TextInput do React Native Paper - um campo de texto estilizado */}
      <TextInput
        label="Email"
        value={email} // 🏗️ use a variavel que o react precisa monitorar, ou seja, aquela que ele precisa saber que mudou. 
        onChangeText={setEmail} // 🏗️ Atualiza o estado 'email' quando o usuário digita, chame a função responsável por atualizar o valor da variavel email.
        mode="outlined"
        keyboardType="email-address" // Mostra teclado específico para email
        autoCapitalize="none" // Desativa auto-capitalização
        style={styles.input}
        left={<TextInput.Icon icon="email" />}
      />

      {/* 📌 QUESTÃO 9 - Campo de Senha */}
      {/* 🛠️ IMPLEMENTE AQUI */}
      {/* Crie um TextInput similar ao de cima, mas para senha */}
      {/* Dicas:
          - label: "Senha"
          - value: senha
          - onChangeText: setSenha
          - secureTextEntry: true (para ocultar a senha)
          - left: <TextInput.Icon icon="lock" />
      */}
<TextInput
        label="Senha"
        value={senha} // 🏗️ use a variavel que o react precisa monitorar, ou seja, aquela que ele precisa saber que mudou. 
        onChangeText={setSenha} // 🏗️ Atualiza o estado 'email' quando o usuário digita, chame a função responsável por atualizar o valor da variavel email.
        secureTextEntry= {true}
        autoCapitalize="none" // Desativa auto-capitalização
        style={styles.input}
        left={<TextInput.Icon icon="email" />}
      />

      {/* 📌 QUESTÃO 10 - Botão de Login */}
      {/* Button do React Native Paper - um botão estilizado */}
      <Button 
        mode="contained" 
        onPress={handleLogin} // Chama a função handleLogin quando clicado
        style={styles.botao}
        contentStyle={styles.botaoConteudo}
      >
        Entrar
      </Button>

      {/* 📌 QUESTÃO 11 - Link para tela de Cadastro */}
      {/* Quando clicado, navega para a tela de cadastro (criaremos na Parte 2) */}
      <Button 
        mode="text" 
        onPress={() => router.navigate('cadastro')}
        style={styles.botaoTexto}
      >
        Não tem conta? Cadastre-se
      </Button>

      {/* 📌 QUESTÃO 12 - Snackbar para mensagens de erro */}
      {/* Snackbar: pequena mensagem que aparece na parte inferior da tela */}
      <Snackbar
        visible={mensagemErro !== ''} // Só aparece se houver mensagem de erro
        onDismiss={() => setMensagemErro('')} // Limpa a mensagem ao fechar
        duration={3000} // Desaparece após 3 segundos
      >
        {mensagemErro}
      </Snackbar>
    </KeyboardAvoidingView>
  );
}

// 📌 QUESTÃO 13 - Estilos da Tela// StyleSheet.create cria um objeto de estilos otimizado
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  logo: {
    width: 150,
    height: 150,
    alignSelf: 'center',
    marginBottom: 20,
  },
  titulo: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 8,
    color: '#333',
  },
  subtitulo: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 30,
    color: '#666',
  },
  input: {
    marginBottom: 16,
    backgroundColor: '#fff',
  },
  botao: {
    marginTop: 16,
    marginBottom: 12,
  },
  botaoConteudo: {
    paddingVertical: 8,
  },
  botaoTexto: {
    marginTop: 8,
  },
});