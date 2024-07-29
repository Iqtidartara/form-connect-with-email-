import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request) {
    try {
        const { subject, message } = await request.json();

        const transporter = nodemailer.createTransport({
            service: 'zoho',
            host: 'smtpro.zoho.in',
            port: 465,
            secure: true,
            auth: {
                user: 'hussainiqtidar80@gmail.com',
                pass: process.env.NEXT_PUBLIC_PASSWORD
            }
        })

        const mailOption = {
            from: 'hussainiqtidar80@gmail.com',
            to: 'iqtidartara692@gmail.com',
            subject: "Send Email Tutorial",
            html: `
        <h3>Hello Iqtidar Hussain</h3>
        <li> title: ${subject}</li>
        <li> message: ${message}</li> 
        `
        }

        await transporter.sendMail(mailOption)

        return NextResponse.json({ message: "Email Sent Successfully" }, { status: 200 })
    } catch (error) {
        return NextResponse.json({ message: "Failed to Send Email" }, { status: 500 })
    }
}

// export async function POST(request){
//     const { subject , message } = await request.json();

//     const transporter = nodemailer.createTransport({
//         service : "zoho",
//         host :"smtpro.zoho.in",
//         port : 465,
//         secure : true,
//         auth:{
//             user: 'hussainiqitdar80@gmail.com',
//             pass: process.env.NEXT_PUBLIC_PASSWORD 
//         }

//     })

//     const mailOption = {
//         from: 'hussainiqtidar80@gmail.com',
//         to: "iqtidartara692@gmail.com",
//         subject: "Send Email Tutorial",
//         html: `
//         <h3> Hello Iqtidar Hussain </h3>
//         <li>title: ${subject}</li>
//         <li>message: ${message}</li>`
        
        
//     }
//     await transporter.sendMail(mailOption)
//     return NextResponse.json({ message : "Email Sent Sucessfully"}, { status : 200})
// }
