import { Response, Request } from 'express';
import bcrypt from 'bcrypt';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

//Create new User
export const createUser = async (req: Request, res: Response) => {
  try {
    const { firstName, lastName, email, password } = req.body;

    //hash the password before pushing to database
    const hashedPassword = bcrypt.hashSync(password, 10);

    //find existing user via email
    const existingUser = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    //validation
    if (existingUser) {
      return res.status(409).json({
        message: 'User already exists.',
      });
    }

    const newUser = await prisma.user.create({
      data: {
        firstName,
        lastName,
        email,
        password: hashedPassword,
      },
    });

    res.status(201).json({
      message: 'User has been registered.',
      user: newUser,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: 'unknown error',
    });
  }
};

//LogIn User
export const LogInUser = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const existingUser = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  //check if user exists, if yes move on to password
  if (!existingUser) {
    return res.status(401).json({
      message: 'Login failed. Invalid credentials.',
    });
  }

  //check if password and user email match for login
  const passwordMatches = bcrypt.compareSync(password, existingUser.password);

  if (passwordMatches) {
    res.status(200).json({
      message: 'User is logged in.',
    });
  } else {
    res.status(401).json({
      message: 'Login failed. Invalid credentials.',
    });
  }
  console.log(existingUser);
};
