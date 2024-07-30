import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request) {
    try {
        const { subject, message } = await request.json();

        const transporter = nodemailer.createTransport({
            host: 'your_smtp_host', // Replace with your SMTP host
            port: 465, // Adjust if needed
            secure: true, // Use true for 465, false for other ports
            auth: {
                user: 'hussainiqtidar80@gmail.com', // Your email
                pass: process.env.EMAIL_PASSWORD // Your email password from environment variable
            }
        });

        const mailOptions = {
            from: 'hussainiqtidar80@gmail.com', // Your email
            to: 'iqtidartara692@gmail.com', // Recipient email
            subject: subject,
            html: `
                <h3>Hello</h3>
                <ul>
                    <li>Title: ${subject}</li>
                    <li>Message: ${message}</li>
                </ul>
            `
        };

        await transporter.sendMail(mailOptions);

        return NextResponse.json({ message: "Email Sent Successfully" }, { status: 200 });
    } catch (error) {
        console.error('Error sending email:', error); // Enhanced error logging
        return NextResponse.json({ message: "Failed to Send Email", error: error.message }, { status: 500 });
    }
}
