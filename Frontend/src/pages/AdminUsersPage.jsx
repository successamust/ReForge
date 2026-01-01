import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { adminService } from '../services/admin.service';
import Button from '../components/ui/Button';

const AdminUsersPage = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState('');
    const [page, setPage] = useState(1);
    const [pagination, setPagination] = useState({});
    const [editingUser, setEditingUser] = useState(null);
    const [editForm, setEditForm] = useState({ role: '', isActive: true });

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
                                    <div className="text-white font-bold">{user.firstName} {user.lastName}</div>
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
                            </div>
                            <div className="flex gap-4">
                                <Button onClick={handleSaveEdit} className="flex-1">Save Changes</Button>
                                <Button variant="ghost" onClick={() => setEditingUser(null)} className="flex-1">Cancel</Button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default AdminUsersPage;
