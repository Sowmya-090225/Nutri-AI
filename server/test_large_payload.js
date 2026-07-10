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
    const loginRes = await request({
      hostname: 'localhost',
      port: 5000,
      path: '/api/auth/login',
      method: 'POST',
      headers: { 'Content-Type': 'application/json' }
    }, { email: 'test@example.com', password: 'password123' });

    const token = loginRes.body.token;

    // Test with a large avatar string (6MB)
    const largeAvatar = 'data:image/png;base64,' + 'a'.repeat(6 * 1024 * 1024);

    console.log('Updating profile with large avatar...');
    const profileRes = await request({
      hostname: 'localhost',
      port: 5000,
      path: '/api/profile',
      method: 'PUT',
      headers: { 
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    }, { avatar: largeAvatar });

    console.log('Response Status:', profileRes.statusCode);
    console.log('Response Body:', JSON.stringify(profileRes.body, null, 2));
    process.exit(0);
  } catch (err) {
    console.error('Test failed:', err);
    process.exit(1);
  }
}

test();
