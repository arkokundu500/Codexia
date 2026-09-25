import { ChevronDown, Code2, LogOut } from 'lucide-react';
import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react';
import { FiMoon } from "react-icons/fi";
import { IoSunnyOutline } from "react-icons/io5";
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../features/logout';
import { setUserData } from '../redux/userSlice';
function NavBar() {
     const [isDark,setIsDark]=useState(true)
     const [menuOpen,setMenuOpen]=useState(false)
     const dispatch=useDispatch()
     const {userData}=useSelector(state=>state.user)
     const name=userData?.name || "Guest"
     const initials=name
     .split(" ")
     .map((w)=>w[0])
     .join("")
     .slice(0,2)
     .toUpperCase()
    
const handleLogout=async ()=>{
    await logout()
    dispatch(setUserData(null))
}

    useEffect(()=>{
     if(typeof window==undefined)return;
     const theme=window.localStorage.getItem("theme")
     const dark=theme?theme=="dark":true
     document.documentElement.classList.toggle("dark",dark)
     setIsDark(dark)
    },[])

    const toggleTheme=()=>{
        const next=!isDark
        setIsDark(next)
        document.documentElement.classList.toggle("dark",next)
        window.localStorage.setItem("theme",next?"dark":"light")
    }

    return (
        <div className='w-full h-16 bg-white/80 dark:bg-[#09090d]/80 backdrop-blur-xl border-b border-slate-200/80 dark:border-white/[0.06] flex items-center px-6 gap-6 font-sans transition-colors duration-300 sticky top-0 z-30'>
            <div className='flex items-center gap-2.5 shrink-0 select-none'>
                <div className='flex h-8 w-8 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 via-sky-500 to-indigo-600 shadow-[0_2px_10px_-2px_rgba(99,102,241,0.5)] dark:shadow-[0_2px_14px_-2px_rgba(99,102,241,0.3)]'>
                    <Code2 size={16} className='text-white' strokeWidth={2.5} />
                </div>
                <div className='flex items-baseline gap-1.5'>
                    <span className='text-slate-900 dark:text-white font-bold text-[17px] tracking-tight'>
                        Codexia
                    </span>
                    <span className='text-[10px] font-semibold uppercase tracking-wider px-1.5 py-0.5 rounded-full bg-indigo-500/10 text-indigo-600 dark:bg-indigo-400/10 dark:text-indigo-400 border border-indigo-500/20'>
                        AI
                    </span>
                </div>
            </div>
            <div className='flex-1'/>
            <div className='flex items-center gap-2.5 shrink-0'>
                <button 
                    onClick={toggleTheme} 
                    aria-label="Toggle theme"
                    className='w-9 h-9 flex items-center justify-center rounded-xl text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/[0.06] border border-transparent hover:border-slate-200/60 dark:hover:border-white/[0.06] transition-all duration-150'
                >
                    {isDark ? <FiMoon size={17}/> : <IoSunnyOutline size={18}/>}
                </button>

                <div className='relative ml-0.5'>
                     <button
                     onClick={()=>setMenuOpen(p=>!p)}
                     className='flex items-center gap-2.5 pl-1.5 pr-2.5 h-10 rounded-xl border border-transparent hover:border-slate-200/70 dark:hover:border-white/[0.07] hover:bg-slate-100/80 dark:hover:bg-white/[0.05] transition-all duration-150'
                     >
                        <div className='w-7 h-7 rounded-full bg-gradient-to-br from-slate-700 to-slate-900 dark:from-slate-200 dark:to-white flex items-center justify-center overflow-hidden ring-1 ring-black/5 dark:ring-white/20 shadow-sm'>
                            <span className='text-[11px] font-semibold text-white dark:text-slate-900'>
                                {initials}
                            </span>
                        </div>
                        <span className='text-[13px] font-medium text-slate-700 dark:text-slate-200 hidden sm:inline'>{name}</span>
                        <ChevronDown size={13}
                                      className={`text-slate-400 dark:text-slate-500 transition-transform duration-150 ${
                                        menuOpen ? "rotate-180" : ""
                                      }`}
                        />
                     </button>

                     {menuOpen && (
                        <div className='absolute right-0 mt-2 w-56 bg-white/95 dark:bg-[#0f0f16]/95 backdrop-blur-2xl border border-slate-200/80 dark:border-white/[0.08] rounded-2xl shadow-2xl py-1.5 z-50 animate-[fadeIn_0.15s_ease-out]'>
                          <div className='px-4 py-3 border-b border-slate-100 dark:border-white/[0.06] flex items-center gap-3'>
                              <div className='w-8 h-8 rounded-full bg-gradient-to-br from-slate-700 to-slate-900 dark:from-slate-200 dark:to-white flex items-center justify-center shrink-0 ring-1 ring-black/5 dark:ring-white/20 shadow-sm'>
                                <span className='text-[12px] font-semibold text-white dark:text-slate-900'>
                                    {initials}
                                </span>
                              </div>

                              <div className='min-w-0 flex-1'>
                                 <p className='text-[13px] font-semibold text-slate-900 dark:text-slate-100 truncate'>{name}</p>
                                 <p className='text-[11px] text-slate-400 dark:text-slate-500 truncate'>{userData?.email}</p>
                              </div>  
                          </div>
                          <div className='p-1'>
                             <button 
                             onClick={handleLogout}
                             className='w-full flex items-center gap-2.5 px-3 py-2 text-[13px] font-medium text-red-500 dark:text-red-400 rounded-lg hover:bg-red-50 dark:hover:bg-red-500/10 transition-colors duration-150'>
                                <LogOut size={14}/>
                                Logout
                             </button>
                          </div>
                        </div>
                     )}
                </div>
            </div>
        </div>
    )
}

export default NavBar
