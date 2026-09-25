import React from 'react'
import { useSelector } from 'react-redux'
import { motion } from "motion/react"
import { Code2, Eye, FolderKanban } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

function TopBar({ showPreview, setShowPreview }) {
    const { currentProject } = useSelector(state => state.project)
    const navigate = useNavigate()
   
    return (
        <div className='relative flex h-12 shrink-0 items-center justify-between border-b border-white/[0.06] bg-[#0d0d11]/95 px-4 backdrop-blur-xl select-none z-20'>
            <div className='flex items-center gap-3.5'>
                <div 
                    onClick={() => navigate('/')}
                    title="Back to Dashboard"
                    className='flex items-center gap-2 cursor-pointer group'
                >
                    <div className='flex h-6 w-6 items-center justify-center rounded-lg bg-gradient-to-br from-indigo-500 via-sky-500 to-indigo-600 shadow-[0_1px_8px_-1px_rgba(99,102,241,0.5)] transition-transform duration-150 group-hover:scale-105'>
                        <Code2 size={13} className='text-white' strokeWidth={2.5} />
                    </div>
                    <span className='text-[14.5px] font-bold tracking-tight text-white transition-opacity duration-150 group-hover:opacity-90'>
                        Codexia
                    </span>
                </div>

                <div className='h-4 w-px bg-white/[0.08]' />

                <div className='flex items-center gap-2 px-2.5 py-1 rounded-md bg-white/[0.03] border border-white/[0.06]'>
                    <FolderKanban size={13} className='text-sky-400' />
                    <span className='max-w-[200px] truncate text-[12.5px] font-medium text-zinc-300'>
                        {currentProject?.name || "Untitled Project"}
                    </span>
                </div>
            </div>

            <div className='flex items-center gap-2'>
                <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.96 }}
                    onClick={() => setShowPreview?.((v) => !v)}
                    title={showPreview ? "Switch to Editor" : "Live Preview"}
                    className={`relative flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium border transition-all duration-150 ${
                        showPreview 
                            ? "bg-sky-500/15 border-sky-500/30 text-sky-300 shadow-[0_0_12px_rgba(56,189,248,0.15)]" 
                            : "bg-white/[0.04] border-white/[0.08] text-zinc-400 hover:text-zinc-200 hover:bg-white/[0.07]"
                    }`}
                >
                    {showPreview ? (
                        <>
                            <Eye size={14} className='text-sky-400' />
                            <span>Preview</span>
                        </>
                    ) : (
                        <>
                            <Code2 size={14} />
                            <span>Code</span>
                        </>
                    )}
                </motion.button>
            </div>
        </div>
    )
}

export default TopBar
