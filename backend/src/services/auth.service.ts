import jwt from 'jsonwebtoken';
import mongoose, { Types } from 'mongoose';
import User, { IUser } from '../models/user.model';

export interface UserResponse {
  _id: Types.ObjectId;
  name: string;
  email: string;
  token?: string;
}

export interface RegisterUserParams {
  name: string;
  email: string;
  password: string;
}

export interface LoginParams {
  email: string;
  password: string;
}

export class AuthService {
  private generateToken(id: string): string {
    return jwt.sign({ id }, process.env.JWT_SECRET || 'defaultsecret', {
      expiresIn: '30d',
    });
  }

  async registerUser({ name, email, password }: RegisterUserParams): Promise<UserResponse> {
    const userExists = await User.findOne({ email });
    if (userExists) {
      throw new Error('User already exists');
    }

    const user = await User.create({
      name,
      email,
      password,
    }) as IUser & { _id: Types.ObjectId };

    const userId = user._id.toString();
    
    return {
      _id: user._id,
      name: user.name,
      email: user.email,
      token: this.generateToken(userId),
    };
  }

  async loginUser({ email, password }: LoginParams): Promise<UserResponse> {
    const user = await User.findOne({ email }) as IUser & { _id: Types.ObjectId } | null;

    if (user && (await user.comparePassword(password))) {
      const userId = user._id.toString();
      
      return {
        _id: user._id,
        name: user.name,
        email: user.email,
        token: this.generateToken(userId),
      };
    }
    
    throw new Error('Invalid email or password');
  }

  async getUserProfile(userId: Types.ObjectId): Promise<UserResponse> {
    const user = await User.findById(userId).select('-password') as IUser & { _id: Types.ObjectId } | null;
    
    if (!user) {
      throw new Error('User not found');
    }
    
    return {
      _id: user._id,
      name: user.name,
      email: user.email,
    };
  }
}

export default new AuthService(); 