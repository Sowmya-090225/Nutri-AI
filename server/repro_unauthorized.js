const http = require('http');

function request(options, data) {
  return new Promise((resolve, reject) => {
    const req = http.request(options, (res) => {
      let body = '';
      res.on('data', (chunk) => body += chunk);
      res.on('end', () => {
        try {
          resolve({ body: JSON.parse(body), statusCode: res.statusCode });
        } catch (e) {
          resolve({ body, statusCode: res.statusCode });
        }
      });
    });
    req.on('error', reject);
    if (data) req.write(JSON.stringify(data));
    req.end();
  });
}

async function test() {
  try {
    console.log('Logging in...');
    const loginRes = await request({
      hostname: 'localhost',
      port: 5000,
      path: '/api/auth/login',
      method: 'POST',
      headers: { 'Content-Type': 'application/json' }
    }, { email: 'test@example.com', password: 'password123' });

    if (loginRes.statusCode !== 200) throw new Error('Login failed: ' + JSON.stringify(loginRes.body));
    const token = loginRes.body.token;

    console.log('Testing GET /api/profile...');
    const getRes = await request({
      hostname: 'localhost',
      port: 5000,
      path: '/api/profile',
      method: 'GET',
      headers: { 'Authorization': `Bearer ${token}` }
    });
    console.log('GET Status:', getRes.statusCode);

    console.log('Testing PUT /api/profile...');
    const putRes = await request({
      hostname: 'localhost',
      port: 5000,
      path: '/api/profile',
      method: 'PUT',
      headers: { 
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    }, { age: 20 });
    console.log('PUT Status:', putRes.statusCode);
    if (putRes.statusCode === 401) {
        console.log('PUT failed with 401 Unauthorized!');
    }

    process.exit(0);
  } catch (err) {
    console.error('Test failed:', err);
    process.exit(1);
  }
}

test();
