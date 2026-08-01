import React, { useState } from 'react';
import {
  Users,
  UserPlus,
  ShieldCheck,
  Mail,
  Phone,
  Store,
  CheckCircle2,
  XCircle,
  MoreVertical,
  Download,
  Search,
  ChevronDown,
  SlidersHorizontal,
  X,
  Info,
  Clock,
  Shield,
  UserCheck,
  UserX,
  TrendingUp,
  Sparkles,
  Edit3,
  Ban
} from 'lucide-react';

export interface UserItem {
  id: string;
  userId: string;
  name: string;
  email: string;
  phone: string;
  role: 'Administrator' | 'Store Manager' | 'Operator' | 'Security Analyst' | 'Viewer';
  assignedStore: string;
  status: 'Active' | 'Inactive' | 'Suspended';
  lastLogin: string;
  avatarUrl: string;
  permissions: {
    title: string;
    description: string;
    granted: boolean;
  }[];
  recentActivity: {
    id: string;
    title: string;
    time: string;
    device: string;
    type: 'primary' | 'neutral';
  }[];
}

export const UsersView: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [roleFilter, setRoleFilter] = useState<string>('Role: All');
  const [statusFilter, setStatusFilter] = useState<string>('Status: All');
  const [sortBy, setSortBy] = useState<string>('Sort By: Recent');

  const [selectedUser, setSelectedUser] = useState<UserItem | null>(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState<boolean>(false);

  // Add User Form State
  const [newUserName, setNewUserName] = useState<string>('');
  const [newUserEmail, setNewUserEmail] = useState<string>('');
  const [newUserPhone, setNewUserPhone] = useState<string>('');
  const [newUserRole, setNewUserRole] = useState<UserItem['role']>('Store Manager');
  const [newUserStore, setNewUserStore] = useState<string>('Manhattan Flagship');

  const [usersList, setUsersList] = useState<UserItem[]>([
    {
      id: 'usr-1',
      userId: 'USR-001',
      name: 'Sarah Jenkins',
      email: 's.jenkins@retailcount.ai',
      phone: '+1 (555) 098-4432',
      role: 'Administrator',
      assignedStore: 'Manhattan Flagship',
      status: 'Active',
      lastLogin: '2 mins ago',
      avatarUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAXmz3vLyUOqLrejEwuG2rQDPkgtYFNkZldCcPI9dOVHeZqR2WTHzGuYRzfpEISPJSY8i9cwFvSTbVM6zu5QAFhEpVSoBwLaJBEhFtTJcmRmhmR2qmPEa8LkcTGei5jqkFcPnwp4CyuO_7d5dSvTAL-wTVO3xhWyTBKFIctuHXCwvKvDRMTbRMlRGRYwHaAN9cSxhy5oc38_q74ytcYclbbOpOqGNn-Hj807lY6qHwx0_dZqL3oWA',
      permissions: [
        { title: 'Global System Access', description: 'Full unrestricted access to all platform settings', granted: true },
        { title: 'User Management', description: 'Ability to create, edit, and suspend users', granted: true },
        { title: 'Financial Reports', description: 'Access to revenue audit data and loss calculations', granted: true }
      ],
      recentActivity: [
        { id: 'act-1', title: 'Logged into Manhattan Dashboard', time: 'Today at 10:24 AM', device: 'Mac OS - Chrome', type: 'primary' },
        { id: 'act-2', title: 'Updated Store Camera #12', time: 'Yesterday at 4:45 PM', device: 'Mac OS - Chrome', type: 'neutral' },
        { id: 'act-3', title: 'Generated Monthly Sales Report', time: 'Oct 24, 2026 at 11:15 AM', device: 'Mac OS - Chrome', type: 'neutral' }
      ]
    },
    {
      id: 'usr-2',
      userId: 'USR-002',
      name: 'Marcus Chen',
      email: 'm.chen@retailcount.ai',
      phone: '+1 (555) 234-8901',
      role: 'Store Manager',
      assignedStore: 'San Francisco Hub',
      status: 'Active',
      lastLogin: '1 hour ago',
      avatarUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAnsMDfNFcx1n3n3rJ4gGJt7LoznVnh6SLer5eYnqPpCqtAxYtXBy47PcAKD5yUvVfoUTmPApmPivnpGYC7uGibVuE3NORbTK9T0RH5qe9gST__dqSG1VS2bqDUPySkcnabbdhU9GvysUOSvSHfiX9LOtCOr07xWBGxe_a58fNhlC5B8tJqfWBVVfBesDlBIeVImAtPLBMB8gS-ZCQR7Yyf3nP1kGM6i2jKKuI0KRdK8v3BsfbbUA',
      permissions: [
        { title: 'Store Level Control', description: 'Manage local cameras and store operators', granted: true },
        { title: 'Live Stream Monitoring', description: 'View 1080p live RTSP security feeds', granted: true },
        { title: 'Financial Reports', description: 'Access to local revenue & shrinkage data', granted: false }
      ],
      recentActivity: [
        { id: 'act-10', title: 'Acknowledged Queue Alert AL-841', time: 'Today at 11:15 AM', device: 'Windows 11 - Edge', type: 'primary' },
        { id: 'act-11', title: 'Exported Daily Store Footfall', time: 'Yesterday at 6:30 PM', device: 'Windows 11 - Edge', type: 'neutral' }
      ]
    },
    {
      id: 'usr-3',
      userId: 'USR-003',
      name: 'Elena Rodriguez',
      email: 'e.rod@retailcount.ai',
      phone: '+44 20 7946 0912',
      role: 'Operator',
      assignedStore: 'London Soho',
      status: 'Inactive',
      lastLogin: '3 days ago',
      avatarUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDSAhGXJjVOIX15zLFvjLr1WzmO-5LB91hNHd7Z3Yw_O1RiTh-f8B9pnO-B-fMUmXKVrucn_tHvkUx8g3BLk_dLZ-W3PTxWX17Ik7wfogZLrhzngOnj5D-tODVh7P7ILIOrhwD68fpVxF1z6XA4GbH9aIZbotAYBiy9OSy-Q8EoiBuZhtJTlYF-Vs65VEOh2y8WPYXTrdMsfG0jiCYTpD8hgnlVM9ugSCOInfpKf0iKzbgF7QOabQ',
      permissions: [
        { title: 'Live Stream Monitoring', description: 'View real-time CCTV feeds and bounding boxes', granted: true },
        { title: 'Alert Acknowledgment', description: 'Mark active queue and security alerts as resolved', granted: true },
        { title: 'System Settings Access', description: 'Modify AI confidence thresholds and API keys', granted: false }
      ],
      recentActivity: [
        { id: 'act-20', title: 'Cleared Congestion Alert AL-838', time: '3 days ago at 2:15 PM', device: 'iOS App - Safari', type: 'neutral' }
      ]
    },
    {
      id: 'usr-4',
      userId: 'USR-004',
      name: 'David Chen',
      email: 'd.chen@retailcount.ai',
      phone: '+1 (718) 555-0344',
      role: 'Store Manager',
      assignedStore: 'Queens Center',
      status: 'Active',
      lastLogin: '12 mins ago',
      avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
      permissions: [
        { title: 'Store Level Control', description: 'Manage local cameras and store operators', granted: true },
        { title: 'Live Stream Monitoring', description: 'View 1080p live RTSP security feeds', granted: true },
        { title: 'User Management', description: 'Ability to create, edit, and suspend users', granted: false }
      ],
      recentActivity: [
        { id: 'act-30', title: 'Reviewed High Occupancy Audit', time: 'Today at 01:45 PM', device: 'Mac OS - Chrome', type: 'primary' }
      ]
    }
  ]);

  // Filter & Sort Logic
  const filteredUsers = usersList
    .filter((user) => {
      if (roleFilter !== 'Role: All' && user.role !== roleFilter.replace('Role: ', '')) return false;
      if (statusFilter !== 'Status: All' && user.status !== statusFilter.replace('Status: ', '')) return false;
      if (
        searchQuery &&
        !user.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
        !user.email.toLowerCase().includes(searchQuery.toLowerCase()) &&
        !user.userId.toLowerCase().includes(searchQuery.toLowerCase()) &&
        !user.assignedStore.toLowerCase().includes(searchQuery.toLowerCase())
      ) {
        return false;
      }
      return true;
    })
    .sort((a, b) => {
      if (sortBy === 'Name (A-Z)') return a.name.localeCompare(b.name);
      if (sortBy === 'ID') return a.userId.localeCompare(b.userId);
      return 0;
    });

  const totalUsersCount = 24;
  const activeUsersCount = 22;
  const adminsCount = 4;
  const inactiveUsersCount = 2;

  const handleAddUserSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newUserName || !newUserEmail) return;

    const createdUser: UserItem = {
      id: `usr-${Date.now().toString().slice(-4)}`,
      userId: `USR-00${usersList.length + 1}`,
      name: newUserName,
      email: newUserEmail,
      phone: newUserPhone || '+1 (555) 000-1234',
      role: newUserRole,
      assignedStore: newUserStore,
      status: 'Active',
      lastLogin: 'Just now',
      avatarUrl: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80',
      permissions: [
        { title: 'Store Level Control', description: 'Manage assigned store telemetry', granted: true },
        { title: 'Live Stream Monitoring', description: 'View real-time camera feeds', granted: true },
        { title: 'System Settings Access', description: 'Access configuration controls', granted: false }
      ],
      recentActivity: [
        { id: `act-new-${Date.now()}`, title: 'Account Created & Credentials Issued', time: 'Just now', device: 'System Admin', type: 'primary' }
      ]
    };

    setUsersList([createdUser, ...usersList]);
    setNewUserName('');
    setNewUserEmail('');
    setNewUserPhone('');
    setIsAddModalOpen(false);
    setSelectedUser(createdUser);
  };

  const handleToggleStatus = (user: UserItem) => {
    const updatedStatus = user.status === 'Active' ? 'Suspended' : 'Active';
    const updatedList = usersList.map((u) => (u.id === user.id ? { ...u, status: updatedStatus as UserItem['status'] } : u));
    setUsersList(updatedList);
    setSelectedUser({ ...user, status: updatedStatus as UserItem['status'] });
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* PAGE HEADER */}
      <section className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-[#191c1e] tracking-tight">
            Users
          </h1>
          <p className="text-xs md:text-sm text-[#6B7280] font-medium mt-1 max-w-2xl">
            Manage user accounts and role-based access within the RETAILCOUNT platform.
          </p>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={() => alert('Exporting user directory & access control matrix (CSV)...')}
            className="px-4 py-2.5 rounded-xl border border-[#E5E7EB] bg-white font-bold text-xs text-[#191c1e] hover:bg-[#f7f9fb] transition-all flex items-center gap-2 cursor-pointer shadow-2xs"
          >
            <Download className="w-4 h-4 text-[#575e70]" /> Export Users
          </button>
          <button
            onClick={() => setIsAddModalOpen(true)}
            className="px-5 py-2.5 rounded-xl bg-[#28268d] hover:bg-[#4040a5] text-white font-bold text-xs transition-all flex items-center gap-2 shadow-md active:scale-95 cursor-pointer"
          >
            <UserPlus className="w-4 h-4" /> Add User
          </button>
        </div>
      </section>

      {/* SUMMARY CARDS */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Total Users */}
        <div className="bg-white p-6 rounded-2xl shadow-2xs border border-[#E5E7EB] hover:shadow-md transition-all">
          <div className="flex items-center justify-between mb-4">
            <div className="p-2.5 bg-[#28268d]/10 rounded-xl text-[#28268d]">
              <Users className="w-5 h-5" />
            </div>
            <span className="text-xs font-bold text-[#16A34A] flex items-center gap-1">
              <TrendingUp className="w-3.5 h-3.5" /> +3%
            </span>
          </div>
          <p className="text-xs font-semibold text-[#6B7280]">Total Users</p>
          <p className="text-3xl font-extrabold text-[#191c1e] mt-1">{totalUsersCount}</p>
        </div>

        {/* Active Users */}
        <div className="bg-white p-6 rounded-2xl shadow-2xs border border-[#E5E7EB] hover:shadow-md transition-all">
          <div className="flex items-center justify-between mb-4">
            <div className="p-2.5 bg-[#16A34A]/10 rounded-xl text-[#16A34A]">
              <UserCheck className="w-5 h-5" />
            </div>
            <span className="text-xs font-bold text-[#6B7280]">92% rate</span>
          </div>
          <p className="text-xs font-semibold text-[#6B7280]">Active Users</p>
          <p className="text-3xl font-extrabold text-[#191c1e] mt-1">{activeUsersCount}</p>
        </div>

        {/* Administrators */}
        <div className="bg-white p-6 rounded-2xl shadow-2xs border border-[#E5E7EB] hover:shadow-md transition-all">
          <div className="flex items-center justify-between mb-4">
            <div className="p-2.5 bg-[#F59E0B]/10 rounded-xl text-[#F59E0B]">
              <ShieldCheck className="w-5 h-5" />
            </div>
          </div>
          <p className="text-xs font-semibold text-[#6B7280]">Administrators</p>
          <p className="text-3xl font-extrabold text-[#191c1e] mt-1">{adminsCount}</p>
        </div>

        {/* Inactive Users */}
        <div className="bg-white p-6 rounded-2xl shadow-2xs border border-[#E5E7EB] hover:shadow-md transition-all">
          <div className="flex items-center justify-between mb-4">
            <div className="p-2.5 bg-[#DC2626]/10 rounded-xl text-[#DC2626]">
              <UserX className="w-5 h-5" />
            </div>
          </div>
          <p className="text-xs font-semibold text-[#6B7280]">Inactive Users</p>
          <p className="text-3xl font-extrabold text-[#191c1e] mt-1">{inactiveUsersCount}</p>
        </div>
      </section>

      {/* FILTER & SEARCH ACTION BAR */}
      <section className="bg-white p-4 rounded-2xl shadow-2xs border border-[#E5E7EB] flex flex-wrap items-center gap-4">
        <div className="relative flex-1 min-w-[240px]">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#6B7280]" />
          <input
            type="text"
            placeholder="Search by name, ID, or email..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-[#f7f9fb] border border-[#E5E7EB] rounded-xl pl-10 pr-4 py-2.5 text-xs font-semibold text-[#191c1e] focus:outline-none focus:ring-2 focus:ring-[#28268d]"
          />
        </div>

        <div className="flex flex-wrap items-center gap-3">
          {/* Role Filter */}
          <div className="relative">
            <select
              value={roleFilter}
              onChange={(e) => setRoleFilter(e.target.value)}
              className="appearance-none bg-white border border-[#E5E7EB] rounded-xl px-4 py-2.5 pr-8 text-xs font-semibold text-[#191c1e] focus:outline-none focus:ring-2 focus:ring-[#28268d] cursor-pointer min-w-[140px]"
            >
              <option>Role: All</option>
              <option>Role: Administrator</option>
              <option>Role: Store Manager</option>
              <option>Role: Operator</option>
              <option>Role: Security Analyst</option>
            </select>
            <ChevronDown className="w-3.5 h-3.5 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-[#6B7280]" />
          </div>

          {/* Status Filter */}
          <div className="relative">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="appearance-none bg-white border border-[#E5E7EB] rounded-xl px-4 py-2.5 pr-8 text-xs font-semibold text-[#191c1e] focus:outline-none focus:ring-2 focus:ring-[#28268d] cursor-pointer min-w-[140px]"
            >
              <option>Status: All</option>
              <option>Status: Active</option>
              <option>Status: Inactive</option>
              <option>Status: Suspended</option>
            </select>
            <ChevronDown className="w-3.5 h-3.5 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-[#6B7280]" />
          </div>

          {/* Sort Filter */}
          <div className="relative">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="appearance-none bg-white border border-[#E5E7EB] rounded-xl px-4 py-2.5 pr-8 text-xs font-semibold text-[#191c1e] focus:outline-none focus:ring-2 focus:ring-[#28268d] cursor-pointer min-w-[150px]"
            >
              <option>Sort By: Recent</option>
              <option>Name (A-Z)</option>
              <option>ID</option>
            </select>
            <ChevronDown className="w-3.5 h-3.5 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-[#6B7280]" />
          </div>

          <button className="p-2.5 text-[#575e70] hover:bg-[#f7f9fb] border border-[#E5E7EB] rounded-xl transition-all cursor-pointer">
            <SlidersHorizontal className="w-4 h-4" />
          </button>
        </div>
      </section>

      {/* TABLE CONTAINER */}
      <section className="bg-white rounded-2xl shadow-2xs border border-[#E5E7EB] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[#f7f9fb] border-b border-[#E5E7EB] text-[11px] font-extrabold text-[#6B7280] uppercase tracking-wider">
                <th className="px-6 py-4 font-semibold">User ID</th>
                <th className="px-6 py-4 font-semibold">Full Name</th>
                <th className="px-6 py-4 font-semibold">Role</th>
                <th className="px-6 py-4 font-semibold">Assigned Store</th>
                <th className="px-6 py-4 font-semibold">Status</th>
                <th className="px-6 py-4 font-semibold">Last Login</th>
                <th className="px-6 py-4 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E5E7EB]">
              {filteredUsers.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-12 text-center text-[#6B7280] space-y-2">
                    <Users className="w-10 h-10 mx-auto text-[#6B7280]/40" />
                    <p className="text-xs font-bold">No user accounts found matching selected criteria.</p>
                  </td>
                </tr>
              ) : (
                filteredUsers.map((user) => (
                  <tr
                    key={user.id}
                    onClick={() => setSelectedUser(user)}
                    className={`hover:bg-[#28268d]/5 transition-colors cursor-pointer ${
                      selectedUser?.id === user.id ? 'bg-[#d9dff5]/30' : ''
                    }`}
                  >
                    <td className="px-6 py-5 text-xs font-mono font-bold text-[#28268d]">{user.userId}</td>
                    <td className="px-6 py-5">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-[#f2f4f6] overflow-hidden border border-[#E5E7EB] shrink-0">
                          <img src={user.avatarUrl} alt={user.name} className="w-full h-full object-cover" />
                        </div>
                        <div>
                          <p className="text-xs font-extrabold text-[#191c1e]">{user.name}</p>
                          <p className="text-[11px] text-[#6B7280] font-medium">{user.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-5">
                      <span className={`px-2.5 py-1 rounded-full text-[11px] font-extrabold ${
                        user.role === 'Administrator'
                          ? 'bg-[#28268d]/10 text-[#28268d]'
                          : user.role === 'Store Manager'
                          ? 'bg-[#d9dff5] text-[#404758]'
                          : user.role === 'Operator'
                          ? 'bg-[#F59E0B]/10 text-[#F59E0B]'
                          : 'bg-[#f2f4f6] text-[#575e70]'
                      }`}>
                        {user.role}
                      </span>
                    </td>
                    <td className="px-6 py-5 text-xs font-semibold text-[#191c1e]">{user.assignedStore}</td>
                    <td className="px-6 py-5">
                      <div className="flex items-center gap-2">
                        <div className={`w-2 h-2 rounded-full ${
                          user.status === 'Active'
                            ? 'bg-[#16A34A]'
                            : user.status === 'Suspended'
                            ? 'bg-[#DC2626]'
                            : 'bg-[#6B7280]'
                        }`} />
                        <span className={`text-xs font-bold ${
                          user.status === 'Active'
                            ? 'text-[#16A34A]'
                            : user.status === 'Suspended'
                            ? 'text-[#DC2626]'
                            : 'text-[#6B7280]'
                        }`}>
                          {user.status}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-5 text-xs text-[#6B7280] font-medium">{user.lastLogin}</td>
                    <td className="px-6 py-5 text-right">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedUser(user);
                        }}
                        className="p-2 text-[#6B7280] hover:text-[#28268d] transition-colors cursor-pointer"
                      >
                        <MoreVertical className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination Footer */}
        <div className="p-4 bg-[#f7f9fb] border-t border-[#E5E7EB] flex items-center justify-between text-xs font-semibold text-[#6B7280]">
          <p>Showing 1 to {filteredUsers.length} of 24 users</p>
          <div className="flex items-center gap-2">
            <button className="px-3 py-1.5 border border-[#E5E7EB] rounded-lg bg-white hover:bg-[#f2f4f6] transition-all disabled:opacity-50" disabled>
              Previous
            </button>
            <button className="w-8 h-8 rounded-lg bg-[#28268d] text-white font-bold">1</button>
            <button className="w-8 h-8 rounded-lg hover:bg-white text-[#191c1e] font-semibold">2</button>
            <button className="w-8 h-8 rounded-lg hover:bg-white text-[#191c1e] font-semibold">3</button>
            <button className="px-3 py-1.5 border border-[#E5E7EB] rounded-lg bg-white hover:bg-[#f2f4f6] transition-all">
              Next
            </button>
          </div>
        </div>
      </section>

      {/* USER DETAILS SLIDE-OVER DRAWER */}
      {selectedUser && (
        <aside className="fixed top-0 right-0 h-screen w-full sm:w-[450px] bg-white shadow-2xl z-50 border-l border-[#E5E7EB] flex flex-col justify-between overflow-y-auto animate-in slide-in-from-right duration-300">
          <div>
            {/* Drawer Header */}
            <div className="p-6 border-b border-[#E5E7EB] flex items-center justify-between sticky top-0 bg-white/95 backdrop-blur-md z-10">
              <h3 className="text-base font-extrabold text-[#191c1e]">User Details</h3>
              <button
                onClick={() => setSelectedUser(null)}
                className="p-1.5 hover:bg-[#f2f4f6] text-[#6B7280] rounded-full transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Drawer Body Content */}
            <div className="p-8 space-y-8">
              {/* Profile Card Header */}
              <div className="flex flex-col items-center text-center">
                <div className="w-24 h-24 rounded-2xl overflow-hidden border-4 border-white shadow-md bg-[#f2f4f6] mb-4">
                  <img src={selectedUser.avatarUrl} alt={selectedUser.name} className="w-full h-full object-cover" />
                </div>
                <h4 className="text-xl font-extrabold text-[#191c1e]">{selectedUser.name}</h4>
                <p className="text-[#28268d] font-bold text-xs px-3 py-1 bg-[#28268d]/10 rounded-full mt-2 inline-block">
                  {selectedUser.role}
                </p>
                <p className="text-xs text-[#6B7280] font-mono font-bold mt-2">{selectedUser.userId}</p>
              </div>

              {/* Contact Information */}
              <div className="space-y-3">
                <h5 className="text-[11px] font-extrabold uppercase tracking-wider text-[#6B7280]">
                  Contact Information
                </h5>
                <div className="space-y-3 text-xs">
                  <div className="flex items-center gap-4 p-4 rounded-xl bg-[#f7f9fb] border border-[#E5E7EB]">
                    <Mail className="w-4 h-4 text-[#6B7280] shrink-0" />
                    <div className="min-w-0 flex-1">
                      <p className="text-[10px] text-[#6B7280] font-bold">Email Address</p>
                      <p className="font-bold text-[#191c1e] truncate">{selectedUser.email}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 p-4 rounded-xl bg-[#f7f9fb] border border-[#E5E7EB]">
                    <Phone className="w-4 h-4 text-[#6B7280] shrink-0" />
                    <div>
                      <p className="text-[10px] text-[#6B7280] font-bold">Phone Number</p>
                      <p className="font-bold text-[#191c1e]">{selectedUser.phone}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Role Permissions */}
              <div className="space-y-3">
                <h5 className="text-[11px] font-extrabold uppercase tracking-wider text-[#6B7280]">
                  Role Permissions
                </h5>
                <div className="space-y-2 text-xs">
                  {selectedUser.permissions.map((perm, idx) => (
                    <div key={idx} className="flex items-center justify-between p-3 border border-[#E5E7EB] rounded-xl bg-white shadow-2xs">
                      <div className="flex items-center gap-3">
                        {perm.granted ? (
                          <CheckCircle2 className="w-4 h-4 text-[#16A34A] shrink-0" />
                        ) : (
                          <XCircle className="w-4 h-4 text-[#6B7280]/40 shrink-0" />
                        )}
                        <span className={`font-bold ${perm.granted ? 'text-[#191c1e]' : 'text-[#6B7280] line-through'}`}>
                          {perm.title}
                        </span>
                      </div>
                      <Info className="w-4 h-4 text-[#6B7280] shrink-0 cursor-help" title={perm.description} />
                    </div>
                  ))}
                </div>
              </div>

              {/* Recent Activity */}
              <div className="space-y-3">
                <h5 className="text-[11px] font-extrabold uppercase tracking-wider text-[#6B7280]">
                  Recent Activity
                </h5>
                <div className="relative pl-6 space-y-4 text-xs before:absolute before:left-2 before:top-2 before:bottom-2 before:w-0.5 before:bg-[#E5E7EB]">
                  {selectedUser.recentActivity.map((act) => (
                    <div key={act.id} className="relative">
                      <div className={`absolute -left-6 top-1 w-2.5 h-2.5 rounded-full ring-4 ring-white ${
                        act.type === 'primary' ? 'bg-[#28268d]' : 'bg-[#6B7280]'
                      }`} />
                      <p className="font-bold text-[#191c1e]">{act.title}</p>
                      <p className="text-[10px] text-[#6B7280] font-medium mt-0.5">{act.time} • {act.device}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Drawer Footer Actions */}
          <div className="p-6 border-t border-[#E5E7EB] bg-white sticky bottom-0 flex gap-3">
            <button
              onClick={() => alert(`Editing profile settings for ${selectedUser.name}...`)}
              className="flex-1 py-3 bg-[#28268d] hover:bg-[#4040a5] text-white rounded-xl text-xs font-bold transition-all shadow-md cursor-pointer flex items-center justify-center gap-2"
            >
              <Edit3 className="w-4 h-4" /> Edit Profile
            </button>
            <button
              onClick={() => handleToggleStatus(selectedUser)}
              className={`px-4 py-3 border rounded-xl text-xs font-bold transition-colors cursor-pointer flex items-center justify-center gap-1.5 ${
                selectedUser.status === 'Active'
                  ? 'border-[#DC2626] text-[#DC2626] hover:bg-[#DC2626]/10'
                  : 'border-[#16A34A] text-[#16A34A] hover:bg-[#16A34A]/10'
              }`}
            >
              <Ban className="w-4 h-4" /> {selectedUser.status === 'Active' ? 'Suspend' : 'Activate'}
            </button>
          </div>
        </aside>
      )}

      {/* ADD USER MODAL */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="bg-white w-full max-w-lg rounded-2xl shadow-2xl border border-[#E5E7EB] overflow-hidden">
            <div className="p-6 border-b border-[#E5E7EB] flex items-center justify-between bg-[#f7f9fb]">
              <div className="flex items-center gap-2.5">
                <div className="p-2 bg-[#28268d] text-white rounded-xl">
                  <UserPlus className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-extrabold text-[#191c1e]">Add New User Account</h3>
                  <p className="text-xs text-[#6B7280] font-medium">Provision user profile & assign role-based permissions.</p>
                </div>
              </div>
              <button
                onClick={() => setIsAddModalOpen(false)}
                className="p-1.5 hover:bg-[#e0e3e5] text-[#6B7280] rounded-lg transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddUserSubmit} className="p-6 space-y-4">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-[#191c1e]">Full Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Rachel Adams"
                  value={newUserName}
                  onChange={(e) => setNewUserName(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-[#f7f9fb] border border-[#E5E7EB] rounded-xl text-xs font-semibold text-[#191c1e] focus:outline-none focus:ring-2 focus:ring-[#28268d]"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-[#191c1e]">Email Address</label>
                  <input
                    type="email"
                    required
                    placeholder="r.adams@retailcount.ai"
                    value={newUserEmail}
                    onChange={(e) => setNewUserEmail(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-[#f7f9fb] border border-[#E5E7EB] rounded-xl text-xs font-semibold text-[#191c1e] focus:outline-none focus:ring-2 focus:ring-[#28268d]"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-[#191c1e]">Phone Number</label>
                  <input
                    type="text"
                    placeholder="+1 (555) 019-2831"
                    value={newUserPhone}
                    onChange={(e) => setNewUserPhone(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-[#f7f9fb] border border-[#E5E7EB] rounded-xl text-xs font-semibold text-[#191c1e] focus:outline-none focus:ring-2 focus:ring-[#28268d]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-[#191c1e]">Role Assignment</label>
                  <select
                    value={newUserRole}
                    onChange={(e) => setNewUserRole(e.target.value as UserItem['role'])}
                    className="w-full px-3.5 py-2.5 bg-[#f7f9fb] border border-[#E5E7EB] rounded-xl text-xs font-semibold text-[#191c1e] focus:outline-none focus:ring-2 focus:ring-[#28268d]"
                  >
                    <option>Administrator</option>
                    <option>Store Manager</option>
                    <option>Operator</option>
                    <option>Security Analyst</option>
                    <option>Viewer</option>
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-[#191c1e]">Assigned Retail Store</label>
                  <select
                    value={newUserStore}
                    onChange={(e) => setNewUserStore(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-[#f7f9fb] border border-[#E5E7EB] rounded-xl text-xs font-semibold text-[#191c1e] focus:outline-none focus:ring-2 focus:ring-[#28268d]"
                  >
                    <option>Manhattan Flagship</option>
                    <option>Brooklyn Heights</option>
                    <option>Queens Center</option>
                    <option>San Francisco Hub</option>
                    <option>London Soho</option>
                  </select>
                </div>
              </div>

              <div className="p-6 border-t border-[#E5E7EB] bg-[#f7f9fb] -mx-6 -mb-6 mt-6 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-4 py-2 border border-[#E5E7EB] text-[#575e70] hover:bg-[#e0e3e5] rounded-xl text-xs font-bold transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-[#28268d] hover:bg-[#4040a5] text-white rounded-xl text-xs font-bold transition-all shadow-md cursor-pointer"
                >
                  Create User Account
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
