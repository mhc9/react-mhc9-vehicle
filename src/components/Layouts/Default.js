import React from 'react'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import { FaUserCircle, FaChevronLeft } from 'react-icons/fa'

const DefaultLayout = () => {
    const navigate = useNavigate();
    const location = useLocation();

    return (
        <div className="app">
            <header className="app-header min-h-[60px]">
                <div className="flex flex-row items-center justify-between border min-h-[60px] px-3">
                    <div className="hidden max-[490px]:block cursor-pointer text-success">
                        {location.pathname !== '/' && <FaChevronLeft size={'20px'} onClick={() => navigate(-1)} />}
                    </div>
                    <h2 className="font-extrabold text-xl text-success">บริการรถยนต์</h2>
                    <div className="w-[40px] h-[40px] flex items-center justify-center text-success">
                        <FaUserCircle size={'30px'} />
                    </div>
                </div>
            </header>
            <main className="p-3 min-h-[90vh] bg-white">
                <Outlet />
            </main>
            <footer className="border p-2 bg-[#1a252f]">
                <div className="flex flex-row">
                    <div className="flex flex-col">
                        <span className="text-sm text-white">
                            ©2024 <a href="www.mhc9dmh.com" target="_blank" className="text-blue-400">ศูนย์สุขภาพจิตที่ 9</a> All Rights Reserved
                        </span>
                    </div>
                </div>
            </footer>
        </div>
    )
}

export default DefaultLayout