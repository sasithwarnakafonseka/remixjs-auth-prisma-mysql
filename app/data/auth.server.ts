import bcrypt from 'bcryptjs';
import { prisma } from './database.server';
import { createCookieSessionStorage, redirect } from '@remix-run/node';

const SESSION_SECRET = process.env.SESSION_SECRET;

const sessionStorage = createCookieSessionStorage({
  cookie: {
    secure: process.env.NODE_ENV === 'production',
    secrets: [SESSION_SECRET],
    sameSite: 'lax',
    maxAge: 30 * 24 * 60 * 60, // 30 days
    httpOnly: true,
  },
});

export async function getUserFromSession(request: any) {
  const session = await sessionStorage.getSession(
    request.headers.get('Cookie')
  );

  const userId = session.get('userId');

  if (!userId) {
    return null;
  }

  return userId;
}

export async function getAuthUser(id: number) {
  try {
    const user = await prisma.users.findFirst({ where: { id } });
    return user;
  } catch (error) {
    throw new Error('Failed to get user.');
  }
}

export async function destroyUserSession(request: any) {
  const session = await sessionStorage.getSession(
    request.headers.get('Cookie')
  );

  return redirect('/', {
    headers: {
      'Set-Cookie': await sessionStorage.destroySession(session),
    },
  });
}

async function createUserSession(userId: number, redirectPath: string): Promise<Response> {
  const session = await sessionStorage.getSession();
  session.set('userId', userId);
  return redirect(redirectPath, {
    headers: {
      'Set-Cookie': await sessionStorage.commitSession(session),
    },
  });
}

export async function signup(
  email: string,
  password: string,
  firstName: string,
  lastName: string,
) {
  const existingUser = await prisma.users.findFirst({ where: { email } });

  if (existingUser) {
    const error = new Error(
      'A user with the provided email address already exists.'
    );
    throw error;
  }

  const hashedPassword = await hashPassword(password);

  await prisma.users.create({
    data: {
      email,
      password: hashedPassword,
      first_name: firstName,
      last_name: lastName,
      role: 0,
      owner: 1,
    },
  });
}

export async function login(email: string, password: string): Promise<any> {
  const existingUser = await prisma.users.findFirst({ where: { email } });
  if (!existingUser) {
    const error = new Error(
      'Could not log you in, please check the provided credentials.'
    );
    (error as any).status = 401;
    throw error;
  }
  const isMatch = await comparePassword(password, existingUser.password);
  if (!isMatch) {
    const error = new Error(
      'Could not log you in, please check the provided credentials.2'
    );
    (error as any).status = 401;
    throw error;
  }

  return createUserSession(existingUser.id, '/dashboard');
}

async function hashPassword(password: string): Promise<string> {
  const saltRounds = 10; // Number of salt rounds
  const hashedPassword = await bcrypt.hash(password, saltRounds);
  return hashedPassword;
}

async function comparePassword(password: string, hashedPassword: string): Promise<boolean> {
  const isMatch = await bcrypt.compare(password, hashedPassword);
  return isMatch;
}