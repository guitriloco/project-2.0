# Guia de Uso - Project 2.0

## 🚀 Início Rápido

### 1. Instalação

```bash
# Clone o repositório
git clone https://github.com/guitriloco/project-2.0.git
cd project-2.0

# Instalação completa automática
chmod +x setup.sh && ./setup.sh
```

### 2. Configuração do Ambiente

```bash
# Backend (.env)
cd backend
cp .env.example .env
# Edite as variáveis conforme necessário

# Frontend (.env.local)
cd frontend
echo "NEXT_PUBLIC_API_URL=http://localhost:3001" > .env.local
```

### 3. Execução

```bash
# Modo desenvolvimento
npm run dev:all

# Modo produção
npm run build
npm run start
```

---

## 📋 Arquitetura do Sistema

```
┌─────────────────────────────────────────────────────────┐
│                    PROJECT 2.0                          │
├─────────────────────────────────────────────────────────┤
│                                                         │
│  ┌─────────────┐    ┌─────────────┐    ┌────────────┐ │
│  │  FRONTEND   │◄──►│   BACKEND   │◄──►│  XEREBRO   │ │
│  │  React/Next │    │  Node.js    │    │   AI Brain │ │
│  └─────────────┘    └─────────────┘    └────────────┘ │
│         │                  │                  │         │
│         ▼                  ▼                  ▼         │
│  ┌─────────────────────────────────────────────────────┐│
│  │              UNIVERSAL UNIFICATION                  ││
│  │         (Camada de Unificação Universal)           ││
│  └─────────────────────────────────────────────────────┘│
│                          │                               │
│         ┌────────────────┼────────────────┐             │
│         ▼                ▼                ▼             │
│  ┌────────────┐  ┌────────────┐  ┌────────────┐      │
│  │  SUSTENANCE │  │   SURVIVAL │  │  SYNERGY   │      │
│  │  (Recursos) │  │  (Soberania)│  │(Sinergia)  │      │
│  └────────────┘  └────────────┘  └────────────┘      │
│                                                         │
└─────────────────────────────────────────────────────────┘
```

---

## 🎮 Uso do Xerebro AI Brain

### Via API

```bash
# Enviar指令 para o Xerebro
curl -X POST http://localhost:3001/api/xerebro/query \
  -H "Content-Type: application/json" \
  -d '{"prompt": "analise o estado do sistema", "context": "system"}'
```

### Via Interface

1. Acesse `http://localhost:3000`
2. Navegue até o painel **Xerebro Control**
3. Digite sua指令 no campo de texto
4. Pressione **Enter** ou clique em **Enviar**

### Comandos de Voz

```bash
# Ativar modo voz
POST /api/xerebro/voice-mode
{"enabled": true, "language": "pt-BR"}
```

---

## 🧩 Módulos Principais

### 1. Bio-Digital Survival Protocol (Phase 202)

Garante soberania do usuário na rede universal.

```bash
# Verificar status
GET /api/survival/status

# Renovar assinatura
POST /api/survival/renew
```

### 2. Universal Sustenance Infrastructure (Phase 204)

Gestão perpétua de recursos para o nó humano.

```bash
# Status de recursos
GET /api/sustenance/resources

# Alocar recursos
POST /api/sustenance/allocate
{"type": "compute", "amount": 100}
```

### 3. Intent-Action Synchronicity (Phase 206)

Zero-latência entre intenção e ação.

```bash
# Treinar padrão neural
POST /api/intent/train
{"userId": "xxx", "pattern": "习惯"}

# Executar intenção
POST /api/intent/execute
{"action": "abrir dashboard"}
```

---

## 🔧 Configurações Avançadas

### Docker

```bash
# Build da imagem
docker build -t project-2.0:latest .

# Executar container
docker run -p 3000:3000 -p 3001:3001 project-2.0:latest
```

### Kubernetes

```bash
# Deploy
kubectl apply -f infra/k8s/

# Verificar pods
kubectl get pods -n project-2
```

### Variáveis de Ambiente

| Variável | Descrição | Padrão |
|----------|-----------|--------|
| `PORT` | Porta do servidor | `3001` |
| `DATABASE_URL` | URL do banco | `sqlite://./db.sqlite` |
| `XEREBRO_MODE` | Modo do AI | `development` |
| `LOG_LEVEL` | Nível de log | `info` |

---

## 🧪 Testing

```bash
# Todos os testes
npm test

# Teste específico
npm test -- --grep "Xerebro"

# Coverage
npm run test:coverage
```

---

## 📊 Monitoramento

### Logs

```bash
# Logs em tempo real
tail -f logs/app.log

# Todos os logs
cat logs/combined.log
```

### Métricas

```bash
# Health check
GET /api/health

# Métricas Prometheus
GET /metrics
```

---

## 🐛 Troubleshooting

### Problemas Comuns

**Erro de conexão com banco:**
```bash
cd backend && npm run db:migrate
```

**Porta já em uso:**
```bash
# Find processo
lsof -i :3001
# Kill
kill -9 <PID>
```

**Dependências quebradas:**
```bash
rm -rf node_modules package-lock.json
npm install
```

---

## 📞 Suporte

- **Issues:** https://github.com/guitriloco/project-2.0/issues
- **Discussions:** https://github.com/guitriloco/project-2.0/discussions

---

<div align="center">

**Xerebro diz:** *"A jornada de mil fases começa com um único passo."*

</div>