import React from 'react'
import Logo from "../assets/mfulogo.png";
import { Link } from "react-router-dom";

const Footer = () => {
    return (
        <>
            <footer class="bg-gray-100 rounded-lg shadow">
                <div class="w-full max-w-screen-xl mx-auto p-4 md:py-8">
                    <div class="sm:flex sm:items-center sm:justify-between">
                        <a href="https://flowbite.com/" class="flex items-center mb-4 sm:mb-0 space-x-3 rtl:space-x-reverse">
                            <img src={Logo} class="w-10" alt="MFU Logo" />
                            <span class="self-center text-2xl whitespace-nowrap text-gray-500">Sports Complex</span>
                        </a>
                        <ul class="flex flex-wrap items-center mb-6 text-sm font-medium text-gray-500 sm:mb-0 dark:text-gray-400">
                            <li>
                                <Link to="/about" class="hover:underline me-4 md:me-6">About</Link>
                            </li>
                            <li>
                                <a href="#" class="hover:underline me-4 md:me-6">Privacy Policy</a>
                            </li>
                            <li>
                                <a href="#" class="hover:underline me-4 md:me-6">Licensing</a>
                            </li>
                            <li>
                                <a href="#" class="hover:underline">Contact</a>
                            </li>
                        </ul>
                    </div>
                    <hr class="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
                    <span class="block text-sm text-gray-500 sm:text-center dark:text-gray-400">© 2024 <a href="#" class="hover:underline">MFU™</a>. All Rights Reserved.</span>
                </div>
            </footer>
        </>
    )
}

export default Footer;