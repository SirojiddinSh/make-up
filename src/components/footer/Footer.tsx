import React from "react";

const Footer: React.FC = () => {
    return (
        <footer className="bg-gray-800 text-white py-10 mt-[300px]">
            <div className="max-w-[1400px] mx-auto px-4 flex flex-col md:flex-row justify-between items-center">
                <div className="mb-6 md:mb-0 text-center md:text-left">
                    <h1 className="text-2xl font-semibold mb-2">MyCompany</h1>
                    <p className="text-sm">123 Main Street, Anytown, USA</p>
                    <p className="text-sm">info@mycompany.com</p>
                    <p className="text-sm">+1 (234) 567-8900</p>
                </div>
                <div className="mb-6 md:mb-0">
                    <h2 className="text-lg font-semibold mb-4">Quick Links</h2>
                    <ul className="flex flex-col space-y-2">
                        <li>
                            <a href="/" className="hover:text-gray-400">
                                Home
                            </a>
                        </li>
                        <li>
                            <a href="/about" className="hover:text-gray-400">
                                About Us
                            </a>
                        </li>
                        <li>
                            <a href="/services" className="hover:text-gray-400">
                                Services
                            </a>
                        </li>
                        <li>
                            <a href="/contact" className="hover:text-gray-400">
                                Contact
                            </a>
                        </li>
                    </ul>
                </div>
                <div>
                    <h2 className="text-lg font-semibold mb-4">Follow Us</h2>
                    <div className="flex space-x-4">
                        <a
                            href="https://facebook.com"
                            className="text-xl hover:text-gray-400"
                        >
                            <i className="fab fa-facebook-f"></i>
                        </a>
                        <a
                            href="https://twitter.com"
                            className="text-xl hover:text-gray-400"
                        >
                            <i className="fab fa-twitter"></i>
                        </a>
                        <a
                            href="https://instagram.com"
                            className="text-xl hover:text-gray-400"
                        >
                            <i className="fab fa-instagram"></i>
                        </a>
                        <a
                            href="https://linkedin.com"
                            className="text-xl hover:text-gray-400"
                        >
                            <i className="fab fa-linkedin-in"></i>
                        </a>
                    </div>
                </div>
            </div>
            <div className="bg-gray-900 text-gray-400 py-4 mt-10">
                <div className="max-w-[1400px] mx-auto px-4 text-center">
                    <p className="text-sm">
                        &copy; {new Date().getFullYear()} MyCompany. All Rights
                        Reserved.
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
