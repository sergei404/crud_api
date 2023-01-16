import http from 'http'
import handler from './handler.js';

const PORT = process.env.PORT || 3000

const server = http.createServer(handler)

server.listen(PORT, () => {
  console.log(`Сервер запущен на http://localhost:${PORT}`);
})

