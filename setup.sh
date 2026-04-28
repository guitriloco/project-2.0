#!/bin/bash

# ==========================================
# Project 2.0 - Setup Script
# ==========================================

set -e

echo "🚀 Iniciando configuração do Project 2.0..."

# Cores
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m'

# Verificar Node.js
if ! command -v node &> /dev/null; then
    echo -e "${YELLOW}❌ Node.js não encontrado. Instale o Node.js 18+${NC}"
    exit 1
fi

echo -e "${GREEN}✅ Node.js encontrado: $(node -v)${NC}"

# Verificar npm
if ! command -v npm &> /dev/null; then
    echo -e "${YELLOW}❌ npm não encontrado${NC}"
    exit 1
fi

echo -e "${GREEN}✅ npm encontrado: $(npm -v)${NC}"

# Backend
echo -e "\n${YELLOW}📦 Instalando backend...${NC}"
cd backend
npm install
echo -e "${GREEN}✅ Backend instalado${NC}"

# Frontend
echo -e "\n${YELLOW}📦 Instalando frontend...${NC}"
cd ../frontend
npm install
echo -e "${GREEN}✅ Frontend instalado${NC}"

# Voltar ao diretório principal
cd ..

# Criar .env se não existir
if [ ! -f backend/.env ]; then
    echo -e "\n${YELLOW}⚙️  Criando arquivo .env...${NC}"
    cp backend/.env.example backend/.env 2>/dev/null || true
fi

echo -e "\n${GREEN}🎉 Configuração concluída!${NC}"
echo -e "\nPara iniciar:"
echo -e "  Backend:  cd backend && npm run dev"
echo -e "  Frontend: cd frontend && npm run dev"
echo -e "\nOu use: npm run dev:all (se configurado)"