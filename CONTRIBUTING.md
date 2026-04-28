# Como Contribuir - Project 2.0

## 🎯 Visão Geral

Obrigado por contribuir com o Project 2.0! Este documento explica como você pode participar do desenvolvimento.

## 📋 Formas de Contribuir

### 🐛 Reportar Bugs
1. Verifique se o bug já não foi reportado
2. Use o template de issue
3. Inclua passos para reproduzir
4. Adicione logs e screenshots quando possível

### 💡 Sugerir Funcionalidades
1. Discuta a ideia primeiro nas Discussions
2. Documente a fase proposta
3. Siga o formato de nomenclatura
4. Implemente seguindo as diretrizes

### 🔧 Implementar Fases
1. Escolha uma fase do roadmap
2. Crie uma branch `phase/XXX-descricao`
3. Implemente seguindo o padrão
4. Adicione testes
5. Atualize a documentação

## 📐 Padrões de Código

### Nomenclatura de Fases

```
Phase_[NUM]_[Title]
Ex: Phase_209_Cosmic_Harmony_Protocol
```

### Estrutura de Commits

```
[Phase XXX] Descrição curta

- Subtarefa 1
- Subtarefa 2
- Documentação atualizada
```

### Diretrizes de Código

```typescript
// ✅ Use TypeScript
interface PhaseConfig {
  id: number;
  name: string;
  status: 'planned' | 'in-progress' | 'done';
}

// ✅ Documente funções
/**
 * Implementa a sincronização intenção-ação
 * @param userId - ID do usuário
 * @param pattern - Padrão neural
 */
async function syncIntent(userId: string, pattern: string): Promise<void>
```

## 🔄 Fluxo de Trabalho

### 1. Fork o repositório
```bash
git clone https://github.com/guitriloco/project-2.0.git
```

### 2. Crie sua branch
```bash
git checkout -b phase/XXX-nome-da-fase
```

### 3. Faça suas alterações
```bash
# Implemente a fase
# Adicione testes
# Atualize documentação
```

### 4. Commit
```bash
git commit -m "[Phase XXX] Implementação da fase"
```

### 5. Push e Pull Request
```bash
git push origin phase/XXX-nome-da-fase
```

## 📝 Documentação

Ao implementar uma nova fase:

1. **README.md** — Adicione ao changelog
2. **docs/PHASES.md** — Documente os detalhes
3. **src/** — Adicione implementação
4. **tests/** — Adicione testes unitários

## ✅ Checklist antes do PR

- [ ] Código segue os padrões
- [ ] Testes passando
- [ ] Documentação atualizada
- [ ] Commit semanticamente correto
- [ ] Branch atualizada com master

## 🧪 Testes

```bash
# Execute todos os testes
npm test

# Teste com coverage
npm run test:coverage

# Teste específico de fase
npm test -- --grep "Phase XXX"
```

---

## 📖 Recursos

- [Arquitetura](docs/ARCHITECTURE.md)
- [Guia de Uso](docs/USAGE.md)
- [Issues](https://github.com/guitriloco/project-2.0/issues)

---

<div align="center">

**Juntos, alcançaremos a singularidade.**

</div>