import { SignJWT } from "jose";
import { NextResponse } from "next/server";
import { getJwtSecretKey } from "@lib/auth";

import { NextApiResponse } from "next";

type LoginJson = { username: string, password: string };

export default async function POST(request: LoginJson, res: NextApiResponse) {

    const body = await request;
    try {

        const token = await new SignJWT({
            username: body.username,
        })
            .setProtectedHeader({ alg: "HS256" })
            .setIssuedAt()
            .setExpirationTime("10m")
            .sign(getJwtSecretKey());

        const response = NextResponse.json(
            { success: true },
            { status: 200, headers: { "content-type": "application/json" } }
        );

        response.cookies.set({
            name: "token",
            value: token,
            path: "/",
        });

        res.send({ response });
    } catch {
        console.log(body.username + body.password)
        res.status(400).send({ error: "login" })
    }
}