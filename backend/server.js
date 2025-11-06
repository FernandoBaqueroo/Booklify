require('dotenv').config();
const app = require('./src/app');

const PORT = process.env.PORT || 3000;
const NODE_ENV = process.env.NODE_ENV || 'development';

const server = app.listen(PORT, () => {
  console.log('╔════════════════════════════════════════════════════════════╗');
  console.log('║        🚀 BOOKLIFY API - Servidor iniciado                ║');
  console.log('╠════════════════════════════════════════════════════════════╣');
  console.log(`║  🌍 Entorno:     ${NODE_ENV.padEnd(39)} ║`);
  console.log(`║  🔗 Puerto:      ${String(PORT).padEnd(39)} ║`);
  console.log(`║  📍 URL:         http://localhost:${PORT}${' '.repeat(22)} ║`);
  console.log(`║  📚 API Docs:    http://localhost:${PORT}/api/books${' '.repeat(11)} ║`);
  console.log(`║  ❤️  Health:     http://localhost:${PORT}/health${' '.repeat(15)} ║`);
  console.log('╚════════════════════════════════════════════════════════════╝');
  console.log('');
  console.log('✅ Middlewares activos:');
  console.log('   • Helmet (Seguridad HTTP)');
  console.log('   • CORS (Configurado)');
  console.log('   • Rate Limiting (100 req/15min general, 30 req/min búsquedas)');
  console.log('   • Compression (Gzip)');
  console.log('   • Cache (En memoria)');
  console.log('   • Morgan (Logging)');
  console.log('   • Express Validator (Validación de inputs)');
  console.log('');
});

// Manejo graceful shutdown
process.on('SIGTERM', () => {
  console.log('⚠️  SIGTERM recibido. Cerrando servidor gracefully...');
  server.close(() => {
    console.log('✅ Servidor cerrado correctamente');
    process.exit(0);
  });
});

process.on('SIGINT', () => {
  console.log('\n⚠️  SIGINT recibido. Cerrando servidor gracefully...');
  server.close(() => {
    console.log('✅ Servidor cerrado correctamente');
    process.exit(0);
  });
});

// Manejo de errores no capturados
process.on('unhandledRejection', (err) => {
  console.error('❌ UNHANDLED REJECTION! Cerrando...');
  console.error(err);
  server.close(() => {
    process.exit(1);
  });
});

process.on('uncaughtException', (err) => {
  console.error('❌ UNCAUGHT EXCEPTION! Cerrando...');
  console.error(err);
  server.close(() => {
    process.exit(1);
  });
});