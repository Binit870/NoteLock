import React from 'react';
import { FaGithub, FaLinkedin, FaTwitter } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-[#1f2937] text-white py-8 px-6">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-center">
        {/* Left Section */}
        <div className="text-left">
          <h2 className="text-2xl font-bold text-white">NoteLock</h2>
          <p className="text-sm text-gray-100 mt-1">Secure your notes & passwords.</p>
        </div>

        {/* Right Section */}
        <div className="mt-6 md:mt-0 text-left md:text-right">
          <h3 className="text-xl font-semibold text-white">Contact Me</h3>
          <p className="text-sm text-white mt-1">
            Email: <a href="mailto:binitpatra870@gmail.com" className="underline">contact@notelock.app</a>
          </p>
          <div className="flex justify-start md:justify-end gap-6 mt-5">
            <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="hover:text-gray-300">
              <FaGithub size={30} />
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:text-gray-300">
              <FaLinkedin size={30} />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-gray-300">
              <FaTwitter size={30} />
            </a>
          </div>
        </div>
      </div>

      <p className="text-center text-sm text-gray-400 mt-6">
        &copy; {new Date().getFullYear()} NoteLock. All rights reserved.
      </p>
    </footer>
  );
};

export default Footer;
