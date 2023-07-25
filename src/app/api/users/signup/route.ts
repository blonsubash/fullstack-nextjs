import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcyrptjs from "bcryptjs";
import { sendEmail } from "@/helpers/mailer";

connect();

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { username, email, password } = reqBody;
    console.log("reqBody", reqBody);

    //Check if user already exits
    const user = await User.findOne({ email });
    if (user) {
      return NextResponse.json(
        { error: "User already exits" },
        { status: 400 }
      );
    }

    //hash password
    const salt = await bcyrptjs.genSalt(10);
    const hashedPassword = await bcyrptjs.hash(password, salt);

    const newUser = new User({
      username,
      email,
      password: hashedPassword,
    });

    const saveduser = await newUser.save();
    console.log("saveduser", saveduser);

    //send Verification email
    await sendEmail({ email, emailType: "VERIFY", userId: saveduser._id });
    return NextResponse.json({
      message: "User created successfully",
      success: true,
      saveduser,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
