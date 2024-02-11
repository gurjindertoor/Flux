"use client";
import { auth } from '@/firebase/clientApp';
import React, { useEffect, useState } from 'react';

const AccountSettings = () => {
    const [name, setName] = useState('Optimus Prime'); // Placeholder, replace with actual data
    const [email, setEmail] = useState('optimusprime@autobot.com'); // Placeholder, replace with actual data
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmationMessage, setConfirmationMessage] = useState('');
    const [language, setLanguage] = useState('English'); // Default language selection

    useEffect(() => {
        
        setEmail(auth.currentUser?.email || "");
        setName(auth.currentUser?.displayName || "");
    }, []);

    const handleSubmit = (e:any) => {
        e.preventDefault();
        // Implement logic to update user's profile information
        // Involves calling Firebase Auth or own backend API

        setConfirmationMessage('Your changes have been saved successfully!');
    };

    return (
        <div>
            <section className="bg-gray-50 dark:bg-gray-900">
                <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                    <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                                Account Settings
                            </h1>
                            <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
                                <div>
                                    <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your name</label>
                                    <input type="text" name="name" id="name" value={name} onChange={(e) => setName(e.target.value)} className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white" required />
                                </div>
                                <div>
                                    <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                                    <input type="email" name="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white" required />
                                </div>
                                <div>
                                    <label htmlFor="currentPassword" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Current password</label>
                                    <input type="password" name="currentPassword" id="currentPassword" value={currentPassword} onChange={(e) => setCurrentPassword(e.target.value)} className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white" placeholder="••••••••" />
                                </div>
                                <div>
                                    <label htmlFor="newPassword" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">New password</label>
                                    <input type="password" name="newPassword" id="newPassword" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white" placeholder="••••••••" />
                                </div>
                                {/* Language selection dropdown */}
                                <div>
                                    <label htmlFor="language" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Translate to:</label>
                                    <select
                                        id="language"
                                        name="language"
                                        value={language}
                                        onChange={(e) => setLanguage(e.target.value)}
                                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                                    >
                                        {/* <option value="English">English</option> */}
                                        <option value="Español">Spanish</option>
                                        {/* Add more languages here */}
                                    </select>
                                </div>
                                <button type="submit" className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Save changes</button>
                                {confirmationMessage && <div className="text-green-500 text-center mt-2">{confirmationMessage}</div>}
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default AccountSettings;

