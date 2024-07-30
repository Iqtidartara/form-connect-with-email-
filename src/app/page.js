"use client"
import { useState } from 'react';

export default function Page() {
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');

  const sendMail = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('/api/sendEmail', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          subject,
          message
        })
      });

      const data = await response.json();
      console.log(data);

      if (response.ok) {
        alert('Email sent successfully!');
      } else {
        alert('Failed to send email.');
      }
    } catch (error) {
      console.error(error);
      alert('An error occurred while sending the email.');
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <form onSubmit={sendMail} className="h-full w-1/3 space-y-6">
        <div className="flex flex-col items-start w-full justify-start">
          <h1 className="text-xl font-semibold">Tutorial Email</h1>
        </div>
        <div className="relative flex flex-col space-y-1">
          <label htmlFor="subject" className="text-sm font-light text-gray-500">
            Subject
          </label>
          <input
            name="subject"
            type="text"
            id="subject"
            required
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            placeholder="Enter the subject"
            className="rounded-xl border-2 border-gray-400 p-2"
          />
        </div>
        <div className="relative flex flex-col space-y-1">
          <label htmlFor="message" className="text-sm font-light text-gray-500">
            Message
          </label>
          <textarea
            name="message"
            id="message"
            required
            cols={10}
            rows={5}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Enter your message"
            className="rounded-xl border-2 border-gray-400 p-2"
          />
        </div>
        <button type='submit' className="ml-auto flex w-1/2 items-center justify-center space-x-3 rounded-lg bg-blue-600 p-2 text-white shadow-blue-500 hover:bg-blue-700 hover:shadow-md">
          <span>Send Message</span>
        </button>
      </form>
    </main>
  );
}
