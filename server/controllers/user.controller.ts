import { Response, Request } from 'express';
import bcrypt from 'bcryptjs';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

//Create new User
export const createUser = async (req: Request, res: Response) => {
  try {
    const { firstName, lastName, email, password } = req.body;
    console.log(req.body)
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

    //create new user
    const newUser = await prisma.user.create({
      data: {
        firstName,
        lastName,
        email,
        password: hashedPassword,
      },
    });

    //return userID
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
export const logInUser = async (req: Request, res: Response) => {
  try {
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
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: 'unknown error',
    });
  }
};

//get user data
export const getUserData = async (req: Request, res: Response) => {
  try {
    const userId = req.params.userId;
    // get the user ID
    const userData = await prisma.user.findUnique({
      where: {
        id: userId,
      },
      select: {
        // select the neccessary fields
        id: true,
        firstName: true,
        lastName: true,
        email: true,
      },
    });

    if (!userData) {
      return res.status(404).json({
        message: 'User not found.',
      });
    }

    res.status(200).json(userData);
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: 'Unknown error',
    });
  }
};

//change user Data
export const changeUserData = async (req: Request, res: Response) => {
  try {
    const userId = req.params.userId;
    const { firstName, lastName, email } = req.body;

    const updatedUser = await prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        firstName,
        lastName,
        email,
      },
    });

    res.status(200).json({
      message: 'User data updated successfully.',
      user: updatedUser,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: 'something went wrong',
    });
  }
};

// if movie ID is found in database, delete it and return false, if it is not found, create it and return true

export const switchFavData = async (req: Request, res: Response) => {
  try {
    const movieId = req.params.movieId;
    const favMovie = await prisma.favorite.findUnique({
      where: {
        movieId: movieId,
      },
    });

    if (!favMovie) {
      const newFav = await prisma.favorite.create({
        data: {
          movieId: movieId,
        },
      });
      res.status(200).json({
        message: true,
      });
    } else {
      await prisma.favorite.delete({
        where: {
          movieId: movieId,
        },
      });
      res.status(200).json({
        message: false,
      });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: 'unknown error',
    });
  }
};

// if movie ID is found in database return true, if it is not found return false

export const getFavData = async (req: Request, res: Response) => {
  try {
    const movieId = req.params.movieId;
    const favMovie = await prisma.favorite.findUnique({
      where: {
        movieId: movieId,
      },
    });
    if (!favMovie) {
      res.status(200).json({
        message: false,
      });
    } else {
      res.status(201).json({
        message: true,
      });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: 'unknown error',
    });
  }
};

// return a list of all favorited movie IDs

export const getAllFavData = async (req: Request, res: Response) => {
  try {
    const favMovies = await prisma.favorite.findMany();
    console.log('favMovies: ', favMovies);
    res.status(200).json({
      message: favMovies,
      movies: favMovies,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: 'unknown error',
    });
  }
};

// Create new Ticket
export const createTicket = async (req: Request, res: Response) => {
  try {
    let { movieId, title, date, time, seat, price } = req.body;

    // convert movieId to a number
    movieId = +movieId;

    // create new ticket in database
    const newTicket = await prisma.ticket.create({
      data: {
        movieId,
        title,
        date: new Date(),
        seat,
        price,
      },
    });

    // part of the task to console.log those - can eventually be deleted
    console.log('Movie ID:', movieId);
    console.log('Title:', title);
    console.log('Date:', date);
    console.log('Time:', time);
    console.log('Seats:', seat);
    console.log('Total Price:', price);

    console.log('New ticket created:', newTicket);
    res
      .status(201)
      .json({ message: 'Reservation successful', ticket: newTicket });
  } catch (err) {
    console.log('Error creating reservation:', err);
    res.status(500).json({ message: 'Error creating reservation' });
  }
};
