const bcrypt = require('bcryptjs');

describe('User Registration', () => {
  it('should hash the password correctly', async () => {
    // Simulate user input
    const password = 'password123';

    // Simulate bcrypt hashing
    const hashedPassword = await bcrypt.hash(password, 8);

    // Check if the hashed password is non-empty and different from the original password
    expect(hashedPassword).toBeTruthy();
    expect(hashedPassword).not.toEqual(password);
  });
});
