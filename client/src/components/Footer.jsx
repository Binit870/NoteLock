import React from 'react';
import { FaGithub, FaLinkedin, FaTwitter } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 py-10 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
        {/* Left Section */}
        <div>
          <h2 className="text-3xl font-bold text-white">NoteLock</h2>
          <p className="text-sm mt-2">Secure your notes & passwords with confidence.</p>
        </div>

        {/* Right Section */}
        <div className="md:text-right">
          <h3 className="text-xl font-semibold text-white">Contact</h3>
          <p className="text-sm mt-2">
            Email: <a href="mailto:contact@notelock.app" className="text-blue-400 hover:underline">contact@notelock.app</a>
          </p>

          {/* Social Icons */}
          <div className="flex md:justify-end justify-start gap-6 mt-4">
            <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
              <FaGithub size={24} />
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
              <FaLinkedin size={24} />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
              <FaTwitter size={24} />
            </a>
          </div>
        </div>
      </div>

      <div className="text-center text-sm text-gray-500 mt-8">
        &copy; {new Date().getFullYear()} NoteLock. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
