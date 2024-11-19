import React from 'react';
import './globals.css'; 

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="en">
      <head>
        <title>Event Organizer</title>
        <meta name="description" content="Event Organizer - Manage and organize your events easily." />
        <meta name="keywords" content="event, organizer, management, events" />
        <meta name="author" content="Your Name" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="canonical" href="https://www.lumiereorganizer.com/" />
        <meta property="og:title" content="Event Organizer" />
        <meta property="og:description" content="Event Organizer - Manage and organize your events easily." />
        <meta property="og:url" content="https://www.lumiereorganizer.com/" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://www.lumiereorganizer.com/image.jpg" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Event Organizer" />
        <meta name="twitter:description" content="Event Organizer - Manage and organize your events easily." />
        <meta name="twitter:image" content="https://www.lumiereorganizer.com/image.jpg" />
      </head>
      <body className="bg-gray-50 font-sans">
        {children} 
      </body>
    </html>
  );
};

export default Layout;