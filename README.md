# Portfolio

This is my personal portfolio website built with **PayloadCMS**, **Next.js**, and **MongoDB**. It showcases my professional experiences, projects, and skills as a full-stack developer and frontend engineer.

## Features

- **Content Management**: Powered by PayloadCMS for managing and updating portfolio content.
- **Modern Frontend**: Built with Next.js for a performant and SEO-friendly user experience.
- **Database Integration**: MongoDB is used for data storage.
- **Responsive Design**: Optimized for both desktop and mobile devices.

## Tech Stack

- **Frontend**: Next.js
- **Backend**: PayloadCMS
- **Database**: MongoDB

## Getting Started

### Prerequisites

Ensure you have the following installed:

- Node.js (v14 or later)
- npm or yarn
- MongoDB

### Installation

1. Clone the repository:

   ```bash
   git clone <repository_url>
   cd <repository_folder>
   ```

2. Install dependencies:

   ```bash
   npm install
   # or
   yarn install
   ```

3. Set up environment variables:

   Create a `.env` file in the root directory and add the following:

   ```env
   DB_URI=<your_mongodb_connection_string>
   PAYLOAD_SECRET=<your_payload_secret>
   NEXT_PUBLIC_SITE_URL=<your_site_url>
   INITIAL_EMAIL=<initial_user_email>
   INITIAL_PWD=<initial_user_pwd>
   BLOB_READ_WRITE_TOKEN=<your_blob_token>
   ```

4. Start the development server:

   ```bash
   npm run dev
   # or
   yarn dev
   ```

   The application will be available at `http://localhost:3000`.

### Deployment

1. Build the application:

   ```bash
   npm run build
   # or
   yarn build
   ```

2. Start the production server:

   ```bash
   npm run start
   # or
   yarn start
   ```

### Hosting

Deploy the application to a platform that supports Node.js, such as Vercel, Netlify, or AWS. Ensure MongoDB is accessible from the hosting environment.

## Contributing

Feel free to fork the repository and submit pull requests for improvements or bug fixes.

## License

This project is licensed under the MIT License.

## Contact

For any inquiries, feel free to reach out via:

- Portfolio: [snasser.dev](https://snasser.dev)

---

Thank you for visiting my portfolio!
