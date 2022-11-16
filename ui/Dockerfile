FROM node:16-alpine3.15 AS builder

COPY src /build/src/
COPY public /build/public/
COPY index.html package.json package-lock.json tailwind.config.cjs vite.config.ts tsconfig.json tsconfig.node.json /build/

WORKDIR /build

RUN npm install && npm run build

FROM nginx:1.21-alpine

COPY --from=builder /build/dist/ /usr/share/nginx/html
