export const liveness = () => ({ status: 'ok' });

export const readiness = () => ({ status: 'ok' });

export const healthy = () => ({ status: 'ok', uptime: process.uptime() });
