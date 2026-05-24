const { Client } = require('pg');
const client = new Client({
  connectionString: 'postgresql://postgres.yxppzpvgljekxgdfpgpi:abrahamcalle199803@aws-1-sa-east-1.pooler.supabase.com:5432/postgres',
  ssl: { rejectUnauthorized: false }
});

async function run() {
  try {
    await client.connect();
    console.log('Connected to database. Formatting...');
    
    await client.query('BEGIN');
    
    
    await client.query('DELETE FROM Detalle_Ventas');
    await client.query('DELETE FROM Movimientos_Caja');
    await client.query('DELETE FROM Ventas');
    await client.query('DELETE FROM Alquileres');
    await client.query('DELETE FROM Recargas');
    await client.query('DELETE FROM Turnos');
    
    await client.query('DELETE FROM Clientes');
    await client.query('DELETE FROM Productos');
    
    await client.query("DELETE FROM Usuarios WHERE Usuario != 'admin'");
    
    await client.query('COMMIT');
    console.log('Database successfully formatted! Only admin user remains.');
  } catch (error) {
    await client.query('ROLLBACK');
    console.error('Error formatting database:', error);
  } finally {
    await client.end();
  }
}

run();
