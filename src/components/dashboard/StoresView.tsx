import React, { useState } from 'react';
import {
  Store,
  MapPin,
  Video,
  Users,
  CheckCircle2,
  AlertCircle,
  Plus,
  Download,
  Search,
  Filter,
  SlidersHorizontal,
  ChevronDown,
  X,
  Clock,
  Mail,
  Phone,
  Compass,
  TrendingUp,
  Activity,
  ShieldCheck,
  Eye,
  Edit,
  ExternalLink,
  Navigation,
  Sparkles
} from 'lucide-react';

export interface StoreItem {
  id: string;
  name: string;
  storeCode: string;
  region: 'North America' | 'Europe' | 'Asia-Pacific';
  address: string;
  manager: string;
  managerRole: string;
  managerInitials: string;
  managerEmail: string;
  phone: string;
  hours: string;
  camerasTotal: number;
  camerasOnline: number;
  occupancy: number;
  occupancyCapacity: number;
  visitorsToday: number;
  visitorsTarget: number;
  updatedTime: string;
  status: 'Active' | 'Maintenance' | 'Offline';
  alertsCount: number;
  gpsCoordinates: string;
  mapImage: string;
  recentActivity: {
    id: string;
    title: string;
    description: string;
    time: string;
    type: 'success' | 'primary' | 'warning' | 'neutral';
  }[];
}

