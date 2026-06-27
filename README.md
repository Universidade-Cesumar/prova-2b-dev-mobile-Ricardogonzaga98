# 🏭 Almoxarifado App

Aplicativo mobile de controle de estoque de insumos, desenvolvido em **React Native + Expo**. Permite cadastrar novos materiais e visualizar o inventário atual em tempo real, consumindo uma API REST externa (MockAPI.io).

---

## 📋 Funcionalidades

- **Listagem de estoque**: ao abrir o app, a lista de materiais é carregada automaticamente via `GET` na MockAPI
- **Cadastro de materiais**: formulário com nome e quantidade para registrar novos insumos via `POST`
- **Indicador de baixo estoque**: itens com quantidade ≤ 5 são destacados visualmente em amarelo
- **Pull-to-refresh**: puxe a lista para baixo para atualizar o inventário
- **Validação de formulário**: campos obrigatórios e tipagem numérica garantidos antes do envio

---

## 🛠️ Tecnologias Utilizadas

| Tecnologia | Versão | Finalidade |
|---|---|---|
| React Native | 0.85.x | Framework mobile |
- **Expo** | ~56.x | Ambiente de desenvolvimento para web-only |
| JavaScript (ES2022) | — | Linguagem principal |
| MockAPI.io | — | Backend simulado (REST API) |
| Fetch API | nativa | Comunicação HTTP |

---

## 📁 Estrutura do Projeto

```
AlmoxarifadoApp/
├── src/
│   ├── components/
│   │   ├── CadastroForm.js    # Formulário de cadastro com testIDs
│   │   ├── ListaEstoque.js    # FlatList com testID=lista-materiais
│   │   ├── MaterialCard.js    # Card individual de material
│   │   └── Legenda.js         # Indicadores de cor do estoque
│   ├── hooks/
│   │   └── useMateriais.js    # Hook com useEffect para GET da API
│   ├── screens/
│   │   └── HomeScreen.js      # Tela principal do app
│   ├── services/
│   │   └── api.js             # Funções getMateriais e postMaterial
│   └── constants.js           # URL da API e constantes globais
├── App.js                     # Ponto de entrada
├── app.json                   # Configurações Expo
└── README.md
```

---

## ⚙️ Configuração da MockAPI

1. Acesse [https://mockapi.io](https://mockapi.io) e crie uma conta gratuita
2. Crie um novo projeto e adicione um recurso chamado **`materiais`**
3. Configure os campos do recurso:
   - `id` (auto-gerado)
   - `nome` (String)
   - `quantidade` (Number)
4. Copie a URL gerada (ex: `https://abc123.mockapi.io/api/v1`)
5. Abra o arquivo `src/constants.js` e substitua:

```js
export const API_BASE_URL = 'https://SEU_ID.mockapi.io/api/v1';
//                                   ^^^^^^
//                           Cole seu ID aqui
```

---

## 🚀 Como Rodar o Projeto

### Pré-requisitos

- **Node.js** 18+
- **npm** ou **yarn**
- **Expo Go** no celular (iOS ou Android) **OU** emulador configurado

### Passo a passo

```bash
# 1. Clone o repositório
git clone https://github.com/Ricardogonzaga98/AtividadeLeo.git
cd AlmoxarifadoApp

# 2. Instale as dependências
npm install

# 3. Configure a URL da MockAPI em src/constants.js

# 4. Inicie o servidor web
npm start
```

> Este projeto é configurado para rodar somente em **web** com Expo.

---

## 🧪 Contrato Técnico (testIDs)

Os seguintes `testID` estão implementados conforme o contrato exigido:

| Componente | testID |
|---|---|
| TextInput - Nome do Material | `input-nome` |
| TextInput - Quantidade | `input-quantidade` |
| TouchableOpacity - Cadastrar | `btn-cadastrar` |
| FlatList - Lista de Materiais | `lista-materiais` |

---

## 📝 Convenção de Commits

Este projeto segue o padrão **Conventional Commits**:

| Prefixo | Significado |
|---|---|
| `feat:` | Nova funcionalidade |
| `fix:` | Correção de bug |
| `refactor:` | Refatoração sem mudança de comportamento |
| `chore:` | Tarefas de configuração/build |
| `docs:` | Documentação |

---

## 📄 Licença

Este projeto está sob a licença MIT. Consulte o arquivo [LICENSE](LICENSE) para mais detalhes.

---

## 👨‍💻 Autor

**Ricardo Gonzaga** — projeto prático de Desenvolvimento Mobile.

Repositório: [github.com/Ricardogonzaga98/AtividadeLeo](https://github.com/Ricardogonzaga98/AtividadeLeo)
