// 📌 QUESTÃO 1 - Tela de Cadastro com Busca de CEP
import React, { useState } from 'react';
import { 
  View, 
  StyleSheet, 
  ScrollView, 
  KeyboardAvoidingView, 
  Platform 
} from 'react-native';
import { 
  TextInput, 
  Button, 
  Text, 
  Snackbar,
  HelperText 
} from 'react-native-paper';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../src/config/firebaseConfig';
import { router } from 'expo-router';

export default function CadastroScreen() {
  // 📌 QUESTÃO 2 - Estados para dados do usuário
  // Crie estados para armazenar os dados do formulário
  
  // Dados PRODUTO -
  const[nome, setNome] = useState('');
const [email, setEmail] = useState('');
const[senha, setSenha] = useState('');
const[confirmarSenha, setConfirmarSenha] = useState ('');

const[cep, setCep] = useState('');
const[logradouro, setLogradouro] = useState('');
const[numero, setNumero] = useState('');
const[complemento, setComplemento] = useState('');
const[bairro, setBairro] = useState('');
const[cidade, setCidade] = useState('');
const[estado, setEstado] = useState('');
  
  // 🛠️ IMPLEMENTE AQUI - Crie estados para o endereço
  // Dica: cep, logradouro, numero, complemento, bairro, cidade, estado
 
  
  // Estados de controle
  const [loading, setLoading] = useState(false);
  const [loadingCep, setLoadingCep] = useState(false);
  const [mensagem, setMensagem] = useState('');
  const [tipoMensagem, setTipoMensagem] = useState('error'); // 'error' ou 'success'
  const [erros, setErros] = useState({}); // Armazena erros de validação

  // 📌 QUESTÃO 3 - Função para buscar CEP
  // Esta função será chamada quando o usuário digitar 8 dígitos no campo CEP
  const buscarCep = async (cepDigitado) => {
    // Remove caracteres não numéricos
    const cepLimpo = cepDigitado.replace(/\D/g, '');
    
    // Verifica se o CEP tem 8 dígitos
    if (cepLimpo.length !== 8) {
      return;
    }

    setLoadingCep(true);
    try {
      // 🛠️ IMPLEMENTE AQUI
      // Faça uma requisição para a API ViaCEP
      // URL: https://viacep.com.br/ws/${cepLimpo}/json/
      const response = await fetch(`https://viacep.com.br/ws/${cepLimpo}/json/`);
      const data = await response.json();

      // Verifica se o CEP é válido
      if (data.erro) {
        setMensagem('CEP não encontrado.');
        setTipoMensagem('error');
        limparEndereco();
        return;
      }

      // 🛠️ IMPLEMENTE AQUI
      // Preencha os campos de endereço com os dados retornados
      // data.logradouro, data.bairro, data.localidade, data.uf
      setLogradouro(data.logradouro || '');
      setBairro(data.bairro || '');
      setCidade(data.localidade || '');
      setEstado(data.uf || '');
      
      // Remove erro do CEP se estava presente
      setErros(prev => ({ ...prev, cep: '' }));
      
    } catch (error) {
      console.error('Erro ao buscar CEP:', error);
      setMensagem('Erro ao buscar CEP. Verifique sua conexão.');
      setTipoMensagem('error');
      limparEndereco();
    } finally {
      setLoadingCep(false);
    }
  };

  // Função auxiliar para limpar campos de endereço
  const limparEndereco = () => {
    setLogradouro('');
    setBairro('');
    setCidade('');
    setEstado('');
  };

  // 📌 QUESTÃO 4 - Função de validação
  // Valida todos os campos antes de enviar
  const validarCampos = () => {
    const novosErros = {};

    // Validar nome
    if (!nome.trim()) {
      novosErros.nome = 'Nome é obrigatório';
    }

    // Validar email
    if (!email.trim()) {
      novosErros.email = 'Email é obrigatório';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      novosErros.email = 'Email inválido';
    }

    // 🛠️ IMPLEMENTE AQUI
    // Validar senha (mínimo 6 caracteres)
    if (!senha) {
      novosErros.senha = 'Senha é obrigatória';
    } else if (senha.length < 6) {
      novosErros.senha = 'Senha deve ter no mínimo 6 caracteres';
    }

    // 🛠️ IMPLEMENTE AQUI
    // Validar confirmação de senha
    if (senha !== confirmarSenha) {
      novosErros.confirmarSenha = 'As senhas não coincidem';
    }

    // Validar CEP
    const cepLimpo = cep.replace(/\D/g, '');
    if (!cepLimpo) {
      novosErros.cep = 'CEP é obrigatório';
    } else if (cepLimpo.length !== 8) {
      novosErros.cep = 'CEP deve ter 8 dígitos';
    }

    // Validar campos de endereço
    if (!logradouro.trim()) novosErros.logradouro = 'Logradouro é obrigatório';
    if (!numero.trim()) novosErros.numero = 'Número é obrigatório';
    if (!bairro.trim()) novosErros.bairro = 'Bairro é obrigatório';
    if (!cidade.trim()) novosErros.cidade = 'Cidade é obrigatória';
    if (!estado.trim()) novosErros.estado = 'Estado é obrigatório';

    setErros(novosErros);
    return Object.keys(novosErros).length === 0;
  };

  // 📌 QUESTÃO 5 - Função de cadastro
  // Esta função cria o usuário no Firebase
  const handleCadastro = async () => {
    // Valida os campos
    if (!validarCampos()) {
      setMensagem('Por favor, corrija os erros no formulário.');
      setTipoMensagem('error');
      return;
    }

    setLoading(true);
    try {
      // 🛠️ IMPLEMENTE AQUI
      // Use createUserWithEmailAndPassword do Firebase
      // Passa: auth, email, senha
      await createUserWithEmailAndPassword(auth, email, senha);



      // Sucesso! Aqui você poderia salvar os dados de endereço em um banco de dados
      // Por enquanto, vamos apenas mostrar mensagem e redirecionar
      
      console.log('usuario cadastrado com sucesso!');
      console.log('Endereço:', { cep, logradouro, numero, complemento, bairro, cidade, estado });
      
      setMensagem('Cadastro realizado com sucesso!');
      setTipoMensagem('success');
      
      // Aguarda 2 segundos e redireciona para home
      setTimeout(() => {
        router.replace('home');
      }, 2000);

    } catch (error) {
      console.error('Erro ao cadastrar:', error);
      
      // Tratamento de erros específicos do Firebase
      let mensagemErro = 'Erro ao cadastrar. Tente novamente.';
      
      if (error.code === 'auth/email-already-in-use') {
        mensagemErro = 'Este email já está cadastrado.';
      } else if (error.code === 'auth/invalid-email') {
        mensagemErro = 'Email inválido.';
      } else if (error.code === 'auth/weak-password') {
        mensagemErro = 'Senha muito fraca. Use no mínimo 6 caracteres.';
      }
      
      setMensagem(mensagemErro);
      setTipoMensagem('error');
    } finally {
      setLoading(false);
    }
  };

  // 📌 QUESTÃO 6 - Função para formatar CEP
  // Formata o CEP enquanto o usuário digita (00000-000)
  const formatarCep = (texto) => {
    const numeros = texto.replace(/\D/g, '');
    if (numeros.length <= 8) {
      const cepFormatado = numeros.replace(/(\d{5})(\d{1,3})/, '$1-$2');
      setCep(cepFormatado);
      
      // Se digitou 8 números, busca o CEP
      if (numeros.length === 8) {
        buscarCep(numeros);
      }
    }
  };

  return (
    <KeyboardAvoidingView 
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView 
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
      >
        <Text style={styles.titulo}>Criar Conta</Text>
        <Text style={styles.subtitulo}>Preencha seus dados para se cadastrar</Text>

        {/* 📌 SEÇÃO 1: DADOS PESSOAIS */}
        <Text style={styles.secaoTitulo}>Dados Pessoais</Text>

        {/* Campo Nome */}
        <TextInput
          label="Nome Completo"
          value={nome}
          onChangeText={setNome}
          mode="outlined"
          style={styles.input}
          left={<TextInput.Icon icon="account" />}
          error={!!erros.nome}
          disabled={loading}
        />
        {erros.nome && <HelperText type="error">{erros.nome}</HelperText>}

        {/* Campo Email */}
        <TextInput
          label="Email"
          value={email}
          onChangeText={setEmail}
          mode="outlined"
          keyboardType="email-address"
          autoCapitalize="none"
          style={styles.input}
          left={<TextInput.Icon icon="email" />}
          error={!!erros.email}
          disabled={loading}
        />
        {erros.email && <HelperText type="error">{erros.email}</HelperText>}

        {/* Campo Senha */}
        <TextInput
          label="Senha"
          value={senha}
          onChangeText={setSenha}
          mode="outlined"
          secureTextEntry
          style={styles.input}
          left={<TextInput.Icon icon="lock" />}
          error={!!erros.senha}
          disabled={loading}
        />
        {erros.senha && <HelperText type="error">{erros.senha}</HelperText>}

        {/* 📌 QUESTÃO 7 - Campo Confirmar Senha */}
        {/* 🛠️ IMPLEMENTE AQUI */}
        {/* Crie um TextInput similar ao de senha, mas para confirmar senha */}
        {/* Dicas:
            - label: "Confirmar Senha"
            - value: confirmarSenha
            - onChangeText: setConfirmarSenha
            - secureTextEntry: true
            - error: !!erros.confirmarSenha
        */}
        <TextInput
          label="Confirmar Senha"
          value={confirmarSenha}
          onChangeText={setConfirmarSenha}
          mode="outlined"
          secureTextEntry
          style={styles.input}
          left={<TextInput.Icon icon="lock-check" />}
          error={!!erros.confirmarSenha}
          disabled={loading}
        />
        {erros.confirmarSenha && (
          <HelperText type="error">{erros.confirmarSenha}</HelperText>
        )}

        {/* 📌 SEÇÃO 2: ENDEREÇO */}
        <Text style={styles.secaoTitulo}>Endereço</Text>

        {/* Campo CEP com busca automática */}
        <TextInput
          label="CEP"
          value={cep}
          onChangeText={formatarCep}
          mode="outlined"
          keyboardType="numeric"
          style={styles.input}
          left={<TextInput.Icon icon="map-marker" />}
          right={loadingCep && <TextInput.Icon icon="loading" />}
          error={!!erros.cep}
          disabled={loading}
          placeholder="00000-000"
        />
        {erros.cep && <HelperText type="error">{erros.cep}</HelperText>}
        <HelperText type="info">
          Digite o CEP para preencher automaticamente o endereço
        </HelperText>

        {/* Campo Logradouro */}
        <TextInput
          label="Logradouro (Rua/Av)"
          value={logradouro}
          onChangeText={setLogradouro}
          mode="outlined"
          style={styles.input}
          error={!!erros.logradouro}
          disabled={loading || loadingCep}
        />
        {erros.logradouro && (
          <HelperText type="error">{erros.logradouro}</HelperText>
        )}

        {/* Linha com Número e Complemento */}
        <View style={styles.linha}>
          <View style={styles.campoMetade}>
            <TextInput
              label="Número"
              value={numero}
              onChangeText={setNumero}
              mode="outlined"
              keyboardType="numeric"
              style={styles.input}
              error={!!erros.numero}
              disabled={loading}
            />
            {erros.numero && (
              <HelperText type="error">{erros.numero}</HelperText>
            )}
          </View>

          <View style={styles.campoMetade}>
            <TextInput
              label="Complemento"
              value={complemento}
              onChangeText={setComplemento}
              mode="outlined"
              style={styles.input}
              disabled={loading}
            />
          </View>
        </View>

        {/* 📌 QUESTÃO 8 - Campos Bairro, Cidade e Estado */}
        {/* 🛠️ IMPLEMENTE AQUI */}
        {/* Crie 3 TextInputs para: bairro, cidade, estado */}
        {/* Seguindo o padrão dos campos acima */}
        
        <TextInput
          label="Bairro"
          value={bairro}
          onChangeText={setBairro}
          mode="outlined"
          style={styles.input}
          error={!!erros.bairro}
          disabled={loading || loadingCep}
        />
        {erros.bairro && <HelperText type="error">{erros.bairro}</HelperText>}

        <TextInput
          label="Cidade"
          value={cidade}
          onChangeText={setCidade}
          mode="outlined"
          style={styles.input}
          error={!!erros.cidade}
          disabled={loading || loadingCep}
        />
        {erros.cidade && <HelperText type="error">{erros.cidade}</HelperText>}

        <TextInput
          label="Estado"
          value={estado}
          onChangeText={setEstado}
          mode="outlined"
          style={styles.input}
          maxLength={2}
          autoCapitalize="characters"
          error={!!erros.estado}
          disabled={loading || loadingCep}
        />
        {erros.estado && <HelperText type="error">{erros.estado}</HelperText>}

        {/* Botão Cadastrar */}
        <Button 
          mode="contained" 
          onPress={handleCadastro}
          style={styles.botao}
          contentStyle={styles.botaoConteudo}
          loading={loading}
          disabled={loading || loadingCep}
        >
          {loading ? 'Cadastrando...' : 'Cadastrar'}
        </Button>

        {/* Link para voltar ao login */}
        <Button 
          mode="text" 
          onPress={() => router.back()}
          style={styles.botaoTexto}
          disabled={loading}
        >
          Já tem conta? Faça login
        </Button>

        {/* Snackbar para mensagens */}
        <Snackbar
          visible={mensagem !== ''}
          onDismiss={() => setMensagem('')}
          duration={3000}
          style={[
            styles.snackbar,
            tipoMensagem === 'success' && styles.snackbarSucesso
          ]}
        >
          {mensagem}
        </Snackbar>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

// 📌 QUESTÃO 9 - Estilos da Tela
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  scrollContent: {
    padding: 20,
    paddingBottom: 40,
  },
  titulo: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 8,
    marginTop: 20,
    color: '#333',
  },
  subtitulo: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 30,
    color: '#666',
  },
  secaoTitulo: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 12,
    color: '#6200ee',
  },
  input: {
    marginBottom: 4,
    backgroundColor: '#fff',
  },
  linha: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
  },
  campoMetade: {
    flex: 1,
  },
  botao: {
    marginTop: 24,
    marginBottom: 12,
  },
  botaoConteudo: {
    paddingVertical: 8,
  },
  botaoTexto: {
    marginTop: 8,
    marginBottom: 20,
  },
  snackbar: {
    backgroundColor: '#d32f2f',
  },
  snackbarSucesso: {
    backgroundColor: '#4caf50',
  },
});