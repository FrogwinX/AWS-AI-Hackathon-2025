import React from 'react';
import { FaGlobe, FaEnvelope } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-blue-900 text-blue-100 py-6 px-8 text-sm">
      <div className="mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
        <div>© 2025 Finbot </div>
        <div className="flex gap-5">
            <a
            href="https://www.aosummit.com/"
            className="flex items-center gap-2 hover:underline"
            target="_blank"
            rel="noopener noreferrer"
            >
            <FaGlobe />
            <span>AO Summit</span>
            </a>
            <a
            href="mailto:admin@aosummit.com"
            className="flex items-center gap-2 hover:underline"
            >
            <FaEnvelope />
            <span>admin@aosummit.com</span>
            </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
