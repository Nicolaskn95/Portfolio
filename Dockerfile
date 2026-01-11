# --- Stage 1: Build ---
FROM node:22-alpine AS builder

# Define o diretório de trabalho na raiz para manter a estrutura relativa
WORKDIR /app

# Instala dependências do sistema necessárias (opcional, mas bom para Prisma em Alpine)
RUN apk add --no-cache openssl

# Copia os package.json e lockfiles primeiro para aproveitar o cache do Docker
# Assumindo que tens o yarn.lock no backend, conforme os metadados
COPY core/package.json ./core/
COPY backend/package.json backend/yarn.lock ./backend/

# Instala as dependências do Backend
WORKDIR /app/backend
RUN yarn install --frozen-lockfile

# Copia o código fonte de ambos os módulos
WORKDIR /app
COPY core ./core
COPY backend ./backend

# Gera o cliente do Prisma (necessário antes do build)
WORKDIR /app/backend
RUN npx prisma generate

# Compila o projeto NestJS
RUN yarn build

# Limpa dependências de desenvolvimento para reduzir o tamanho da imagem final
# (Opcional: remove se preferires manter tudo)
RUN yarn install --production --ignore-scripts --prefer-offline

# --- Stage 2: Production ---
FROM node:22-alpine AS runner

WORKDIR /app

ENV NODE_ENV=production

# Instala openssl para o Prisma funcionar em produção no Alpine
RUN apk add --no-cache openssl

# Copia apenas os ficheiros necessários do estágio de build
COPY --from=builder /app/backend/dist ./dist
COPY --from=builder /app/backend/node_modules ./node_modules
COPY --from=builder /app/backend/package.json ./
COPY --from=builder /app/backend/prisma ./prisma

# Expõe a porta usada pelo NestJS (padrão 3000)
EXPOSE 3000

# Comando para iniciar a aplicação
CMD ["node", "dist/main"]