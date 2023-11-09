FROM node:18-alpine as builder
WORKDIR /tempo
COPY package*.json ./
RUN apk add --update --no-cache python3 build-base gcc && ln -sf /usr/bin/python3 /usr/bin/python
RUN npm ci
COPY . .
RUN npm run build

FROM node:18-alpine as runner

ARG NEXT_PUBLIC_SUPABASE_URL
ARG NEXT_PUBLIC_SUPABASE_ANON_KEY
ARG BASEURL

ENV NEXT_PUBLIC_SUPABASE_URL=$NEXT_PUBLIC_SUPABASE_URL
ENV NEXT_PUBLIC_SUPABASE_ANON_KEY=$NEXT_PUBLIC_SUPABASE_ANON_KEY
ENV BASEURL=$BASEURL

WORKDIR /tempo
COPY --from=builder /tempo/package*.json ./
COPY --from=builder /tempo/.next ./.next
COPY --from=builder /tempo/node_modules ./node_modules
ENV NODE_ENV=production
EXPOSE 3000
CMD ["npm", "start"]