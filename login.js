document.getElementById('loginForm').addEventListener('submit', async (e) => {
      e.preventDefault();

      const username = document.getElementById('username').value.trim();
      const password = document.getElementById('password').value.trim();

      try {
        const params = new URLSearchParams();
        params.append('scope', 'openid');
        params.append('grant_type', 'password');
        params.append('client_id', 'agent-creator-test');
        params.append('username', username);
        params.append('password', password);

        const response = await fetch(
          'https://agentcreatortestapi.global-bilgi.entp/security/login',
          {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: params
          }
        );

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.error_description || data.message || 'Login failed');
        }

        // Store token for chatbot
        localStorage.setItem('token', data.access_token || data.token);

        // Redirect to chatbot
        window.location.href = 'chatbot.html';
      } catch (err) {
        alert(err.message);
      }
    });