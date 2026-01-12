import React, { useState, useEffect, useContext, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { adminService } from '../services/admin.service';
import { AppContext } from '../context/AppContext';
import Button from '../components/ui/Button';

const AdminUsersPage = () => {
    const { addNotification } = useContext(AppContext);
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState('');
    const [page, setPage] = useState(1);
    const [pagination, setPagination] = useState({});
    const [editingUser, setEditingUser] = useState(null);
    const [editForm, setEditForm] = useState({ role: '', isActive: true });
    const [confirmReset, setConfirmReset] = useState(false);

    const loadUsers = React.useCallback(async () => {
        try {
            setLoading(true);
            const response = await adminService.getUsers(page, 20, search);
            const data = response.data || response;
            setUsers(data.users || []);
            setPagination(data.pagination || {});
        } catch (err) {
            console.error('Failed to load users', err);
        } finally {
            setLoading(false);
        }
    }, [page, search]);

    useEffect(() => {
        loadUsers();
    }, [loadUsers]);

    const handleSearch = (e) => {
        e.preventDefault();
        setPage(1);
        loadUsers();
    };

    const handleEditClick = (user) => {
        setEditingUser(user);
        setEditForm({ role: user.role, isActive: user.isActive });
    };

    const handleSaveEdit = async () => {
        try {
            // Update user role/status via admin API
            await adminService.updateUser(editingUser._id, editForm);
            setEditingUser(null);
            loadUsers(); // Reload users
        } catch (err) {
            console.error('Failed to update user', err);
        }
    };

    const handleResetLockout = async () => {
        try {
            await adminService.resetArenaLockout(editingUser._id);
            addNotification({
                type: 'success',
                message: 'Arena lockouts cleared successfully.'
            });
            setConfirmReset(false);
            loadUsers(); // Refresh list to clear burnout badges
        } catch (err) {
            console.error('Failed to reset lockout', err);
            addNotification({
                type: 'error',
                message: err.response?.data?.error?.message || 'Failed to reset lockout.'
            });
        }
    };

    return (
        <div className="min-h-screen bg-black py-32 px-6">
            <div className="container mx-auto max-w-6xl">
                <div className="flex justify-between items-center mb-12">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                    >
                        <h1 className="text-4xl font-black text-white mb-2">User Management</h1>
                        <Link to="/admin" className="text-white/40 hover:text-white transition-colors text-sm">
                            &larr; Back to Dashboard
                        </Link>
                    </motion.div>

                    <form onSubmit={handleSearch} className="flex gap-2">
                        <input
                            type="text"
                            placeholder="Search email..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="bg-white/5 border border-white/10 px-4 py-2 text-white placeholder-white/30 focus:outline-none focus:border-white/30"
                        />
                        <Button type="submit" size="sm">Search</Button>
                    </form>
                </div>

                <div className="border border-white/10">
                    <div className="grid grid-cols-12 bg-white/5 px-6 py-4 border-b border-white/10 text-xs font-bold uppercase tracking-widest text-white/40">
                        <div className="col-span-4">User</div>
                        <div className="col-span-2">Role</div>
                        <div className="col-span-2">Status</div>
                        <div className="col-span-2">Joined</div>
                        <div className="col-span-2 text-right">Actions</div>
                    </div>

                    {loading ? (
                        <div className="p-12 text-center text-white/40">Loading users...</div>
                    ) : (
                        users.map(user => (
                            <div key={user._id} className="grid grid-cols-12 px-6 py-4 border-b border-white/10 items-center hover:bg-white/[0.02] transition-colors">
                                <div className="col-span-4">
                                    <div className="flex items-center gap-2">
                                        <div className="text-white font-bold">{user.firstName} {user.lastName}</div>
                                        {user.progress?.some(p => p.arenaLockoutUntil && new Date(p.arenaLockoutUntil) > new Date()) && (
                                            <span className="px-1.5 py-0.5 bg-red-600 text-[8px] font-black text-white uppercase tracking-tighter animate-pulse">
                                                Burnout
                                            </span>
                                        )}
                                    </div>
                                    <div className="text-white/40 text-sm font-light">{user.email}</div>
                                </div>
                                <div className="col-span-2">
                                    <span className={`text-xs px-2 py-1 border ${user.role === 'admin' ? 'border-red-500/50 text-red-500' : 'border-white/10 text-white/60'}`}>
                                        {user.role}
                                    </span>
                                </div>
                                <div className="col-span-2">
                                    <span className={`text-xs px-2 py-1 ${user.isActive ? 'text-green-400' : 'text-red-400'}`}>
                                        {user.isActive ? 'Active' : 'Banned'}
                                    </span>
                                </div>
                                <div className="col-span-2 text-white/40 text-sm font-mono">
                                    {new Date(user.createdAt).toLocaleDateString()}
                                </div>
                                <div className="col-span-2 text-right">
                                    <Button variant="ghost" size="sm" onClick={() => handleEditClick(user)}>Edit</Button>
                                </div>
                            </div>
                        ))
                    )}
                </div>

                {/* Pagination */}
                <div className="flex justify-between items-center mt-6">
                    <span className="text-white/40 text-sm">
                        Page {pagination.page} of {pagination.pages}
                    </span>
                    <div className="flex gap-2">
                        <button
                            disabled={page === 1}
                            onClick={() => setPage(p => p - 1)}
                            className="px-4 py-2 border border-white/10 text-white disabled:opacity-30 disabled:cursor-not-allowed hover:bg-white/5"
                        >
                            Previous
                        </button>
                        <button
                            disabled={page === pagination.pages}
                            onClick={() => setPage(p => p + 1)}
                            className="px-4 py-2 border border-white/10 text-white disabled:opacity-30 disabled:cursor-not-allowed hover:bg-white/5"
                        >
                            Next
                        </button>
                    </div>
                </div>

                {/* Edit User Modal */}
                {editingUser && (
                    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50">
                        <div className="bg-black border border-white/10 p-8 max-w-md w-full mx-4">
                            <h2 className="text-2xl font-black text-white mb-6">Edit User</h2>
                            <div className="space-y-4 mb-6">
                                <div>
                                    <label className="block text-white/60 text-sm mb-2">Email</label>
                                    <input
                                        type="text"
                                        value={editingUser.email}
                                        disabled
                                        className="w-full px-4 py-2 bg-white/5 border border-white/10 text-white/50 cursor-not-allowed"
                                    />
                                </div>
                                <div>
                                    <label className="block text-white/40 text-xs font-bold uppercase tracking-widest mb-3">Role</label>
                                    <select
                                        value={editForm.role}
                                        onChange={(e) => setEditForm({ ...editForm, role: e.target.value })}
                                        className="w-full px-4 py-3 bg-black border border-white/10 text-white font-mono text-xs uppercase tracking-wide focus:outline-none focus:border-white/30 focus:bg-white/[0.02] transition-all appearance-none cursor-pointer hover:border-white/20"
                                        style={{
                                            backgroundImage: `url("data:image/svg+xml,%3Csvg width='12' height='8' viewBox='0 0 12 8' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1 1L6 6L11 1' stroke='white' stroke-opacity='0.4' stroke-width='2' stroke-linecap='square'/%3E%3C/svg%3E")`,
                                            backgroundRepeat: 'no-repeat',
                                            backgroundPosition: 'right 1rem center'
                                        }}
                                    >
                                        <option value="user" className="bg-black text-white font-mono uppercase">User</option>
                                        <option value="admin" className="bg-black text-white font-mono uppercase">Admin</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-white/40 text-xs font-bold uppercase tracking-widest mb-3">Status</label>
                                    <select
                                        value={editForm.isActive}
                                        onChange={(e) => setEditForm({ ...editForm, isActive: e.target.value === 'true' })}
                                        className="w-full px-4 py-3 bg-black border border-white/10 text-white font-mono text-xs uppercase tracking-wide focus:outline-none focus:border-white/30 focus:bg-white/[0.02] transition-all appearance-none cursor-pointer hover:border-white/20"
                                        style={{
                                            backgroundImage: `url("data:image/svg+xml,%3Csvg width='12' height='8' viewBox='0 0 12 8' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1 1L6 6L11 1' stroke='white' stroke-opacity='0.4' stroke-width='2' stroke-linecap='square'/%3E%3C/svg%3E")`,
                                            backgroundRepeat: 'no-repeat',
                                            backgroundPosition: 'right 1rem center'
                                        }}
                                    >
                                        <option value="true" className="bg-black text-white font-mono uppercase">Active</option>
                                        <option value="false" className="bg-black text-white font-mono uppercase">Banned</option>
                                    </select>
                                </div>
                                <div className="pt-4 border-t border-white/5">
                                    <label className="block text-white/40 text-[10px] font-black uppercase tracking-[0.2em] mb-4">Arena Intervention</label>

                                    {/* Active Lockouts Display */}
                                    {editingUser.progress?.filter(p => p.arenaLockoutUntil && new Date(p.arenaLockoutUntil) > new Date()).length > 0 ? (
                                        <div className="mb-4 space-y-2">
                                            <div className="text-[10px] text-red-500 font-bold uppercase mb-1">Active Lockouts:</div>
                                            <div className="flex flex-wrap gap-2">
                                                {editingUser.progress
                                                    .filter(p => p.arenaLockoutUntil && new Date(p.arenaLockoutUntil) > new Date())
                                                    .map(p => (
                                                        <span key={p.language} className="px-2 py-1 bg-red-600/20 border border-red-600/30 text-[10px] text-red-400 font-bold uppercase tracking-tighter">
                                                            {p.language}: {Math.ceil((new Date(p.arenaLockoutUntil) - new Date()) / 60000)}m
                                                        </span>
                                                    ))
                                                }
                                            </div>
                                        </div>
                                    ) : (
                                        <div className="mb-4 text-[10px] text-white/30 uppercase italic tracking-widest">
                                            No active system burnouts detected.
                                        </div>
                                    )}

                                    <button
                                        onClick={() => setConfirmReset(true)}
                                        className="w-full py-3 bg-red-600/10 border border-red-600/30 text-red-500 font-black text-xs uppercase tracking-widest hover:bg-red-600 hover:text-white transition-all cursor-pointer"
                                    >
                                        Manual Lockout Reset
                                    </button>
                                    <p className="mt-2 text-[10px] text-white/20 italic">Clears burnout across all languages.</p>
                                </div>
                            </div>
                            <div className="flex gap-4">
                                <Button onClick={handleSaveEdit} className="flex-1">Save Changes</Button>
                                <Button variant="ghost" onClick={() => setEditingUser(null)} className="flex-1">Cancel</Button>
                            </div>
                        </div>
                    </div>
                )}

                {/* Custom Reset Confirmation Modal */}
                <AnimatePresence>
                    {confirmReset && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="fixed inset-0 bg-black/90 backdrop-blur-md flex items-center justify-center z-[60]"
                        >
                            <motion.div
                                initial={{ scale: 0.9, y: 20 }}
                                animate={{ scale: 1, y: 0 }}
                                exit={{ scale: 0.9, y: 20 }}
                                className="bg-black border border-red-500/30 p-8 max-w-sm w-full mx-4 text-center relative overflow-hidden"
                            >
                                {/* Industrial background detail */}
                                <div className="absolute top-0 left-0 w-full h-1 bg-red-600/50 animate-pulse" />

                                <div className="text-red-500 mb-4 flex justify-center">
                                    <svg className="w-12 h-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                                    </svg>
                                </div>
                                <h3 className="text-xl font-black text-white uppercase tracking-widest mb-2">Initialize Override?</h3>
                                <p className="text-white/40 text-xs mb-8 uppercase tracking-wide leading-relaxed">
                                    WARNING: This will immediately clear all Arena burnouts (lockouts) for user: <span className="text-white/80">{editingUser.email}</span>.
                                </p>
                                <div className="flex gap-4">
                                    <button
                                        onClick={handleResetLockout}
                                        className="flex-1 py-3 bg-red-600 text-white font-black text-[10px] uppercase tracking-widest hover:bg-red-500 transition-all"
                                    >
                                        Confirm
                                    </button>
                                    <button
                                        onClick={() => setConfirmReset(false)}
                                        className="flex-1 py-3 border border-white/10 text-white/40 font-black text-[10px] uppercase tracking-widest hover:border-white/30 hover:text-white transition-all"
                                    >
                                        Abort
                                    </button>
                                </div>
                            </motion.div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
};

export default AdminUsersPage;
