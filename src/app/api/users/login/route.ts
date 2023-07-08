import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcyrptjs from "bcryptjs";
import jwt from "jsonwebtoken";

connect();

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { email, password } = reqBody;
    console.log("req body", reqBody);
    //Check if user exits

    const loginUser = await User.findOne({ email });
    if (!loginUser) {
      return NextResponse.json(
        { error: "User doesnot exist" },
        { status: 400 }
      );
    }

    //chekc if password is correct
    const validPassword = await bcyrptjs.compare(password, loginUser.password);
    if (!validPassword) {
      return NextResponse.json(
        { error: "Password Incorrect" },
        { status: 400 }
      );
    }

    //Create token data
    const tokenData = {
      id: loginUser._id,
      username: loginUser.username,
      email: loginUser.email,
    };

    //create token
    const token = await jwt.sign(tokenData, process.env.TOKEN_SECRET!, {
      expiresIn: "1h",
    });

    const response = NextResponse.json({
      message: "Login success",
      success: true,
    });
    response.cookies.set("token", token, {
      httpOnly: true,
    });
    return response;
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}