export const StoresView: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedRegion, setSelectedRegion] = useState<string>('All Regions');
  const [selectedStatus, setSelectedStatus] = useState<string>('All Statuses');
  const [sortBy, setSortBy] = useState<string>('Name A-Z');
  
  const [selectedStore, setSelectedStore] = useState<StoreItem | null>(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState<boolean>(false);

  // New store form state
  const [newStoreName, setNewStoreName] = useState('');
  const [newStoreCode, setNewStoreCode] = useState('ST-013');
  const [newStoreAddress, setNewStoreAddress] = useState('');
  const [newStoreManager, setNewStoreManager] = useState('');
  const [newStoreRegion, setNewStoreRegion] = useState<'North America' | 'Europe' | 'Asia-Pacific'>('North America');

  const [storesList, setStoresList] = useState<StoreItem[]>([
    {
      id: 'st-1',
      name: 'Manhattan Flagship',
      storeCode: 'ST-001',
      region: 'North America',
      address: '767 5th Ave, New York, NY 10153',
      manager: 'Alex Rivera',
      managerRole: 'General Manager',
      managerInitials: 'AR',
      managerEmail: 'arivera@retailcount.ai',
      phone: '+1 (212) 555-0123',
      hours: '9:00 AM - 9:00 PM',
      camerasTotal: 42,
      camerasOnline: 41,
      occupancy: 248,
      occupancyCapacity: 300,
      visitorsToday: 2140,
      visitorsTarget: 2500,
      updatedTime: '2 min ago',
      status: 'Active',
      alertsCount: 0,
      gpsCoordinates: 'GPS: 40.7629° N, 73.9739° W',
      mapImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDR8xMK16HF0DaANyC8jnkEp3A-Xwc9zVe6ruhNl9O_---RXrYjWsBHw42jlUUjgxx6tngRpE4dcM3YZ9kqw0ZSvNWMwvWPwD4GCxQlw_PVMPCnlwKE9ScrTNj8hjJAY-2w0vEmXUT9OF6PjSQOVPPp2A1Kq6Tmz2KmNn_nTql2vLsUQXlrx6aKSLy8vL45PTNo4u0zeyLkUyO_i015apwDuNGGncljA4zLXVxgJeDU4nmYxgyZAA',
      recentActivity: [
        {
          id: 'act-1',
          title: 'Capacity Threshold Reached',
          description: '85% occupancy detected by AI sensors.',
          time: '12:34 PM',
          type: 'success'
        },
        {
          id: 'act-2',
          title: 'Manual Sync Performed',
          description: 'Administrator Alex Rivera refreshed camera nodes.',
          time: '11:15 AM',
          type: 'primary'
        },
        {
          id: 'act-3',
          title: 'Store Opened',
          description: 'System activated for morning operations.',
          time: '9:00 AM',
          type: 'neutral'
        }
      ]
    },
    {
      id: 'st-2',
      name: 'Brooklyn Heights',
      storeCode: 'ST-002',
      region: 'North America',
      address: '166 Montague St, Brooklyn, NY 11201',
      manager: 'Sarah Jenkins',
      managerRole: 'Operations Lead',
      managerInitials: 'SJ',
      managerEmail: 'sjenkins@retailcount.ai',
      phone: '+1 (718) 555-0199',
      hours: '10:00 AM - 8:00 PM',
      camerasTotal: 28,
      camerasOnline: 28,
      occupancy: 115,
      occupancyCapacity: 200,
      visitorsToday: 1480,
      visitorsTarget: 2000,
      updatedTime: 'Just now',
      status: 'Active',
      alertsCount: 0,
      gpsCoordinates: 'GPS: 40.6942° N, 73.9930° W',
      mapImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDR8xMK16HF0DaANyC8jnkEp3A-Xwc9zVe6ruhNl9O_---RXrYjWsBHw42jlUUjgxx6tngRpE4dcM3YZ9kqw0ZSvNWMwvWPwD4GCxQlw_PVMPCnlwKE9ScrTNj8hjJAY-2w0vEmXUT9OF6PjSQOVPPp2A1Kq6Tmz2KmNn_nTql2vLsUQXlrx6aKSLy8vL45PTNo4u0zeyLkUyO_i015apwDuNGGncljA4zLXVxgJeDU4nmYxgyZAA',
      recentActivity: [
        {
          id: 'act-10',
          title: 'AI Footfall Calibration Complete',
          description: 'Optimal tracking accuracy verified across 28 feeds.',
          time: '01:10 PM',
          type: 'success'
        },
        {
          id: 'act-11',
          title: 'Staffing Peak Alert Cleared',
          description: 'Checkout queue dwell stabilized below 2 mins.',
          time: '11:45 AM',
          type: 'primary'
        }
      ]
    },
    {
      id: 'st-3',
      name: 'Queens Center',
      storeCode: 'ST-003',
      region: 'North America',
      address: '90-15 Queens Blvd, Queens, NY 11373',
      manager: 'David Chen',
      managerRole: 'Regional Manager',
      managerInitials: 'DC',
      managerEmail: 'dchen@retailcount.ai',
      phone: '+1 (718) 555-0344',
      hours: '10:00 AM - 9:30 PM',
      camerasTotal: 56,
      camerasOnline: 56,
      occupancy: 482,
      occupancyCapacity: 600,
      visitorsToday: 4120,
      visitorsTarget: 4500,
      updatedTime: '5 min ago',
      status: 'Active',
      alertsCount: 0,
      gpsCoordinates: 'GPS: 40.7348° N, 73.8706° W',
      mapImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDR8xMK16HF0DaANyC8jnkEp3A-Xwc9zVe6ruhNl9O_---RXrYjWsBHw42jlUUjgxx6tngRpE4dcM3YZ9kqw0ZSvNWMwvWPwD4GCxQlw_PVMPCnlwKE9ScrTNj8hjJAY-2w0vEmXUT9OF6PjSQOVPPp2A1Kq6Tmz2KmNn_nTql2vLsUQXlrx6aKSLy8vL45PTNo4u0zeyLkUyO_i015apwDuNGGncljA4zLXVxgJeDU4nmYxgyZAA',
      recentActivity: [
        {
          id: 'act-20',
          title: 'High Occupancy Zone Triggered',
          description: 'Central Food Court aisle traffic peak at 482 shoppers.',
          time: '02:00 PM',
          type: 'warning'
        }
      ]
    },
    {
      id: 'st-4',
      name: 'London Regent Street',
      storeCode: 'ST-004',
      region: 'Europe',
      address: '180 Regent St, London W1B 5TH, UK',
      manager: 'Emma Watson',
      managerRole: 'EU Operations Lead',
      managerInitials: 'EW',
      managerEmail: 'ewatson@retailcount.ai',
      phone: '+44 20 7946 0912',
      hours: '9:30 AM - 8:00 PM',
      camerasTotal: 34,
      camerasOnline: 33,
      occupancy: 310,
      occupancyCapacity: 400,
      visitorsToday: 3290,
      visitorsTarget: 3500,
      updatedTime: '12 min ago',
      status: 'Active',
      alertsCount: 1,
      gpsCoordinates: 'GPS: 51.5126° N, 0.1396° W',
      mapImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDR8xMK16HF0DaANyC8jnkEp3A-Xwc9zVe6ruhNl9O_---RXrYjWsBHw42jlUUjgxx6tngRpE4dcM3YZ9kqw0ZSvNWMwvWPwD4GCxQlw_PVMPCnlwKE9ScrTNj8hjJAY-2w0vEmXUT9OF6PjSQOVPPp2A1Kq6Tmz2KmNn_nTql2vLsUQXlrx6aKSLy8vL45PTNo4u0zeyLkUyO_i015apwDuNGGncljA4zLXVxgJeDU4nmYxgyZAA',
      recentActivity: [
        {
          id: 'act-30',
          title: 'Security Door Aisle Sensor Alert',
          description: 'Restricted stockroom door held open 45s.',
          time: '01:30 PM',
          type: 'warning'
        }
      ]
    }
  ]);

  // Filter & Sort Logic
  const filteredStores = storesList
    .filter((store) => {
      if (selectedRegion !== 'All Regions' && store.region !== selectedRegion) return false;
      if (selectedStatus !== 'All Statuses' && store.status !== selectedStatus) return false;
      if (
        searchQuery &&
        !store.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
        !store.address.toLowerCase().includes(searchQuery.toLowerCase()) &&
        !store.storeCode.toLowerCase().includes(searchQuery.toLowerCase())
      ) {
        return false;
      }
      return true;
    })
    .sort((a, b) => {
      if (sortBy === 'Name A-Z') return a.name.localeCompare(b.name);
      if (sortBy === 'Occupancy') return b.occupancy - a.occupancy;
      if (sortBy === 'Cameras') return b.camerasTotal - a.camerasTotal;
      return 0;
    });

  const handleAddStoreSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newStoreName) return;

    const createdStore: StoreItem = {
      id: `st-${Date.now().toString().slice(-4)}`,
      name: newStoreName,
      storeCode: newStoreCode || `ST-0${storesList.length + 1}`,
      region: newStoreRegion,
      address: newStoreAddress || '123 Enterprise Way, Retail City',
      manager: newStoreManager || 'Unassigned Manager',
      managerRole: 'Store Manager',
      managerInitials: newStoreManager
        ? newStoreManager.split(' ').map((n) => n[0]).join('')
        : 'UM',
      managerEmail: 'manager@retailcount.ai',
      phone: '+1 (555) 019-2831',
      hours: '9:00 AM - 9:00 PM',
      camerasTotal: 16,
      camerasOnline: 16,
      occupancy: 45,
      occupancyCapacity: 150,
      visitorsToday: 350,
      visitorsTarget: 1000,
      updatedTime: 'Just now',
      status: 'Active',
      alertsCount: 0,
      gpsCoordinates: 'GPS: 40.7128° N, 74.0060° W',
      mapImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDR8xMK16HF0DaANyC8jnkEp3A-Xwc9zVe6ruhNl9O_---RXrYjWsBHw42jlUUjgxx6tngRpE4dcM3YZ9kqw0ZSvNWMwvWPwD4GCxQlw_PVMPCnlwKE9ScrTNj8hjJAY-2w0vEmXUT9OF6PjSQOVPPp2A1Kq6Tmz2KmNn_nTql2vLsUQXlrx6aKSLy8vL45PTNo4u0zeyLkUyO_i015apwDuNGGncljA4zLXVxgJeDU4nmYxgyZAA',
      recentActivity: [
        {
          id: `act-new-${Date.now()}`,
          title: 'Store Node Provisioned',
          description: 'Newly registered retail store node connected to AI engine.',
          time: 'Just now',
          type: 'success'
        }
      ]
    };

    setStoresList([createdStore, ...storesList]);
    setNewStoreName('');
    setNewStoreAddress('');
    setNewStoreManager('');
    setIsAddModalOpen(false);
    setSelectedStore(createdStore);
  };

  const totalStoresCount = storesList.length;
  const activeStoresCount = storesList.filter((s) => s.status === 'Active').length;
  const totalCamerasCount = storesList.reduce((acc, s) => acc + s.camerasTotal, 0);
  const currentOccupancyCount = storesList.reduce((acc, s) => acc + s.occupancy, 0);

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* PAGE HEADER */}
      <section className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-[#191c1e] tracking-tight">
            Stores Management
          </h1>
          <p className="text-xs md:text-sm text-[#6B7280] font-medium mt-1 max-w-2xl">
            Manage all retail locations connected to the RETAILCOUNT AI monitoring platform.
          </p>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={() => alert('Exporting store telemetry report (CSV/PDF)...')}
            className="px-4 py-2.5 rounded-xl border border-[#E5E7EB] bg-white font-bold text-xs text-[#191c1e] hover:bg-[#f7f9fb] transition-all flex items-center gap-2 cursor-pointer shadow-2xs"
          >
            <Download className="w-4 h-4 text-[#575e70]" /> Export
          </button>
          <button
            onClick={() => setIsAddModalOpen(true)}
            className="px-5 py-2.5 rounded-xl bg-[#28268d] hover:bg-[#4040a5] text-white font-bold text-xs transition-all flex items-center gap-2 shadow-md active:scale-95 cursor-pointer"
          >
            <Plus className="w-4 h-4" /> Add Store
          </button>
        </div>
      </section>

      {/* SUMMARY METRIC CARDS */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-2xl shadow-2xs border border-[#E5E7EB] hover:shadow-md transition-all">
          <div className="flex justify-between items-start mb-4">
            <div className="w-10 h-10 bg-[#28268d]/5 rounded-xl flex items-center justify-center">
              <Store className="w-5 h-5 text-[#28268d]" />
            </div>
            <span className="text-[10px] font-bold text-[#6B7280] bg-[#f7f9fb] border border-[#E5E7EB] px-2.5 py-0.5 rounded-full uppercase tracking-wider">
              STABLE
            </span>
          </div>
          <p className="text-[#6B7280] text-xs font-semibold">Total Stores</p>
          <h3 className="text-3xl font-extrabold text-[#191c1e] mt-1">{totalStoresCount}</h3>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-2xs border border-[#E5E7EB] hover:shadow-md transition-all">
          <div className="flex justify-between items-start mb-4">
            <div className="w-10 h-10 bg-[#16A34A]/10 rounded-xl flex items-center justify-center">
              <Activity className="w-5 h-5 text-[#16A34A]" />
            </div>
            <span className="text-[10px] font-bold text-[#16A34A] bg-[#16A34A]/10 px-2.5 py-0.5 rounded-full uppercase tracking-wider">
              ONLINE
            </span>
          </div>
          <p className="text-[#6B7280] text-xs font-semibold">Active Stores</p>
          <h3 className="text-3xl font-extrabold text-[#191c1e] mt-1">{activeStoresCount}</h3>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-2xs border border-[#E5E7EB] hover:shadow-md transition-all">
          <div className="flex justify-between items-start mb-4">
            <div className="w-10 h-10 bg-[#28268d]/5 rounded-xl flex items-center justify-center">
              <Video className="w-5 h-5 text-[#28268d]" />
            </div>
            <span className="text-[10px] font-bold text-[#16A34A] flex items-center gap-0.5">
              <TrendingUp className="w-3.5 h-3.5" /> +2%
            </span>
          </div>
          <p className="text-[#6B7280] text-xs font-semibold">Total Cameras</p>
          <h3 className="text-3xl font-extrabold text-[#191c1e] mt-1">{totalCamerasCount}</h3>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-2xs border border-[#E5E7EB] hover:shadow-md transition-all">
          <div className="flex justify-between items-start mb-4">
            <div className="w-10 h-10 bg-[#F59E0B]/10 rounded-xl flex items-center justify-center">
              <Users className="w-5 h-5 text-[#F59E0B]" />
            </div>
            <span className="text-[10px] font-bold text-[#28268d] animate-pulse flex items-center gap-1.5 bg-[#e1dfff] px-2.5 py-0.5 rounded-full">
              <span className="w-1.5 h-1.5 rounded-full bg-[#28268d]" /> LIVE
            </span>
          </div>
          <p className="text-[#6B7280] text-xs font-semibold">Current Occupancy</p>
          <h3 className="text-3xl font-extrabold text-[#191c1e] mt-1">{currentOccupancyCount.toLocaleString()}</h3>
        </div>
      </section>

      {/* FILTER & SEARCH ACTION BAR */}
      <section className="flex flex-col md:flex-row gap-4 bg-white p-4 rounded-2xl border border-[#E5E7EB] shadow-2xs">
        <div className="relative flex-1">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#6B7280]" />
          <input
            type="text"
            placeholder="Search stores by name, location, or code..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-[#f7f9fb] border border-[#E5E7EB] rounded-xl pl-10 pr-4 py-2.5 text-xs font-semibold text-[#191c1e] focus:outline-none focus:ring-2 focus:ring-[#28268d]"
          />
        </div>

        <div className="flex flex-wrap items-center gap-3">
          {/* Region Dropdown */}
          <div className="relative">
            <select
              value={selectedRegion}
              onChange={(e) => setSelectedRegion(e.target.value)}
              className="appearance-none bg-[#f7f9fb] border border-[#E5E7EB] rounded-xl px-4 py-2.5 pr-8 text-xs font-semibold text-[#191c1e] focus:outline-none focus:ring-2 focus:ring-[#28268d] cursor-pointer min-w-[140px]"
            >
              <option>All Regions</option>
              <option>North America</option>
              <option>Europe</option>
              <option>Asia-Pacific</option>
            </select>
            <ChevronDown className="w-3.5 h-3.5 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-[#6B7280]" />
          </div>

          {/* Status Dropdown */}
          <div className="relative">
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="appearance-none bg-[#f7f9fb] border border-[#E5E7EB] rounded-xl px-4 py-2.5 pr-8 text-xs font-semibold text-[#191c1e] focus:outline-none focus:ring-2 focus:ring-[#28268d] cursor-pointer min-w-[140px]"
            >
              <option>All Statuses</option>
              <option>Active</option>
              <option>Maintenance</option>
              <option>Offline</option>
            </select>
            <ChevronDown className="w-3.5 h-3.5 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-[#6B7280]" />
          </div>

          {/* Sort By Dropdown */}
          <div className="relative">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="appearance-none bg-[#f7f9fb] border border-[#E5E7EB] rounded-xl px-4 py-2.5 pr-8 text-xs font-semibold text-[#191c1e] focus:outline-none focus:ring-2 focus:ring-[#28268d] cursor-pointer min-w-[160px]"
            >
              <option>Sort By: Name A-Z</option>
              <option>Sort By: Occupancy</option>
              <option>Sort By: Cameras</option>
            </select>
            <ChevronDown className="w-3.5 h-3.5 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-[#6B7280]" />
          </div>
        </div>
      </section>

      {/* STORE GRID DISPLAY */}
      <section className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredStores.length === 0 ? (
          <div className="col-span-full py-16 text-center bg-white rounded-2xl border border-[#E5E7EB] space-y-3">
            <Store className="w-12 h-12 mx-auto text-[#6B7280]/40" />
            <h3 className="text-base font-extrabold text-[#191c1e]">No stores found</h3>
            <p className="text-xs text-[#6B7280] font-medium max-w-sm mx-auto">
              We couldn't find any stores matching your search filters. Try resetting search criteria.
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedRegion('All Regions');
                setSelectedStatus('All Statuses');
                setSortBy('Name A-Z');
              }}
              className="px-4 py-2 bg-[#f2f4f6] text-[#28268d] text-xs font-bold rounded-xl hover:bg-[#d9dff5] transition-colors cursor-pointer"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          filteredStores.map((store) => (
            <div
              key={store.id}
              onClick={() => setSelectedStore(store)}
              className="bg-white rounded-2xl border border-[#E5E7EB] shadow-2xs overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all cursor-pointer flex flex-col justify-between group"
            >
              <div className="p-6">
                {/* Header Info */}
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h4 className="text-lg font-extrabold text-[#191c1e] group-hover:text-[#28268d] transition-colors">
                      {store.name}
                    </h4>
                    <p className="text-[11px] text-[#6B7280] font-mono mt-0.5">ID: {store.storeCode}</p>
                  </div>
                  <span className={`flex items-center gap-1.5 text-[10px] font-extrabold px-2.5 py-1 rounded-full uppercase tracking-wider ${
                    store.status === 'Active'
                      ? 'bg-[#16A34A]/10 text-[#16A34A]'
                      : 'bg-[#F59E0B]/10 text-[#F59E0B]'
                  }`}>
                    <span className={`w-1.5 h-1.5 rounded-full ${store.status === 'Active' ? 'bg-[#16A34A]' : 'bg-[#F59E0B]'}`} />
                    {store.status}
                  </span>
                </div>

                {/* Address & Manager */}
                <div className="space-y-2 mb-6 text-xs text-[#575e70] font-medium">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-[#6B7280] shrink-0" />
                    <span className="truncate">{store.address}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="w-4 h-4 text-[#6B7280] shrink-0" />
                    <span>Manager: <strong className="text-[#191c1e]">{store.manager}</strong></span>
                  </div>
                </div>

                {/* 3 Metrics Row */}
                <div className="grid grid-cols-3 gap-4 py-4 border-t border-[#E5E7EB]">
                  <div>
                    <p className="text-[10px] text-[#6B7280] uppercase font-extrabold tracking-wider">CAMERAS</p>
                    <p className="text-sm font-extrabold text-[#191c1e]">{store.camerasTotal}</p>
                  </div>
                  <div>
                    <p className="text-[10px] text-[#6B7280] uppercase font-extrabold tracking-wider">OCCUPANCY</p>
                    <p className="text-sm font-extrabold text-[#191c1e]">{store.occupancy}</p>
                  </div>
                  <div>
                    <p className="text-[10px] text-[#6B7280] uppercase font-extrabold tracking-wider">UPDATED</p>
                    <p className="text-xs font-semibold text-[#575e70]">{store.updatedTime}</p>
                  </div>
                </div>

                {/* Visitors Progress Bar */}
                <div className="mt-4 space-y-2.5">
                  <div className="w-full bg-[#f7f9fb] rounded-xl p-3 border border-[#E5E7EB]">
                    <div className="flex justify-between items-center mb-1.5">
                      <span className="text-xs text-[#6B7280] font-semibold">Visitors Today</span>
                      <span className="text-xs font-bold text-[#191c1e]">{store.visitorsToday.toLocaleString()}</span>
                    </div>
                    <div className="w-full bg-[#e0e3e5] h-1.5 rounded-full overflow-hidden">
                      <div
                        className="bg-[#28268d] h-full rounded-full transition-all"
                        style={{ width: `${Math.min(100, (store.visitorsToday / store.visitorsTarget) * 100)}%` }}
                      />
                    </div>
                  </div>

                  {/* Camera & Alert Status */}
                  <div className="flex justify-between text-xs px-1">
                    <span className="flex items-center gap-1.5 text-[#16A34A] font-bold">
                      <Video className="w-3.5 h-3.5" /> {store.camerasOnline}/{store.camerasTotal} Online
                    </span>
                    <span className="flex items-center gap-1.5 text-[#6B7280] font-semibold">
                      <AlertCircle className="w-3.5 h-3.5" /> {store.alertsCount} Alerts
                    </span>
                  </div>
                </div>
              </div>

              {/* Bottom Action Footer */}
              <div className="flex border-t border-[#E5E7EB] bg-[#f7f9fb]">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedStore(store);
                  }}
                  className="flex-1 py-3 text-xs font-bold text-[#28268d] hover:bg-[#d9dff5]/50 transition-colors cursor-pointer text-center"
                >
                  View Details
                </button>
                <div className="w-px bg-[#E5E7EB]" />
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    alert(`Editing store settings for ${store.name}...`);
                  }}
                  className="flex-1 py-3 text-xs font-bold text-[#575e70] hover:bg-[#e0e3e5] transition-colors cursor-pointer text-center"
                >
                  Edit Store
                </button>
              </div>
            </div>
          ))
        )}
      </section>

      {/* STORE DETAILS RIGHT DRAWER */}
      {selectedStore && (
        <aside className="fixed top-0 right-0 h-screen w-full sm:w-[460px] bg-white shadow-2xl z-50 border-l border-[#E5E7EB] flex flex-col justify-between overflow-y-auto animate-in slide-in-from-right duration-300">
          <div>
            {/* Drawer Header */}
            <div className="p-6 border-b border-[#E5E7EB] flex items-center justify-between sticky top-0 bg-white/95 backdrop-blur-md z-10">
              <h3 className="text-lg font-extrabold text-[#28268d]">Store Details</h3>
              <button
                onClick={() => setSelectedStore(null)}
                className="p-1.5 hover:bg-[#f2f4f6] text-[#6B7280] rounded-xl transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Drawer Body Content */}
            <div className="p-6 space-y-6">
              {/* Header Info */}
              <div>
                <div className="flex items-center gap-4 mb-3">
                  <div className="w-14 h-14 bg-[#e1dfff] rounded-2xl flex items-center justify-center shrink-0 text-[#28268d]">
                    <Store className="w-7 h-7" />
                  </div>
                  <div>
                    <h4 className="text-xl font-extrabold text-[#191c1e] leading-snug">{selectedStore.name}</h4>
                    <span className="text-xs text-[#6B7280] font-semibold">{selectedStore.address} • {selectedStore.storeCode}</span>
                  </div>
                </div>

                <div className="flex gap-2">
                  <span className="px-3 py-1 bg-[#16A34A]/10 text-[#16A34A] rounded-full text-[10px] font-extrabold uppercase tracking-wider">
                    {selectedStore.status}
                  </span>
                  <span className="px-3 py-1 bg-[#f2f4f6] text-[#575e70] rounded-full text-[10px] font-extrabold uppercase tracking-wider">
                    REGION: {selectedStore.region}
                  </span>
                </div>
              </div>

              {/* Management Box */}
              <div className="bg-[#f7f9fb] rounded-2xl p-5 border border-[#E5E7EB] space-y-4">
                <h5 className="text-[11px] font-extrabold text-[#6B7280] uppercase tracking-wider">Store Management</h5>
                
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-full bg-[#28268d] text-white flex items-center justify-center font-extrabold text-xs shrink-0">
                    {selectedStore.managerInitials}
                  </div>
                  <div className="flex-1 overflow-hidden">
                    <p className="text-xs font-bold text-[#191c1e]">{selectedStore.manager}</p>
                    <p className="text-[11px] text-[#6B7280] font-medium">{selectedStore.managerRole}</p>
                  </div>
                  <a
                    href={`mailto:${selectedStore.managerEmail}`}
                    className="p-2.5 rounded-full bg-white border border-[#E5E7EB] text-[#28268d] hover:shadow-md transition-all shrink-0 cursor-pointer"
                    title="Email Manager"
                  >
                    <Mail className="w-4 h-4" />
                  </a>
                </div>

                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div className="bg-white rounded-xl p-3 border border-[#E5E7EB]">
                    <p className="text-[10px] text-[#6B7280] font-bold uppercase mb-0.5">Operating Hours</p>
                    <p className="font-bold text-[#191c1e]">{selectedStore.hours}</p>
                  </div>
                  <div className="bg-white rounded-xl p-3 border border-[#E5E7EB]">
                    <p className="text-[10px] text-[#6B7280] font-bold uppercase mb-0.5">Direct Phone</p>
                    <p className="font-bold text-[#191c1e]">{selectedStore.phone}</p>
                  </div>
                </div>
              </div>

              {/* Activity Timeline */}
              <div className="space-y-4">
                <h5 className="text-[11px] font-extrabold text-[#6B7280] uppercase tracking-wider">
                  Recent Activity Timeline
                </h5>

                <div className="space-y-4 relative before:absolute before:left-2.5 before:top-2 before:bottom-2 before:w-0.5 before:bg-[#E5E7EB]">
                  {selectedStore.recentActivity.map((act) => (
                    <div key={act.id} className="relative pl-8 text-xs">
                      <div
                        className={`absolute left-0 top-1 w-5 h-5 rounded-full ring-4 ring-white ${
                          act.type === 'success'
                            ? 'bg-[#16A34A]'
                            : act.type === 'warning'
                            ? 'bg-[#F59E0B]'
                            : 'bg-[#28268d]'
                        }`}
                      />
                      <p className="font-bold text-[#191c1e]">{act.title}</p>
                      <p className="text-[#6B7280] font-medium mt-0.5">{act.description}</p>
                      <p className="text-[10px] text-[#6B7280] mt-1 font-bold uppercase">{act.time}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Map GPS Visual Box */}
              <div className="h-44 rounded-2xl border border-[#E5E7EB] overflow-hidden relative group">
                <img
                  src={selectedStore.mapImage}
                  alt={selectedStore.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                <div className="absolute bottom-3 left-3 bg-white/90 backdrop-blur-md px-3 py-1.5 rounded-xl shadow-md flex items-center gap-2 text-xs font-bold text-[#191c1e]">
                  <Compass className="w-4 h-4 text-[#28268d]" />
                  <span>{selectedStore.gpsCoordinates}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Drawer Bottom Actions */}
          <div className="p-6 border-t border-[#E5E7EB] bg-white sticky bottom-0 flex gap-3">
            <button
              onClick={() => {
                window.location.hash = 'live-monitoring';
                setSelectedStore(null);
              }}
              className="flex-1 py-3 rounded-xl bg-[#28268d] hover:bg-[#4040a5] text-white font-bold text-xs shadow-md transition-all cursor-pointer text-center"
            >
              Go to Live View
            </button>
            <button
              onClick={() => {
                window.location.hash = 'reports';
                setSelectedStore(null);
              }}
              className="px-5 py-3 rounded-xl border border-[#E5E7EB] text-[#191c1e] hover:bg-[#f7f9fb] font-bold text-xs transition-all cursor-pointer text-center"
            >
              Reports
            </button>
          </div>
        </aside>
      )}

      {/* ADD NEW STORE MODAL */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="bg-white w-full max-w-lg rounded-2xl shadow-2xl border border-[#E5E7EB] overflow-hidden">
            <div className="p-6 border-b border-[#E5E7EB] flex items-center justify-between bg-[#f7f9fb]">
              <div className="flex items-center gap-2.5">
                <div className="p-2 bg-[#28268d] text-white rounded-xl">
                  <Store className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-extrabold text-[#191c1e]">Connect New Retail Store</h3>
                  <p className="text-xs text-[#6B7280] font-medium">Provision new CCTV camera telemetry node.</p>
                </div>
              </div>
              <button
                onClick={() => setIsAddModalOpen(false)}
                className="p-1.5 hover:bg-[#e0e3e5] text-[#6B7280] rounded-lg transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddStoreSubmit} className="p-6 space-y-4">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-[#191c1e]">Store Location Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. SoHo Flagship Boutique"
                  value={newStoreName}
                  onChange={(e) => setNewStoreName(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-[#f7f9fb] border border-[#E5E7EB] rounded-xl text-xs font-semibold text-[#191c1e] focus:outline-none focus:ring-2 focus:ring-[#28268d]"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-[#191c1e]">Store Code</label>
                  <input
                    type="text"
                    placeholder="e.g. ST-013"
                    value={newStoreCode}
                    onChange={(e) => setNewStoreCode(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-[#f7f9fb] border border-[#E5E7EB] rounded-xl text-xs font-semibold text-[#191c1e] focus:outline-none focus:ring-2 focus:ring-[#28268d]"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-[#191c1e]">Region</label>
                  <select
                    value={newStoreRegion}
                    onChange={(e) => setNewStoreRegion(e.target.value as any)}
                    className="w-full px-3.5 py-2.5 bg-[#f7f9fb] border border-[#E5E7EB] rounded-xl text-xs font-semibold text-[#191c1e] focus:outline-none focus:ring-2 focus:ring-[#28268d]"
                  >
                    <option>North America</option>
                    <option>Europe</option>
                    <option>Asia-Pacific</option>
                  </select>
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-[#191c1e]">Street Address</label>
                <input
                  type="text"
                  placeholder="e.g. 560 Broadway, New York, NY 10012"
                  value={newStoreAddress}
                  onChange={(e) => setNewStoreAddress(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-[#f7f9fb] border border-[#E5E7EB] rounded-xl text-xs font-semibold text-[#191c1e] focus:outline-none focus:ring-2 focus:ring-[#28268d]"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-[#191c1e]">Assigned Manager</label>
                <input
                  type="text"
                  placeholder="e.g. Rachel Adams"
                  value={newStoreManager}
                  onChange={(e) => setNewStoreManager(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-[#f7f9fb] border border-[#E5E7EB] rounded-xl text-xs font-semibold text-[#191c1e] focus:outline-none focus:ring-2 focus:ring-[#28268d]"
                />
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
                  Register Store Node
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
