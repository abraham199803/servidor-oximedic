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
    
    await client.query('DELETE FROM "detalle_ventas"');
    await client.query('DELETE FROM "ventas"');
    await client.query('DELETE FROM "alquileres"');
    await client.query('DELETE FROM "recargas"');
    await client.query('DELETE FROM "turnos"');
    
    await client.query('DELETE FROM "clientes"');
    await client.query('DELETE FROM "productos"');
    
    await client.query("DELETE FROM \"usuarios\" WHERE \"usuario\" != 'admin'");
    
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
