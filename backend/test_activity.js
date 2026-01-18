// Native fetch is available in Node 18+

async function testActivities() {
    try {
        const BASE_URL = 'http://localhost:5000';

        // 1. Login
        console.log("Logging in...");
        const loginRes = await fetch(`${BASE_URL}/api/users/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email: 'admin@gmail.com', password: 'password123' })
        });
        const loginData = await loginRes.json();
        if (!loginRes.ok) throw new Error(loginData.message);
        const token = loginData.token;
        console.log("Logged In.");

        // 2. Fetch Activities
        console.log("Fetching Activities...");
        const res = await fetch(`${BASE_URL}/api/admin/activities`, {
            headers: { 'Authorization': `Bearer ${token}` }
        });

        if (!res.ok) {
            console.log(`Status: ${res.status} ${res.statusText}`);
            const text = await res.text();
            console.log("Body:", text);
        } else {
            const data = await res.json();
            console.log("Success! Activities found:", data.length);
            console.log(JSON.stringify(data, null, 2));
        }

    } catch (error) {
        console.error("Test Failed:", error);
    }
}

testActivities();
