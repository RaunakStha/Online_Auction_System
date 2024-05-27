import React from "react";

const Contact = () => {
    return(
        <>
        {/* Container for demo purpose */}
        <div className="container mx-auto md:px-6 bg-gray-50 dark:bg-gray-900">
            {/* Section: Design Block */}
            <div className="m-20 bg-[#ffffff] rounded-lg shadow-xl dark:border dark:bg-gray-800 dark:border-gray-900 pt-10">
                <div className="flex flex-wrap">
                    <div className="mb-12 w-full shrink-0 grow-0 basis-auto md:mb-0 md:w-7/12 md:px-3 lg:px-6 pb-10">
                    <h2 className="mb-8 text-3xl font-bold">
                        Frequently asked questions
                    </h2>
                    <p className="mb-2 font-bold"> How do I register with online auction ?</p>
                    <p className="mb-8 text-neutral-500 dark:text-neutral-300">
                    It's simple. Just go to the registration page, fill out the form with your details,
                    </p>
                    <p className="mb-2 font-bold">
                    I've forgotten my password ?
                    </p>
                    <p className="mb-8 text-neutral-500 dark:text-neutral-300">
                    If your username and password don't seem to be working, firstly check you are entering it correctly, you'll be amazed how many people mistake a small "L" for a capital "i" or have an incorrect computer clock. 
                    </p>
                    <p className="mb-2 font-bold">
                    I want to choose my own password ?
                    </p>
                    <p className="mb-8 text-neutral-500 dark:text-neutral-300">
                    When you first register you choose your own password. It can be changed on the "user " -> "Profile" page.
                    </p>
                    </div>
                    <div className="w-full shrink-0 grow-0 basis-auto md:w-5/12 md:px-3 lg:px-6">
                    <p className="mb-8 font-bold">
                        Didn't find your answer in the FAQ? Contact our sales
                    </p>
                    <form>
                        <div className="relative mb-6" data-te-input-wrapper-init="">
                        <input
                            type="text"
                            className="peer block min-h-[auto] w-full rounded border-2 bg-transparent py-[0.32rem] px-3 leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 peer-focus:text-primary data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-neutral-200 dark:placeholder:text-neutral-200 dark:peer-focus:text-primary [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0"
                            id="exampleInput90"
                            placeholder="Name"
                        />
                        <label
                            className="pointer-events-none absolute top-0 left-3 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[1.6] text-neutral-500 transition-all duration-200 ease-out peer-focus:-translate-y-[0.9rem] peer-focus:scale-[0.8] peer-focus:text-primary peer-data-[te-input-state-active]:-translate-y-[0.9rem] peer-data-[te-input-state-active]:scale-[0.8] motion-reduce:transition-none dark:text-neutral-200 dark:peer-focus:text-primary"
                            htmlFor="exampleInput90"
                        >
                            Name
                        </label>
                        </div>
                        <div className="relative mb-6" data-te-input-wrapper-init="">
                        <input
                            type="email"
                            className="peer block min-h-[auto] w-full rounded border-2 bg-transparent py-[0.32rem] px-3 leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 peer-focus:text-primary data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-neutral-200 dark:placeholder:text-neutral-200 dark:peer-focus:text-primary [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0"
                            id="exampleInput91"
                            placeholder="Email address"
                        />
                        <label
                            className="pointer-events-none absolute top-0 left-3 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[1.6] text-neutral-500 transition-all duration-200 ease-out peer-focus:-translate-y-[0.9rem] peer-focus:scale-[0.8] peer-focus:text-primary peer-data-[te-input-state-active]:-translate-y-[0.9rem] peer-data-[te-input-state-active]:scale-[0.8] motion-reduce:transition-none dark:text-neutral-200 dark:peer-focus:text-primary"
                            htmlFor="exampleInput91"
                        >
                            Email address
                        </label>
                        </div>
                        <div className="relative mb-6" data-te-input-wrapper-init="">
                        <textarea
                            className="peer block min-h-[auto] w-full rounded border-2 bg-transparent py-[0.32rem] px-3 leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-neutral-200 dark:placeholder:text-neutral-200 [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0"
                            id="exampleFormControlTextarea1"
                            rows={3}
                            placeholder="Your message"
                            defaultValue={""}
                        />
                        <label
                            htmlFor="exampleFormControlTextarea1"
                            className="pointer-events-none absolute top-0 left-3 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[1.6] text-neutral-500 transition-all duration-200 ease-out peer-focus:-translate-y-[0.9rem] peer-focus:scale-[0.8] peer-focus:text-primary peer-data-[te-input-state-active]:-translate-y-[0.9rem] peer-data-[te-input-state-active]:scale-[0.8] motion-reduce:transition-none dark:text-neutral-200 dark:peer-focus:text-primary"
                        >
                            Message
                        </label>
                        </div>
                        
                        <button
                        type="button"
                        data-te-ripple-init=""
                        data-te-ripple-color="light"
                        className="mb-6 inline-block w-full rounded bg-indigo-600 px-6 pt-2.5 pb-2 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-indigo-600 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
                        >
                        Send
                        </button>
                    </form>
                    </div>
                </div>
            </div>
            {/* Section: Design Block */}
        </div>
        {/* Container for demo purpose */}
        </>

    );
};
export default Contact;