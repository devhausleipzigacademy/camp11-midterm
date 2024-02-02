import { PrismaClient } from '@prisma/client';
import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';

// check if token in cookies = if user is logged in
// check which user = token = userId
//

const prisma = new PrismaClient();

export const checkAuth = async (req: Request, res: Response) => {
  // read token from cookies
  const token = req.cookies.token;
  //check if there is a token in the cookies which stands for a logged in user
  if (!token) return res.json({ isLoggedIn: false });
  try {
    //get the token back and decode the key to the original userId
    const { userId } = jwt.verify(token, process.env.JWT_SECRET!) as {
      userId: string;
    };

    // get user by userId
    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    });
    //check again if user exists
    if (!user) {
      return res.json({ isLoggedIn: false });
    }
    //return userisloggedin is true
    return res.json({ isLoggedIn: true });
  } catch (err) {
    return res.json({ isLoggedIn: false });
  }
};
