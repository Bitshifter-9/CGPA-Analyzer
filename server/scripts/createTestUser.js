import { PrismaClient } from '../generated/prisma/index.js';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

// Load env vars
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.join(__dirname, '../.env') });

const prisma = new PrismaClient();

async function createTestUser() {
    const email = 'demo@example.com';
    const password = 'DemoUser@123';
    const username = 'DemoUser';

    try {
        // Check if user exists
        const existingUser = await prisma.user.findFirst({
            where: { email },
        });

        if (existingUser) {
            console.log('Test user already exists.');

            // Optional: Update password to ensure it matches
            const hashedPassword = await bcrypt.hash(password, 10);
            await prisma.user.update({
                where: { id: existingUser.id },
                data: { password: hashedPassword }
            });
            console.log('Test user password updated to ensure correctness.');
        } else {
            // Get a college ID (first available)
            const college = await prisma.college.findFirst();

            if (!college) {
                console.error('No colleges found. Please seed colleges first.');
                process.exit(1);
            }

            const hashedPassword = await bcrypt.hash(password, 10);

            await prisma.user.create({
                data: {
                    username,
                    email,
                    password: hashedPassword,
                    collegeId: college.id,
                    profileCompleted: true,
                },
            });
            console.log('Test user created successfully.');
        }
    } catch (error) {
        console.error('Error creating test user:', error);
    } finally {
        await prisma.$disconnect();
    }
}

createTestUser();
