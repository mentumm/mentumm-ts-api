import { Request, Response } from "express";
import { CreateUser, RegisterUser } from "../models/users.model";
import {
  authenticateUser,
  createBooking,
  createUser,
  deleteUser,
  getUsers,
  getUpcomingBookings,
  getPastBookings,
  initiatePasswordReset,
  resetPasswordFromToken,
  registerUser,
  updateUser,
} from "../services/users.service";

export const users = async (req: Request, res: Response) => {
  const { id, name, email, employer_id, limit } = req.query;

  try {
    const user = await getUsers(
      Number(id),
      name as string,
      email as string,
      Number(employer_id),
      limit ? Number(limit) : 100
    );

    return res.json(user);
  } catch (error) {
    return res.status(500).send(error);
  }
};

export const newUser = async (
  req: Request,
  res: Response
): Promise<Response> => {
  // technically you can create a User with a deactivated Employer acct
  // we will handle this on the front-end but good to remember if API is opened up
  const body: CreateUser = req.body;

  try {
    const user = await createUser(body);

    return res.json(user);
  } catch (error) {
    return res.status(500).send(error);
  }
};

export const bookCoach = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const body = req.body;

  try {
    const userCoach = await createBooking(body);

    return res.json(userCoach);
  } catch (error) {
    return res.status(500).send(error);
  }
};

export const registerNewUser = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const body: RegisterUser = req.body;

  try {
    const user = await registerUser(body);

    return res.json(user);
  } catch (error) {
    return res.status(500).send(error);
  }
};

export const deactivateUser = async (req: Request, res: Response) => {
  const id = req.query.id;

  try {
    const user = await deleteUser(Number(id));

    return res.json(user);
  } catch (error) {
    return res.status(500).send(error);
  }
};

export const updateUserInfo = async (req: Request, res: Response) => {
  try {
    const updatedUser = await updateUser(req.body);

    return res.json(updatedUser);
  } catch (error) {
    return res.status(500).send(error);
  }
};

export const userLogin = async (req: Request, res: Response) => {
  const { password, email } = req.body;
  try {
    const user = await authenticateUser(email, password);

    return res.json(user);
  } catch (error) {
    return res.status(500).send(error);
  }
};

export const upcoming = async (req: Request, res: Response) => {
  const { id } = req.query;

  try {
    const bookings = await getUpcomingBookings(Number(id));

    return res.json(bookings);
  } catch (error) {
    return res.status(500).send(error);
  }
};

export const past = async (req: Request, res: Response) => {
  const { id } = req.query;

  try {
    const bookings = await getPastBookings(Number(id));

    return res.json(bookings);
  } catch (error) {
    return res.status(500).send(error);
  }
};

export const forgotPassword = async (req: Request, res: Response) => {
  const { email } = req.body;
  try {
    await initiatePasswordReset(email);

    return res.json({ success: true });
  } catch (error) {
    return res.status(500).send(error);
  }
};

export const resetPassword = async (req: Request, res: Response) => {
  const { reset_password_token, password } = req.body;
  try {
    const result = await resetPasswordFromToken(reset_password_token, password);

    return res.json(result);
  } catch (error) {
    return res.status(500).send(error);
  }
};
