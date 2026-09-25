import React, { useState } from 'react'
import { motion } from "motion/react"
import { Folder, Star, Trash2 } from 'lucide-react'
import { deleteProject, toggleStar } from '../features/project'
import { useDispatch } from 'react-redux'
import { setDeleteProject, starProject } from '../redux/projectSlice'
import { useNavigate } from 'react-router-dom'

function ProjectCard({ project }) {
    const [loadingStar, setLoadingStar] = useState(false)
    const [loadingDelete, setLoadingDelete] = useState(false)
    const [confirmDelete, setConfirmDelete] = useState(false)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const handleToggleStar = async () => {
        setLoadingStar(true)
        await toggleStar(project?._id)
        dispatch(starProject(project?._id))
        setLoadingStar(false)
    }

    const handleDelete = async () => {
        setLoadingDelete(true)
        await deleteProject(project?._id)
        dispatch(setDeleteProject(project?._id))
        setLoadingDelete(false)
    }

    return (
        <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.97 }}
            whileHover={{ y: -3 }}
            transition={{ duration: 0.18, ease: "easeOut" }}
            onClick={() => {
                navigate(`/project/${project?._id}`)
            }}
            className="group relative cursor-pointer rounded-2xl border border-black/[0.06] bg-white p-5 shadow-[0_1px_3px_rgba(0,0,0,0.04)] transition-all duration-200 hover:shadow-[0_10px_25px_-5px_rgba(0,0,0,0.06)] hover:border-black/[0.1] dark:border-white/[0.07] dark:bg-white/[0.025] dark:shadow-none dark:hover:border-white/[0.14] dark:hover:bg-white/[0.04]"
        >
            <div className='flex items-center justify-between mb-3'>
                <div className='flex h-8 w-8 items-center justify-center rounded-xl bg-slate-100 text-slate-700 dark:bg-white/[0.05] dark:text-zinc-300 border border-slate-200/60 dark:border-white/[0.06] transition-colors group-hover:border-indigo-500/30 group-hover:bg-indigo-500/10 group-hover:text-indigo-500'>
                    <Folder size={15} />
                </div>
                
                <motion.div
                    whileTap={{ scale: 0.9 }}
                    disabled={loadingStar}
                    onClick={(e) => {
                        e.stopPropagation();
                        handleToggleStar();
                    }}
                    className={`rounded-lg p-1.5 transition-all hover:text-amber-400 ${project.starred ? "opacity-100 text-amber-400" : "opacity-0 text-zinc-300 group-hover:opacity-100 dark:text-zinc-600"} ${loadingStar ? "cursor-wait opacity-60" : ""}`}
                >
                    <Star
                        size={15}
                        className={project.starred ? "fill-amber-400 text-amber-400" : ""}
                    />
                </motion.div>
            </div>

            <h3 className='mb-1.5 truncate text-[14.5px] font-semibold tracking-tight text-zinc-900 dark:text-white transition-colors group-hover:text-indigo-600 dark:group-hover:text-indigo-400'>
                {project.name}
            </h3>
            <p className='line-clamp-2 min-h-[2.5em] text-[12.5px] leading-snug text-zinc-500 dark:text-zinc-400'>
                {project.description || "No description provided."}
            </p>

            <div className='mt-4 flex items-center justify-end border-t border-black/[0.05] pt-3 dark:border-white/[0.06]' onClick={(e) => e.stopPropagation()}>
                {confirmDelete ? (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="flex items-center gap-2"
                    >
                        <button
                            onClick={(e) => {
                                setConfirmDelete(false)
                            }}
                            className="rounded-md px-2 py-1 text-[11px] text-zinc-400 hover:text-zinc-700 dark:text-zinc-500 dark:hover:text-zinc-300 transition-colors"
                        >
                            Cancel
                        </button>
                        <button
                            disabled={loadingDelete}
                            onClick={handleDelete}
                            className="rounded-lg bg-red-500/10 px-2.5 py-1 text-[11px] font-medium text-red-500 hover:bg-red-500/20 dark:text-red-400 disabled:cursor-wait disabled:opacity-50 transition-colors"
                        >
                            Delete
                        </button>
                    </motion.div>
                ) : (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        whileTap={{ scale: 0.92 }}
                        onClick={() => {
                            setConfirmDelete(true);
                        }}
                        className="flex items-center gap-1 rounded-lg p-1.5 text-zinc-300 opacity-0 transition-all hover:text-red-500 hover:bg-red-500/10 group-hover:opacity-100 dark:text-zinc-600 dark:hover:text-red-400"
                        title="Delete project"
                    >
                        <Trash2 size={13}/>
                    </motion.div>
                )}
            </div>
        </motion.div>
    )
}

export default ProjectCard
