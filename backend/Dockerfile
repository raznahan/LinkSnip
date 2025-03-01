FROM node:22.11.0

WORKDIR /src

COPY package*.json ./
RUN npm install

COPY . .

# Build TypeScript code (if needed, or use ts-node for development)
# RUN npm run build

# Expose the port
EXPOSE 3000

# Run the app
CMD ["npx", "ts-node", "src/index.ts"]
