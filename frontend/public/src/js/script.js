(function () {
	const yearEl = document.getElementById('year');
	if (yearEl) yearEl.textContent = new Date().getFullYear().toString();
})();

const API_BASE = (typeof window !== 'undefined' && window.API_BASE) || 'http://localhost:4000';

async function api(path, options = {}) {
	const token = localStorage.getItem('token');
	const headers = Object.assign(
		{ 'Content-Type': 'application/json' },
		token ? { Authorization: `Bearer ${token}` } : {}
	);
	const res = await fetch(`${API_BASE}${path}`, { ...options, headers });
	if (!res.ok) {
		let msg = 'Request failed';
		try { const j = await res.json(); msg = j.message || msg; } catch (_e) {}
		throw new Error(msg);
	}
	return res.json().catch(() => ({}));
}

async function login(email, password) {
	const data = await api('/api/auth/login', {
		method: 'POST',
		body: JSON.stringify({ email, password })
	});
	localStorage.setItem('token', data.token);
	localStorage.setItem('role', data.role);
	localStorage.setItem('user', JSON.stringify(data.user));
	return data;
}

async function registerPatient(form) {
	const body = Object.fromEntries(new FormData(form).entries());
	const data = await api('/api/auth/register', {
		method: 'POST',
		body: JSON.stringify(body)
	});
	localStorage.setItem('token', data.token);
	localStorage.setItem('role', 'patient');
	localStorage.setItem('user', JSON.stringify(data.user));
	return data;
}

window.MC = {
	api,
	login,
	registerPatient,
	async registerDoctor(form) {
		const body = Object.fromEntries(new FormData(form).entries());
		// POST to /api/doctors to create the doctor account
		const doctor = await api('/api/doctors', {
			method: 'POST',
			body: JSON.stringify(body)
		});
		// Then login to obtain token for future requests
		const auth = await login(body.email, body.password);
		return { doctor, ...auth };
	}
};

