import React from 'react'
import { Outlet } from 'react-router-dom'

const DefaultLayout = () => {
    return (
        <div className="app">
            <header className="app-header min-h-[60px]">
                <div className="flex flex-row items-center justify-between border min-h-[60px] px-3">
                    <h2 className="font-bold text-xl">บริการรถยนต์</h2>
                    <div className="border rounded-full w-[40px] h-[40px] flex items-center justify-center">ST</div>
                </div>
            </header>
            <main className="p-3 min-h-[90vh] bg-white">
                <Outlet />
            </main>
            <footer className="border p-2 bg-[#0A1931]">
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