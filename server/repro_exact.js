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
    // 1. Login
    console.log('Logging in...');
    const loginRes = await request({
      hostname: 'localhost',
      port: 5000,
      path: '/api/auth/login',
      method: 'POST',
      headers: { 'Content-Type': 'application/json' }
    }, { email: 'test@example.com', password: 'password123' });

    if (loginRes.statusCode !== 200) {
        // Try register if login fails
        console.log('Login failed, trying register...');
        const regRes = await request({
            hostname: 'localhost',
            port: 5000,
            path: '/api/auth/register',
            method: 'POST',
            headers: { 'Content-Type': 'application/json' }
        }, { email: 'test@example.com', password: 'password123', name: 'Test User' });
        if (regRes.statusCode !== 201) throw new Error('Auth failed');
        token = regRes.body.token;
    } else {
        token = loginRes.body.token;
    }

    // 2. Update Profile with specific values from screenshot
    // Height: 155 (from screenshot), Weight: 80 (from screenshot)
    // Goal: Weight Loss (weight_loss), Preference: Vegetarian (veg)
    const profileData = {
      age: '20',
      weight: '80',
      height: '155',
      gender: 'male',
      goal: 'weight_loss',
      dietaryPreference: 'veg',
      allergies: '',
      avatar: null
    };

    console.log('Updating profile...');
    const profileRes = await request({
      hostname: 'localhost',
      port: 5000,
      path: '/api/profile',
      method: 'PUT',
      headers: { 
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    }, profileData);

    console.log('Response Status:', profileRes.statusCode);
    console.log('Response Body:', JSON.stringify(profileRes.body, null, 2));
    process.exit(0);
  } catch (err) {
    console.error('Test failed:', err);
    process.exit(1);
  }
}

test();
