module.exports = {
    secret: "test-secret-key"
  };

export const authRoles = {
    admin: ['ADMIN'], // Only Admin access
    guest: ['ADMIN', 'CLIENT'], // Everyone has access
    client: ['CLIENT'], // Clients
}
