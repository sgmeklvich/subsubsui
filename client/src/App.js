import React, { useState, useEffect } from 'react';
import { 
  Layers, Store, Users, Package, ShieldCheck, ShoppingCart, 
  Sparkles, Search, ArrowDown, Users2, Mail, X, Share2, 
  TrendingUp, TrendingDown, DollarSign, Repeat, CheckCircle2, 
  CheckCircle, Clock, Info, MousePointerClick, ShoppingBag, 
  Lock, Plus, Edit3, Trash2, Bell, Leaf, AlertTriangle, Shield, Truck, User
} from 'lucide-react';

export default function App() {
  const [currentTab, setcurrentTab] = useState('home');
  const [loadingState, setloadingState] = useState(false);
  const [cartOpen, setcartOpen] = useState(false);
  const [productSearch, setproductSearch] = useState('');
  const [productStatusFilter, setproductStatusFilter] = useState('all');
  const [productSortBy, setproductSortBy] = useState('title-asc');
  const [selectedRecord, setselectedRecord] = useState(null);

  // Toast notifications array
  const [toasts, setToasts] = useState([]);
  
  // Confirmation Modal state
  const [confirmModal, setConfirmModal] = useState({
    open: false,
    title: '',
    message: '',
    onConfirm: () => {}
  });

  // Product Form Modal state
  const [productModal, setProductModal] = useState({
    open: false,
    isEdit: false,
    form: {
      id: null,
      title: '',
      price: 49,
      carbonSaved: '120 kg CO₂/mo',
      supplier: '',
      description: '',
      media: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=800&auto=format&fit=crop&q=60',
      status: 'active',
      promotion: true,
      aboutSupplier: '',
      validTill: '2026-12-31'
    }
  });

  // Subscription Modal state
  const [subscriptionModal, setSubscriptionModal] = useState({
    open: false,
    form: {
      productId: '',
      frequency: '4 weeks',
      memberEmail: 'alex.morgan@example.com'
    }
  });

  // Current User profile
  const [currentUser, setCurrentUser] = useState({
    id: 'usr-001',
    title: 'Mr',
    status: 'active',
    role: 3, // 1: Admin, 2: Supplier, 3: Customer
    firstName: 'Alex',
    lastName: 'Morgan',
    email: 'alex.morgan@example.com',
    address1: '123 Green Valley Road',
    address2: '#04-12',
    postalCode: 540123,
    tel: 91234567,
    country: 'Singapore',
    createdAt: '2026-01-15'
  });

  // Cart items
  const [cart, setCart] = useState([]);
  const [newMemberEmail, setNewMemberEmail] = useState({});
  const [profileMenu, setProfileMenu] = useState(false);

  // Relational mock data initialization with localStorage persistence
  const [products, setProducts] = useState([
    {
      id: 'prod-1',
      title: 'EcoSolar Home Grid Subscription',
      price: 120,
      carbonSaved: '240 kg CO₂/mo',
      description: 'Clean rooftop solar energy subscription with smart inverter monitoring and zero upfront hardware cost. Split with neighbors.',
      createdAt: '2026-02-01',
      status: 'active',
      supplier: 'SunPower SG',
      aboutSupplier: 'Leading renewable energy provider in Southeast Asia specializing in decentralized urban solar grids.',
      media: 'https://images.unsplash.com/photo-1509391365360-b184f33b1e32?w=800&auto=format&fit=crop&q=60',
      promotion: true,
      validTill: '2026-12-31',
      validFrom: '2026-01-01'
    },
    {
      id: 'prod-2',
      title: 'Organic Farm-to-Table Veggie Box',
      price: 65,
      carbonSaved: '85 kg CO₂/mo',
      description: 'Weekly delivery of pesticide-free local greens and hydroponic vegetables grown sustainably in urban rooftops.',
      createdAt: '2026-02-10',
      status: 'active',
      supplier: 'Verdant Urban Farms',
      aboutSupplier: 'Pioneering closed-loop urban agriculture reducing food miles and carbon emissions.',
      media: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?w=800&auto=format&fit=crop&q=60',
      promotion: false,
      validTill: '2026-11-30',
      validFrom: '2026-02-01'
    },
    {
      id: 'prod-3',
      title: 'Zero-Waste Household Refill Service',
      price: 40,
      carbonSaved: '50 kg CO₂/mo',
      description: 'Monthly doorstep refill for eco-friendly laundry detergents, dish soaps, and natural surface cleaners in glass jars.',
      createdAt: '2026-02-15',
      status: 'active',
      supplier: 'LoopCycle Goods',
      aboutSupplier: 'Eliminating single-use plastics through circular economy logistics and biodegradable formulas.',
      media: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=800&auto=format&fit=crop&q=60',
      promotion: true,
      validTill: '2026-12-31',
      validFrom: '2026-02-01'
    }
  ]);

  const [subscriptions, setSubscriptions] = useState([
    {
      id: 'sub-101',
      creatorId: 'usr-001',
      createdAt: '2026-02-20',
      productId: 'prod-1',
      members: ['alex.morgan@example.com', 'sarah.connor@example.com', 'john.doe@example.com'],
      status: 'active',
      frequency: '4 weeks',
      averageCost: 120
    },
    {
      id: 'sub-102',
      creatorId: 'usr-001',
      createdAt: '2026-02-25',
      productId: 'prod-2',
      members: ['alex.morgan@example.com', 'emma.watson@example.com'],
      status: 'active',
      frequency: '2 weeks',
      averageCost: 65
    }
  ]);

  useEffect(() => {
    const savedProducts = localStorage.getItem('subsubsui_products');
    const savedSubs = localStorage.getItem('subsubsui_subscriptions');
    const savedCart = localStorage.getItem('subsubsui_cart');

    if (savedProducts) setProducts(JSON.parse(savedProducts));
    if (savedSubs) setSubscriptions(JSON.parse(savedSubs));
    if (savedCart) setCart(JSON.parse(savedCart));
  }, []);

  const persistData = (newProds, newSubs, newCart) => {
    if (newProds) localStorage.setItem('subsubsui_products', JSON.stringify(newProds));
    if (newSubs) localStorage.setItem('subsubsui_subscriptions', JSON.stringify(newSubs));
    if (newCart) localStorage.setItem('subsubsui_cart', JSON.stringify(newCart));
  };

  const showToast = (message, type = 'success') => {
    const id = Date.now();
    setToasts(prev => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 4000);
  };

  const switchRole = (roleId) => {
    setCurrentUser(prev => ({ ...prev, role: roleId }));
    const roleNames = { 1: 'Admin', 2: 'Supplier', 3: 'Customer' };
    showToast(`Switched view to ${roleNames[roleId]} role.`);
  };

  const filteredProducts = () => {
    let result = [...products];

    if (productSearch.trim() !== '') {
      const q = productSearch.toLowerCase();
      result = result.filter(p => 
        p.title.toLowerCase().includes(q) || 
        p.supplier.toLowerCase().includes(q) || 
        p.description.toLowerCase().includes(q)
      );
    }

    if (productStatusFilter !== 'all') {
      result = result.filter(p => p.status === productStatusFilter);
    }

    result.sort((a, b) => {
      if (productSortBy === 'title-asc') return a.title.localeCompare(b.title);
      if (productSortBy === 'title-desc') return b.title.localeCompare(a.title);
      if (productSortBy === 'price-asc') return a.price - b.price;
      if (productSortBy === 'price-desc') return b.price - a.price;
      return 0;
    });

    return result;
  };

  const cartSubtotal = cart.reduce((sum, item) => sum + (item.price * item.qty), 0);
  const cartTax = cartSubtotal * 0.09;
  const cartShipping = cart.length > 0 ? 5.00 : 0;
  const cartTotal = cartSubtotal + cartTax + cartShipping;

  const addToCart = (product) => {
    let updatedCart;
    const existing = cart.find(item => item.id === product.id);
    if (existing) {
      updatedCart = cart.map(item => item.id === product.id ? { ...item, qty: item.qty + 1 } : item);
    } else {
      updatedCart = [...cart, { ...product, qty: 1 }];
    }
    setCart(updatedCart);
    persistData(null, null, updatedCart);
    showToast(`Added "${product.title}" to cart.`);
  };

  const removeFromCart = (index) => {
    const updatedCart = cart.filter((_, i) => i !== index);
    setCart(updatedCart);
    persistData(null, null, updatedCart);
    showToast('Removed item from cart.', 'info');
  };

  const incrementCartQty = (index) => {
    const updatedCart = cart.map((item, i) => i === index ? { ...item, qty: item.qty + 1 } : item);
    setCart(updatedCart);
    persistData(null, null, updatedCart);
  };

  const decrementCartQty = (index) => {
    let updatedCart;
    if (cart[index].qty > 1) {
      updatedCart = cart.map((item, i) => i === index ? { ...item, qty: item.qty - 1 } : item);
    } else {
      updatedCart = cart.filter((_, i) => i !== index);
    }
    setCart(updatedCart);
    persistData(null, null, updatedCart);
  };

  const mockCheckout = () => {
    showToast('Payment successful! Subscription and split group activated.');
    setCart([]);
    setcartOpen(false);
    persistData(null, null, []);
  };

  const isProductFormValid = 
    productModal.form.title.trim() !== '' && 
    productModal.form.description.trim() !== '' && 
    productModal.form.supplier.trim() !== '' &&
    productModal.form.carbonSaved.trim() !== '';

  const openProductModal = () => {
    setProductModal({
      open: true,
      isEdit: false,
      form: {
        id: 'prod-' + Date.now(),
        title: '',
        price: 50,
        carbonSaved: '100 kg CO₂/mo',
        supplier: '',
        description: '',
        media: 'https://images.unsplash.com/photo-1497435334941-8c899ee9e8e9?w=800&auto=format&fit=crop&q=60',
        status: 'active',
        promotion: false,
        aboutSupplier: 'Verified sustainable enterprise.',
        validTill: '2026-12-31'
      }
    });
  };

  const editProduct = (product) => {
    setProductModal({
      open: true,
      isEdit: true,
      form: { ...product }
    });
  };

  const saveProductRecord = () => {
    if (!isProductFormValid) return;

    let updatedProducts;
    if (productModal.isEdit) {
      updatedProducts = products.map(p => p.id === productModal.form.id ? { ...productModal.form } : p);
      showToast('Product record successfully updated.');
    } else {
      const newProd = { ...productModal.form, createdAt: new Date().toISOString().split('T')[0] };
      updatedProducts = [newProd, ...products];
      showToast('New product record successfully created.');
    }

    setProducts(updatedProducts);
    persistData(updatedProducts, null, null);
    setProductModal(prev => ({ ...prev, open: false }));
  };

  const confirmDeleteProduct = (productId) => {
    setConfirmModal({
      open: true,
      title: 'Delete Product Record',
      message: 'Are you sure you want to permanently delete this product? Associated subscriptions may be affected.',
      onConfirm: () => {
        const updatedProducts = products.filter(p => p.id !== productId);
        setProducts(updatedProducts);
        if (selectedRecord && selectedRecord.id === productId) {
          setselectedRecord(null);
        }
        persistData(updatedProducts, null, null);
        showToast('Product record permanently deleted.', 'info');
      }
    });
  };

  const getProductName = (productId) => {
    const p = products.find(item => item.id === productId);
    return p ? p.title : 'Custom Subscription';
  };

  const createSubscriptionFromProduct = (product) => {
    setSubscriptionModal({
      open: true,
      form: {
        productId: product.id,
        frequency: '4 weeks',
        memberEmail: 'alex.morgan@example.com'
      }
    });
  };

  const openSubscriptionModal = () => {
    setSubscriptionModal({
      open: true,
      form: {
        productId: products.length > 0 ? products[0].id : '',
        frequency: '4 weeks',
        memberEmail: 'alex.morgan@example.com'
      }
    });
  };

  const saveSubscriptionRecord = () => {
    const newSub = {
      id: 'sub-' + Date.now(),
      creatorId: currentUser.id,
      createdAt: new Date().toISOString().split('T')[0],
      productId: subscriptionModal.form.productId,
      members: [subscriptionModal.form.memberEmail, currentUser.email],
      status: 'active',
      frequency: subscriptionModal.form.frequency,
      averageCost: 100
    };
    const updatedSubs = [newSub, ...subscriptions];
    setSubscriptions(updatedSubs);
    persistData(null, updatedSubs, null);
    setSubscriptionModal(prev => ({ ...prev, open: false }));
    showToast('Split subscription group successfully created.');
  };

  const addMemberToSub = (subId) => {
    const email = newMemberEmail[subId];
    if (!email || !email.includes('@')) {
      showToast('Please enter a valid email address.', 'error');
      return;
    }
    const updatedSubs = subscriptions.map(sub => {
      if (sub.id === subId) {
        if (!sub.members.includes(email)) {
          showToast(`Added ${email} to split group.`);
          return { ...sub, members: [...sub.members, email] };
        } else {
          showToast('Email is already in this group.', 'info');
        }
      }
      return sub;
    });
    setNewMemberEmail(prev => ({ ...prev, [subId]: '' }));
    setSubscriptions(updatedSubs);
    persistData(null, updatedSubs, null);
  };

  const removeMemberFromSub = (subId, memberIndex) => {
    const updatedSubs = subscriptions.map(sub => {
      if (sub.id === subId) {
        if (sub.members.length > 1) {
          showToast('Member removed from split group.', 'info');
          const newMembers = [...sub.members];
          newMembers.splice(memberIndex, 1);
          return { ...sub, members: newMembers };
        } else {
          showToast('Group must retain at least one member.', 'error');
        }
      }
      return sub;
    });
    setSubscriptions(updatedSubs);
    persistData(null, updatedSubs, null);
  };

  const shareSubLink = (subId) => {
    const inviteLink = `https://subsubsui.app/join/${subId}`;
    navigator.clipboard.writeText(inviteLink).then(() => {
      showToast('Invite link copied to clipboard!');
    });
  };

  const confirmDeleteSubscription = (subId) => {
    setConfirmModal({
      open: true,
      title: 'Cancel Subscription Group',
      message: 'Are you sure you want to delete this subscription group? All cost-sharing arrangements will be cancelled.',
      onConfirm: () => {
        const updatedSubs = subscriptions.filter(s => s.id !== subId);
        setSubscriptions(updatedSubs);
        persistData(null, updatedSubs, null);
        showToast('Subscription group cancelled successfully.', 'info');
      }
    });
  };

  const toggleSubStatus = (subId) => {
    const updatedSubs = subscriptions.map(sub => {
      if (sub.id === subId) {
        const newStatus = sub.status === 'active' ? 'pending' : 'active';
        showToast(`Subscription status updated to ${newStatus}.`);
        return { ...sub, status: newStatus };
      }
      return sub;
    });
    setSubscriptions(updatedSubs);
    persistData(null, updatedSubs, null);
  };

  const triggerSupplierAlert = () => {
    showToast('Email alert triggers successfully configured for order updates.');
  };

  return (
    <div className="bg-slate-950 text-slate-100 font-sans antialiased min-h-screen selection:bg-emerald-500 selection:text-slate-950">
      
      {/* Toast Notification Container */}
      <div aria-live="polite" className="fixed bottom-5 right-5 z-50 flex flex-col space-y-3 pointer-events-none">
        {toasts.map(toast => (
          <div key={toast.id} className="pointer-events-auto flex items-center space-x-3 bg-slate-900 border border-slate-800 px-4 py-3 rounded-xl shadow-2xl transition-all duration-300 transform translate-y-0">
            <span className={`w-2.5 h-2.5 rounded-full ${toast.type === 'success' ? 'bg-emerald-500 animate-pulse' : 'bg-rose-500'}`}></span>
            <p className="text-sm font-medium text-slate-200">{toast.message}</p>
          </div>
        ))}
      </div>

      {/* Confirmation Modal Dialog */}
      {confirmModal.open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 backdrop-blur-sm p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-md w-full p-6 shadow-2xl space-y-4" onClick={e => e.stopPropagation()}>
            <div className="flex items-center space-x-3 text-rose-400">
              <div className="p-3 bg-rose-500/10 rounded-xl">
                <AlertTriangle className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-100">{confirmModal.title}</h3>
            </div>
            <p className="text-sm text-slate-400">{confirmModal.message}</p>
            <div className="flex justify-end space-x-3 pt-2">
              <button onClick={() => setConfirmModal(prev => ({ ...prev, open: false }))} className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 text-sm font-medium rounded-xl transition-colors">Cancel</button>
              <button onClick={() => { confirmModal.onConfirm(); setConfirmModal(prev => ({ ...prev, open: false })); }} className="px-4 py-2 bg-rose-600 hover:bg-rose-500 text-white text-sm font-medium rounded-xl transition-colors shadow-lg shadow-rose-600/20">Delete Item</button>
            </div>
          </div>
        </div>
      )}

      {/* Header Navigation */}
      <header className="sticky top-0 z-40 bg-slate-900/90 backdrop-blur-md border-b border-slate-800 px-4 lg:px-8 h-16 flex items-center justify-between">
        <div className="flex items-center space-x-6">
          <div className="flex items-center space-x-3 cursor-pointer" onClick={() => setcurrentTab('home')}>
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-600 to-teal-400 flex items-center justify-center shadow-lg shadow-emerald-500/20">
              <Layers className="w-5 h-5 text-slate-950" />
            </div>
            <div>
              <span className="text-lg font-black tracking-tight bg-gradient-to-r from-slate-100 to-emerald-400 bg-clip-text text-transparent">Subsubsui</span>
              <span className="block text-[10px] uppercase tracking-wider text-emerald-400 font-semibold">Shared Eco Subscriptions</span>
            </div>
          </div>

          <nav className="hidden md:flex items-center space-x-1 bg-slate-950/60 p-1 rounded-xl border border-slate-800/80">
            <button onClick={() => setcurrentTab('home')} 
                    className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center space-x-1.5 ${currentTab === 'home' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 shadow-sm' : 'text-slate-400 hover:text-slate-200'}`}>
              <Store className="w-3.5 h-3.5" />
              <span>Marketplace</span>
            </button>
            <button onClick={() => setcurrentTab('customer')} 
                    className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center space-x-1.5 ${currentTab === 'customer' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 shadow-sm' : 'text-slate-400 hover:text-slate-200'}`}>
              <Users className="w-3.5 h-3.5" />
              <span>Customer Portal</span>
            </button>
            <button onClick={() => setcurrentTab('supplier')} 
                    className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center space-x-1.5 ${currentTab === 'supplier' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 shadow-sm' : 'text-slate-400 hover:text-slate-200'}`}>
              <Package className="w-3.5 h-3.5" />
              <span>Supplier Dashboard</span>
            </button>
            <button onClick={() => setcurrentTab('admin')} 
                    className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center space-x-1.5 ${currentTab === 'admin' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 shadow-sm' : 'text-slate-400 hover:text-slate-200'}`}>
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Admin Control</span>
            </button>
          </nav>
        </div>

        <div className="flex items-center space-x-3">
          <button onClick={() => setcartOpen(true)} className="relative p-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors border border-slate-700">
            <ShoppingCart className="w-5 h-5" />
            {cart.length > 0 && (
              <span className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-emerald-500 text-slate-950 font-bold text-[10px] rounded-full flex items-center justify-center shadow-md animate-bounce">
                {cart.length}
              </span>
            )}
          </button>

          <div className="relative">
            <button onClick={() => setProfileMenu(!profileMenu)} className="flex items-center space-x-2.5 p-1.5 pl-3 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 transition-colors">
              <div className="text-left hidden sm:block">
                <span className="block text-xs font-bold text-slate-200">{currentUser.firstName + ' ' + currentUser.lastName}</span>
                <span className="block text-[10px] text-emerald-400 capitalize">{currentUser.role === 1 ? 'Admin' : (currentUser.role === 2 ? 'Supplier' : 'Customer')}</span>
              </div>
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-emerald-500 to-teal-700 flex items-center justify-center text-slate-950 font-black text-xs shadow-inner">
                <span>{currentUser.firstName.charAt(0) + currentUser.lastName.charAt(0)}</span>
              </div>
            </button>
            
            {profileMenu && (
              <div className="absolute right-0 mt-2 w-56 bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl py-2 z-50">
                <div className="px-4 py-2 border-b border-slate-800">
                  <p className="text-xs text-slate-400">Signed in as</p>
                  <p className="text-sm font-semibold text-slate-200 truncate">{currentUser.email}</p>
                </div>
                <div className="py-1">
                  <button onClick={() => { setcurrentTab('customer'); setProfileMenu(false); }} className="w-full text-left px-4 py-2 text-xs text-slate-300 hover:bg-slate-800/80 flex items-center space-x-2">
                    <User className="w-3.5 h-3.5 text-emerald-400" />
                    <span>My Profile & Subscriptions</span>
                  </button>
                  <button onClick={() => { switchRole(1); setProfileMenu(false); }} className="w-full text-left px-4 py-2 text-xs text-slate-300 hover:bg-slate-800/80 flex items-center space-x-2">
                    <Shield className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Switch to Admin Role</span>
                  </button>
                  <button onClick={() => { switchRole(2); setProfileMenu(false); }} className="w-full text-left px-4 py-2 text-xs text-slate-300 hover:bg-slate-800/80 flex items-center space-x-2">
                    <Truck className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Switch to Supplier Role</span>
                  </button>
                  <button onClick={() => { switchRole(3); setProfileMenu(false); }} className="w-full text-left px-4 py-2 text-xs text-slate-300 hover:bg-slate-800/80 flex items-center space-x-2">
                    <Users className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Switch to Customer Role</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Mobile Navigation Bar */}
      <div className="md:hidden flex items-center justify-around bg-slate-900 border-b border-slate-800 p-2 sticky top-16 z-30">
        <button onClick={() => setcurrentTab('home')} className={`flex flex-col items-center text-[10px] font-semibold ${currentTab === 'home' ? 'text-emerald-400' : 'text-slate-400'}`}>
          <Store className="w-5 h-5 mb-1" />Market
        </button>
        <button onClick={() => setcurrentTab('customer')} className={`flex flex-col items-center text-[10px] font-semibold ${currentTab === 'customer' ? 'text-emerald-400' : 'text-slate-400'}`}>
          <Users className="w-5 h-5 mb-1" />Customer
        </button>
        <button onClick={() => setcurrentTab('supplier')} className={`flex flex-col items-center text-[10px] font-semibold ${currentTab === 'supplier' ? 'text-emerald-400' : 'text-slate-400'}`}>
          <Package className="w-5 h-5 mb-1" />Supplier
        </button>
        <button onClick={() => setcurrentTab('admin')} className={`flex flex-col items-center text-[10px] font-semibold ${currentTab === 'admin' ? 'text-emerald-400' : 'text-slate-400'}`}>
          <ShieldCheck className="w-5 h-5 mb-1" />Admin
        </button>
      </div>

      {/* Main Content Views Container */}
      <main className="max-w-7xl mx-auto px-4 lg:px-8 py-8">

        {/* ==================== VIEW 1: USER HOMEPAGE (MARKETPLACE) ==================== */}
        {currentTab === 'home' && (
          <div className="space-y-8">
            <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-emerald-950 via-slate-900 to-slate-900 border border-emerald-500/20 p-8 lg:p-12 shadow-2xl">
              <div className="absolute right-0 top-0 translate-x-12 -translate-y-12 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none"></div>
              <div className="relative z-10 max-w-2xl space-y-4">
                <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-bold uppercase tracking-wider">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Eco-Friendly Subscriptions & Group Splitting</span>
                </div>
                <h1 className="text-3xl lg:text-5xl font-black text-slate-100 tracking-tight leading-tight">
                  Subscribe Together. <span className="text-emerald-400">Save More, Waste Less.</span>
                </h1>
                <p className="text-slate-300 text-sm lg:text-base leading-relaxed">
                  Discover premium sustainable products, services, and green utilities. Split costs equally with friends or community members effortlessly.
                </p>
                <div className="pt-2 flex flex-wrap gap-4">
                  <a href="#products-grid" className="px-6 py-3 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-sm rounded-xl shadow-lg shadow-emerald-500/20 transition-all flex items-center space-x-2">
                    <span>Browse Subscriptions</span>
                    <ArrowDown className="w-4 h-4" />
                  </a>
                  <button onClick={() => setcurrentTab('customer')} className="px-6 py-3 bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-sm rounded-xl border border-slate-700 transition-all">
                    Manage My Groups
                  </button>
                </div>
              </div>
            </div>

            <div id="products-grid" className="space-y-6">
              <div className="flex flex-col md:flex-row items-center justify-between gap-4 bg-slate-900/60 p-4 rounded-2xl border border-slate-800 backdrop-blur-sm">
                <div className="relative w-full md:w-96">
                  <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input type="text" value={productSearch} onChange={e => setproductSearch(e.target.value)} placeholder="Search products, suppliers, or categories..." 
                         className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-10 pr-4 py-2.5 text-sm text-slate-200 focus:outline-none focus:border-emerald-500 transition-colors" />
                </div>

                <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
                  <select value={productStatusFilter} onChange={e => setproductStatusFilter(e.target.value)} className="bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-slate-300 focus:outline-none focus:border-emerald-500">
                    <option value="all">All Statuses</option>
                    <option value="active">Active</option>
                    <option value="draft">Draft / Coming Soon</option>
                  </select>

                  <select value={productSortBy} onChange={e => setproductSortBy(e.target.value)} className="bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-slate-300 focus:outline-none focus:border-emerald-500">
                    <option value="title-asc">Title (A-Z)</option>
                    <option value="title-desc">Title (Z-A)</option>
                    <option value="price-asc">Price: Low to High</option>
                    <option value="price-desc">Price: High to Low</option>
                  </select>
                </div>
              </div>

              {loadingState && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {[1, 2, 3].map(i => (
                    <div key={i} className="bg-slate-900 border border-slate-800 rounded-3xl p-5 space-y-4 animate-pulse">
                      <div className="w-full h-48 bg-slate-800 rounded-2xl"></div>
                      <div className="h-6 bg-slate-800 rounded-lg w-3/4"></div>
                      <div className="h-4 bg-slate-800 rounded-lg w-1/2"></div>
                      <div className="flex justify-between pt-4">
                        <div className="h-10 bg-slate-800 rounded-xl w-1/3"></div>
                        <div className="h-10 bg-slate-800 rounded-xl w-1/2"></div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {!loadingState && filteredProducts().length > 0 && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredProducts().map(product => (
                    <div key={product.id} className="bg-slate-900 border border-slate-800 hover:border-emerald-500/40 rounded-3xl overflow-hidden shadow-xl transition-all duration-300 flex flex-col justify-between group">
                      <div className="relative h-52 bg-slate-800 overflow-hidden">
                        <img src={product.media} alt={product.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent"></div>
                        
                        {product.promotion && (
                          <span className="absolute top-3 left-3 bg-emerald-500 text-slate-950 font-bold text-[10px] uppercase px-3 py-1 rounded-full shadow-lg">Promo Offer</span>
                        )}

                        <span className="absolute top-3 right-3 bg-slate-950/80 backdrop-blur-md text-slate-200 font-semibold text-xs px-3 py-1 rounded-full border border-slate-700">{product.supplier}</span>
                      </div>

                      <div className="p-6 space-y-4 flex-1 flex flex-col justify-between">
                        <div className="space-y-3">
                          <div className="flex items-center justify-between">
                            <span className="text-xs uppercase tracking-wider text-emerald-400 font-bold">{product.status}</span>
                            <div className="inline-flex items-center space-x-1 px-2.5 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-[11px] font-semibold">
                              <Leaf className="w-3 h-3" />
                              <span>{product.carbonSaved}</span>
                            </div>
                          </div>
                          <h3 className="text-lg font-bold text-slate-100 group-hover:text-emerald-400 transition-colors">{product.title}</h3>
                          <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">{product.description}</p>
                        </div>

                        <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between">
                          <div>
                            <span className="text-[10px] uppercase text-slate-500 block font-semibold">Monthly Price</span>
                            <span className="text-xl font-black text-slate-100">${product.price}/mo</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <button onClick={() => addToCart(product)} className="px-4 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white rounded-xl text-xs font-bold transition-all border border-slate-700 flex items-center space-x-1.5">
                              <ShoppingBag className="w-3.5 h-3.5" />
                              <span>Add to Cart</span>
                            </button>
                            <button onClick={() => createSubscriptionFromProduct(product)} className="px-4 py-2.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 rounded-xl text-xs font-bold transition-all shadow-md shadow-emerald-500/20 flex items-center space-x-1.5">
                              <Users2 className="w-3.5 h-3.5" />
                              <span>Split Group</span>
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {!loadingState && filteredProducts().length === 0 && (
                <div className="text-center py-16 bg-slate-900/40 border border-slate-800 rounded-3xl p-8 space-y-4">
                  <div className="w-16 h-16 bg-emerald-500/10 text-emerald-400 rounded-2xl flex items-center justify-center mx-auto shadow-inner">
                    <Search className="w-8 h-8" />
                  </div>
                  <h3 className="text-lg font-bold text-slate-200">No matching subscriptions found</h3>
                  <p className="text-sm text-slate-400 max-w-md mx-auto">Try adjusting your search query or status filter to find available green products and services.</p>
                  <button onClick={() => { setproductSearch(''); setproductStatusFilter('all'); }} className="px-4 py-2 bg-emerald-500 text-slate-950 rounded-xl text-xs font-bold shadow-lg shadow-emerald-500/20">Reset Filters</button>
                </div>
              )}
            </div>
          </div>
        )}

        {/* ==================== VIEW 2: CUSTOMER PORTAL ==================== */}
        {currentTab === 'customer' && (
          <div className="space-y-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-slate-900 border border-slate-800 p-6 rounded-3xl">
              <div>
                <h1 className="text-2xl font-black text-slate-100">Customer Portal & Split Groups</h1>
                <p className="text-sm text-slate-400">Manage your active subscription groups, invite members, and track cost sharing.</p>
              </div>
              <button onClick={() => openSubscriptionModal()} className="px-5 py-3 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs rounded-xl shadow-lg shadow-emerald-500/20 transition-all flex items-center space-x-2 w-fit">
                <Plus className="w-4 h-4" />
                <span>Create New Subscription</span>
              </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {subscriptions.map(sub => (
                <div key={sub.id} className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-6 shadow-xl flex flex-col justify-between">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${sub.status === 'active' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 'bg-amber-500/10 text-amber-400 border border-amber-500/20'}`}>
                        {sub.status}
                      </span>
                      <span className="text-xs text-slate-400 font-semibold">Frequency: {sub.frequency}</span>
                    </div>

                    <div>
                      <h3 className="text-xl font-bold text-slate-100">{getProductName(sub.productId)}</h3>
                      <p className="text-xs text-slate-400 mt-1">Created on: {sub.createdAt}</p>
                    </div>

                    <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800/80 flex items-center justify-between">
                      <div>
                        <span className="text-[10px] text-slate-500 uppercase font-bold block">Average Cost / Member</span>
                        <span className="text-xl font-black text-emerald-400">${Math.round(sub.averageCost / (sub.members.length || 1))}/mo</span>
                      </div>
                      <div className="text-right">
                        <span className="text-[10px] text-slate-500 uppercase font-bold block">Total Members</span>
                        <span className="text-lg font-bold text-slate-200">{sub.members.length} Members</span>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <span className="text-xs font-semibold text-slate-400">Group Members (Emails):</span>
                      <div className="flex flex-wrap gap-2">
                        {sub.members.map((email, idx) => (
                          <div key={idx} className="inline-flex items-center space-x-1.5 bg-slate-800 border border-slate-700/80 px-3 py-1 rounded-full text-xs text-slate-200">
                            <Mail className="w-3 h-3 text-emerald-400" />
                            <span>{email}</span>
                            <button onClick={() => removeMemberFromSub(sub.id, idx)} className="text-slate-400 hover:text-rose-400 ml-1 transition-colors">
                              <X className="w-3 h-3" />
                            </button>
                          </div>
                        ))}
                      </div>
                      <div className="flex items-center space-x-2 pt-2">
                        <input type="email" value={newMemberEmail[sub.id] || ''} onChange={e => setNewMemberEmail({ ...newMemberEmail, [sub.id]: e.target.value })} placeholder="Add member email..." 
                               className="flex-1 bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-emerald-500" />
                        <button onClick={() => addMemberToSub(sub.id)} className="px-3 py-2 bg-slate-800 hover:bg-slate-700 text-emerald-400 rounded-xl text-xs font-bold transition-colors border border-slate-700">
                          Add
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between">
                    <button onClick={() => shareSubLink(sub.id)} className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl text-xs font-semibold transition-colors flex items-center space-x-1.5 border border-slate-700">
                      <Share2 className="w-3.5 h-3.5" />
                      <span>Share Invite Link</span>
                    </button>
                    <button onClick={() => confirmDeleteSubscription(sub.id)} className="px-3 py-2 bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 rounded-xl text-xs font-semibold transition-colors border border-rose-500/20">
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ==================== VIEW 3: SUPPLIER DASHBOARD ==================== */}
        {currentTab === 'supplier' && (
          <div className="space-y-8">
            <div className="bg-slate-900 border border-slate-800 p-6 rounded-3xl flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <h1 className="text-2xl font-black text-slate-100">Supplier Analytics & Order Fulfillment</h1>
                <p className="text-sm text-slate-400">Track customer subscriptions, update order status, and manage green catalog inventory.</p>
              </div>
              <div className="flex items-center space-x-3">
                <button onClick={() => triggerSupplierAlert()} className="px-4 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-xl text-xs font-bold border border-slate-700 flex items-center space-x-2">
                  <Bell className="w-4 h-4 text-emerald-400" />
                  <span>Set Email Alerts</span>
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-slate-900 border border-slate-800 p-6 rounded-3xl space-y-2">
                <div className="flex items-center justify-between text-slate-400">
                  <span className="text-xs font-bold uppercase">Total Products</span>
                  <div className="p-2 bg-emerald-500/10 text-emerald-400 rounded-xl"><Package className="w-5 h-5" /></div>
                </div>
                <div className="text-3xl font-black text-slate-100">{products.length}</div>
                <span className="text-xs text-emerald-400 font-semibold flex items-center"><TrendingUp className="w-3.5 h-3.5 mr-1" /> +12% from last month</span>
              </div>
              <div className="bg-slate-900 border border-slate-800 p-6 rounded-3xl space-y-2">
                <div className="flex items-center justify-between text-slate-400">
                  <span className="text-xs font-bold uppercase">Active Subscriptions</span>
                  <div className="p-2 bg-emerald-500/10 text-emerald-400 rounded-xl"><Repeat className="w-5 h-5" /></div>
                </div>
                <div className="text-3xl font-black text-slate-100">{subscriptions.length}</div>
                <span className="text-xs text-emerald-400 font-semibold flex items-center"><TrendingUp className="w-3.5 h-3.5 mr-1" /> +8% from last month</span>
              </div>
              <div className="bg-slate-900 border border-slate-800 p-6 rounded-3xl space-y-2">
                <div className="flex items-center justify-between text-slate-400">
                  <span className="text-xs font-bold uppercase">Fulfillment Rate</span>
                  <div className="p-2 bg-emerald-500/10 text-emerald-400 rounded-xl"><CheckCircle2 className="w-5 h-5" /></div>
                </div>
                <div className="text-3xl font-black text-slate-100">98.4%</div>
                <span className="text-xs text-emerald-400 font-semibold flex items-center"><TrendingUp className="w-3.5 h-3.5 mr-1" /> +1.5% from last month</span>
              </div>
              <div className="bg-slate-900 border border-slate-800 p-6 rounded-3xl space-y-2">
                <div className="flex items-center justify-between text-slate-400">
                  <span className="text-xs font-bold uppercase">Estimated Revenue</span>
                  <div className="p-2 bg-emerald-500/10 text-emerald-400 rounded-xl"><DollarSign className="w-5 h-5" /></div>
                </div>
                <div className="text-3xl font-black text-slate-100">$2,450</div>
                <span className="text-xs text-emerald-400 font-semibold flex items-center"><TrendingUp className="w-3.5 h-3.5 mr-1" /> +24% from last month</span>
              </div>
            </div>

            <div className="bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden shadow-xl">
              <div className="p-6 border-b border-slate-800 flex items-center justify-between">
                <h3 className="text-lg font-bold text-slate-100">Recent Group Subscriptions & Order Status</h3>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-slate-950/60 text-[10px] uppercase font-bold text-slate-400 tracking-wider border-b border-slate-800">
                      <th className="p-4">Subscription ID</th>
                      <th className="p-4">Product</th>
                      <th className="p-4">Frequency</th>
                      <th className="p-4">Members Count</th>
                      <th className="p-4">Status</th>
                      <th className="p-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/80 text-xs text-slate-300">
                    {subscriptions.map(sub => (
                      <tr key={sub.id} className="hover:bg-slate-800/40 transition-colors">
                        <td className="p-4 font-mono text-emerald-400">{sub.id.substring(0,8)}</td>
                        <td className="p-4 font-bold text-slate-200">{getProductName(sub.productId)}</td>
                        <td className="p-4 text-slate-400">{sub.frequency}</td>
                        <td className="p-4">{sub.members.length}</td>
                        <td className="p-4">
                          <span className="px-2.5 py-1 rounded-full text-[10px] uppercase font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">{sub.status}</span>
                        </td>
                        <td className="p-4 text-right">
                          <button onClick={() => toggleSubStatus(sub.id)} className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-xl font-semibold border border-slate-700 transition-colors">
                            Toggle Status
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* ==================== VIEW 4: ADMIN CONTROL (2-COLUMN DASHBOARD) ==================== */}
        {currentTab === 'admin' && (
          <div className="space-y-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-slate-900 border border-slate-800 p-6 rounded-3xl space-y-2 shadow-xl">
                <div className="flex items-center justify-between text-slate-400">
                  <span className="text-xs font-bold uppercase">Subscriptions</span>
                  <div className="p-2 bg-emerald-500/10 text-emerald-400 rounded-xl"><Layers className="w-5 h-5" /></div>
                </div>
                <div className="text-3xl font-black text-slate-100">{subscriptions.length}</div>
                <span className="text-xs text-emerald-400 font-semibold flex items-center"><TrendingUp className="w-3.5 h-3.5 mr-1" /> +14.2% from last month</span>
              </div>
              <div className="bg-slate-900 border border-slate-800 p-6 rounded-3xl space-y-2 shadow-xl">
                <div className="flex items-center justify-between text-slate-400">
                  <span className="text-xs font-bold uppercase">Completed</span>
                  <div className="p-2 bg-emerald-500/10 text-emerald-400 rounded-xl"><CheckCircle className="w-5 h-5" /></div>
                </div>
                <div className="text-3xl font-black text-slate-100">48</div>
                <span className="text-xs text-emerald-400 font-semibold flex items-center"><TrendingUp className="w-3.5 h-3.5 mr-1" /> +5.4% from last month</span>
              </div>
              <div className="bg-slate-900 border border-slate-800 p-6 rounded-3xl space-y-2 shadow-xl">
                <div className="flex items-center justify-between text-slate-400">
                  <span className="text-xs font-bold uppercase">Pending</span>
                  <div className="p-2 bg-amber-500/10 text-amber-400 rounded-xl"><Clock className="w-5 h-5" /></div>
                </div>
                <div className="text-3xl font-black text-slate-100">7</div>
                <span className="text-xs text-rose-400 font-semibold flex items-center"><TrendingDown className="w-3.5 h-3.5 mr-1" /> -2.1% from last month</span>
              </div>
              <div className="bg-slate-900 border border-slate-800 p-6 rounded-3xl space-y-2 shadow-xl">
                <div className="flex items-center justify-between text-slate-400">
                  <span className="text-xs font-bold uppercase">Revenue</span>
                  <div className="p-2 bg-emerald-500/10 text-emerald-400 rounded-xl"><DollarSign className="w-5 h-5" /></div>
                </div>
                <div className="text-3xl font-black text-slate-100">$12,840</div>
                <span className="text-xs text-emerald-400 font-semibold flex items-center"><TrendingUp className="w-3.5 h-3.5 mr-1" /> +18.9% from last month</span>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
              <div className="lg:col-span-2 bg-slate-900 border border-slate-800 rounded-3xl shadow-xl overflow-hidden space-y-6">
                <div className="p-6 border-b border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <h3 className="text-lg font-bold text-slate-100">Admin Products Catalog</h3>
                    <p className="text-xs text-slate-400">Click any product record to inspect dynamic details in the right pane.</p>
                  </div>
                  <button onClick={() => openProductModal()} className="px-4 py-2.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs rounded-xl shadow-lg shadow-emerald-500/20 transition-all flex items-center space-x-2">
                    <Plus className="w-4 h-4" />
                    <span>Add Product</span>
                  </button>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-slate-950/60 text-[10px] uppercase font-bold text-slate-400 tracking-wider border-b border-slate-800">
                        <th className="p-4">Title</th>
                        <th className="p-4">Price</th>
                        <th className="p-4">Carbon Saved</th>
                        <th className="p-4">Supplier</th>
                        <th className="p-4">Status</th>
                        <th className="p-4 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800/80 text-xs text-slate-300">
                      {products.map(product => (
                        <tr key={product.id} onClick={() => setselectedRecord(product)} 
                            className={`cursor-pointer transition-colors ${selectedRecord && selectedRecord.id === product.id ? 'bg-emerald-500/10 border-l-4 border-emerald-500' : 'hover:bg-slate-800/40'}`}>
                          <td className="p-4 font-bold text-slate-200">{product.title}</td>
                          <td className="p-4 text-emerald-400 font-bold">${product.price}</td>
                          <td className="p-4 text-emerald-300 font-semibold">{product.carbonSaved}</td>
                          <td className="p-4 text-slate-400">{product.supplier}</td>
                          <td className="p-4">
                            <span className="px-2.5 py-1 rounded-full text-[10px] uppercase font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">{product.status}</span>
                          </td>
                          <td className="p-4 text-right space-x-2">
                            <button onClick={(e) => { e.stopPropagation(); editProduct(product); }} className="p-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg border border-slate-700">
                              <Edit3 className="w-3.5 h-3.5" />
                            </button>
                            <button onClick={(e) => { e.stopPropagation(); confirmDeleteProduct(product.id); }} className="p-1.5 bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 rounded-lg border border-rose-500/20">
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl space-y-6 sticky top-24">
                <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                  <h3 className="text-base font-bold text-slate-100 flex items-center space-x-2">
                    <Info className="w-4 h-4 text-emerald-400" />
                    <span>Record Details Pane</span>
                  </h3>
                  <span className="text-[10px] px-2.5 py-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 rounded-full font-bold uppercase">Live Inspector</span>
                </div>

                {selectedRecord ? (
                  <div className="space-y-4">
                    <div className="h-40 rounded-2xl overflow-hidden bg-slate-800">
                      <img src={selectedRecord.media} alt={selectedRecord.title} className="w-full h-full object-cover" />
                    </div>
                    <div>
                      <span className="text-[10px] text-emerald-400 font-bold uppercase">{selectedRecord.supplier}</span>
                      <h4 className="text-xl font-black text-slate-100 mt-1">{selectedRecord.title}</h4>
                      <p className="text-xs text-slate-400 mt-2 leading-relaxed">{selectedRecord.description}</p>
                    </div>

                    <div className="grid grid-cols-2 gap-4 pt-2">
                      <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
                        <span className="text-[10px] text-slate-500 uppercase font-bold block">Price</span>
                        <span className="text-base font-bold text-slate-100">${selectedRecord.price}/mo</span>
                      </div>
                      <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
                        <span className="text-[10px] text-slate-500 uppercase font-bold block">Carbon Saved</span>
                        <span className="text-base font-bold text-emerald-400">{selectedRecord.carbonSaved}</span>
                      </div>
                    </div>

                    <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 space-y-1">
                      <span className="text-[10px] text-slate-500 uppercase font-bold block">About Supplier</span>
                      <p className="text-xs text-slate-300">{selectedRecord.aboutSupplier}</p>
                    </div>

                    <div className="flex justify-end space-x-2 pt-2">
                      <button onClick={() => editProduct(selectedRecord)} className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-xl text-xs font-bold border border-slate-700">
                        Edit Record
                      </button>
                      <button onClick={() => confirmDeleteProduct(selectedRecord.id)} className="px-4 py-2 bg-rose-600 hover:bg-rose-500 text-white rounded-xl text-xs font-bold shadow-lg shadow-rose-600/20">
                        Delete
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-16 space-y-3">
                    <div className="w-12 h-12 bg-slate-800 text-slate-400 rounded-2xl flex items-center justify-center mx-auto">
                      <MousePointerClick className="w-6 h-6" />
                    </div>
                    <p className="text-xs text-slate-400">Click any record on the left table to inspect full metadata and relational schema details.</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

      </main>

      {/* ==================== SLIDEOUT SHOPPING CART DRAWER ==================== */}
      {cartOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          <div className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm transition-opacity" onClick={() => setcartOpen(false)}></div>
          
          <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
            <div className="w-screen max-w-md bg-slate-900 border-l border-slate-800 shadow-2xl flex flex-col justify-between">
              <div className="p-6 border-b border-slate-800 flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <ShoppingCart className="w-5 h-5 text-emerald-400" />
                  <h2 className="text-lg font-bold text-slate-100">Your Subscription Cart</h2>
                </div>
                <button onClick={() => setcartOpen(false)} className="p-2 bg-slate-800 hover:bg-slate-700 rounded-xl text-slate-400 hover:text-slate-200 transition-colors">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="p-6 flex-1 overflow-y-auto space-y-4">
                {cart.map((item, index) => (
                  <div key={index} className="bg-slate-950 border border-slate-800 p-4 rounded-2xl flex items-center justify-between space-x-4">
                    <img src={item.media} alt={item.title} className="w-16 h-16 rounded-xl object-cover" />
                    <div className="flex-1 space-y-1">
                      <h4 className="text-sm font-bold text-slate-200">{item.title}</h4>
                      <span className="text-xs text-emerald-400 font-bold">${item.price}/mo</span>
                    </div>
                    <div className="flex flex-col items-end space-y-2">
                      <button onClick={() => removeFromCart(index)} className="text-slate-500 hover:text-rose-400 transition-colors">
                        <Trash2 className="w-4 h-4" />
                      </button>
                      <div className="flex items-center space-x-2 bg-slate-900 border border-slate-800 px-2 py-1 rounded-lg">
                        <button onClick={() => decrementCartQty(index)} className="text-slate-400 hover:text-slate-200">-</button>
                        <span className="text-xs font-bold text-slate-200">{item.qty}</span>
                        <button onClick={() => incrementCartQty(index)} className="text-slate-400 hover:text-slate-200">+</button>
                      </div>
                    </div>
                  </div>
                ))}
                {cart.length === 0 && (
                  <div className="text-center py-20 space-y-3">
                    <div className="w-16 h-16 bg-slate-800 text-slate-500 rounded-2xl flex items-center justify-center mx-auto">
                      <ShoppingBag className="w-8 h-8" />
                    </div>
                    <p className="text-sm text-slate-400">Your cart is currently empty.</p>
                  </div>
                )}
              </div>

              <div className="p-6 border-t border-slate-800 bg-slate-950 space-y-4">
                <div className="space-y-2 text-xs text-slate-400">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span className="text-slate-200 font-bold">${cartSubtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Estimated Taxes (GST 9%)</span>
                    <span className="text-slate-200 font-bold">${cartTax.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Platform & Carbon Offset Fee</span>
                    <span className="text-slate-200 font-bold">${cartShipping.toFixed(2)}</span>
                  </div>
                  <div className="pt-2 border-t border-slate-800 flex justify-between text-sm font-black text-slate-100">
                    <span>Total Due</span>
                    <span className="text-emerald-400">${cartTotal.toFixed(2)}</span>
                  </div>
                </div>

                <button onClick={() => mockCheckout()} disabled={cart.length === 0} 
                        className="w-full py-3.5 bg-emerald-500 hover:bg-emerald-400 disabled:bg-slate-800 disabled:text-slate-600 text-slate-950 font-bold text-sm rounded-xl shadow-lg shadow-emerald-500/20 transition-all flex items-center justify-center space-x-2">
                  <Lock className="w-4 h-4" />
                  <span>Proceed to Secure Checkout</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ==================== PRODUCT FORM MODAL ==================== */}
      {productModal.open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 backdrop-blur-sm p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-lg w-full p-6 shadow-2xl space-y-6" onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <h3 className="text-lg font-bold text-slate-100">{productModal.isEdit ? 'Edit Product Record' : 'Add New Product'}</h3>
              <button onClick={() => setProductModal(prev => ({ ...prev, open: false }))} className="text-slate-400 hover:text-slate-200">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase mb-1">Product Title *</label>
                <input type="text" value={productModal.form.title} onChange={e => setProductModal({ ...productModal, form: { ...productModal.form, title: e.target.value } })} placeholder="e.g. EcoSolar Home Grid" 
                       className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-slate-200 focus:outline-none focus:border-emerald-500" />
                {productModal.form.title.trim() === '' && <span className="text-[10px] text-rose-400 mt-1 block">Title is required.</span>}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-400 uppercase mb-1">Price ($/mo) *</label>
                  <input type="number" value={productModal.form.price} onChange={e => setProductModal({ ...productModal, form: { ...productModal.form, price: Number(e.target.value) } })} placeholder="49" 
                         className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-slate-200 focus:outline-none focus:border-emerald-500" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-400 uppercase mb-1">Supplier Name *</label>
                  <input type="text" value={productModal.form.supplier} onChange={e => setProductModal({ ...productModal, form: { ...productModal.form, supplier: e.target.value } })} placeholder="GreenEnergy LLP" 
                         className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-slate-200 focus:outline-none focus:border-emerald-500" />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase mb-1">Estimated Carbon Saved *</label>
                <input type="text" value={productModal.form.carbonSaved} onChange={e => setProductModal({ ...productModal, form: { ...productModal.form, carbonSaved: e.target.value } })} placeholder="e.g. 145 kg CO₂/mo" 
                       className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-slate-200 focus:outline-none focus:border-emerald-500" />
                {productModal.form.carbonSaved.trim() === '' && <span className="text-[10px] text-rose-400 mt-1 block">Carbon saved metric is required.</span>}
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase mb-1">Description *</label>
                <textarea value={productModal.form.description} onChange={e => setProductModal({ ...productModal, form: { ...productModal.form, description: e.target.value } })} rows="3" placeholder="Provide subscription details..."
                          className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-slate-200 focus:outline-none focus:border-emerald-500"></textarea>
                {productModal.form.description.trim() === '' && <span className="text-[10px] text-rose-400 mt-1 block">Description is required.</span>}
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase mb-1">Media Image URL</label>
                <input type="text" value={productModal.form.media} onChange={e => setProductModal({ ...productModal, form: { ...productModal.form, media: e.target.value } })} placeholder="https://images.unsplash.com/..." 
                       className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-slate-200 focus:outline-none focus:border-emerald-500" />
              </div>

              <div className="flex items-center space-x-3 pt-2">
                <input type="checkbox" checked={productModal.form.promotion} onChange={e => setProductModal({ ...productModal, form: { ...productModal.form, promotion: e.target.checked } })} id="promo-check" className="w-4 h-4 accent-emerald-500 rounded bg-slate-950 border-slate-800" />
                <label htmlFor="promo-check" className="text-xs text-slate-300 font-semibold">Highlight as Special Promotional Offer</label>
              </div>
            </div>

            <div className="flex justify-end space-x-3 pt-4 border-t border-slate-800">
              <button onClick={() => setProductModal(prev => ({ ...prev, open: false }))} className="px-4 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-bold rounded-xl transition-colors">Cancel</button>
              <button onClick={() => saveProductRecord()} disabled={!isProductFormValid} 
                      className="px-5 py-2.5 bg-emerald-500 hover:bg-emerald-400 disabled:bg-slate-800 disabled:text-slate-600 text-slate-950 text-xs font-bold rounded-xl shadow-lg shadow-emerald-500/20 transition-all">
                Save Record
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ==================== SUBSCRIPTION FORM MODAL ==================== */}
      {subscriptionModal.open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 backdrop-blur-sm p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-md w-full p-6 shadow-2xl space-y-6" onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <h3 className="text-lg font-bold text-slate-100">Create Split Subscription Group</h3>
              <button onClick={() => setSubscriptionModal(prev => ({ ...prev, open: false }))} className="text-slate-400 hover:text-slate-200">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase mb-1">Select Product *</label>
                <select value={subscriptionModal.form.productId} onChange={e => setSubscriptionModal({ ...subscriptionModal, form: { ...subscriptionModal.form, productId: e.target.value } })} className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-slate-200 focus:outline-none focus:border-emerald-500">
                  {products.map(p => (
                    <option key={p.id} value={p.id}>{p.title} (${p.price}/mo)</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase mb-1">Billing Frequency</label>
                <select value={subscriptionModal.form.frequency} onChange={e => setSubscriptionModal({ ...subscriptionModal, form: { ...subscriptionModal.form, frequency: e.target.value } })} className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-slate-200 focus:outline-none focus:border-emerald-500">
                  <option value="1 week">Every 1 week</option>
                  <option value="2 weeks">Every 2 weeks</option>
                  <option value="4 weeks">Every 4 weeks</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase mb-1">Initial Member Email *</label>
                <input type="email" value={subscriptionModal.form.memberEmail} onChange={e => setSubscriptionModal({ ...subscriptionModal, form: { ...subscriptionModal.form, memberEmail: e.target.value } })} placeholder="friend@example.com" 
                       className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-slate-200 focus:outline-none focus:border-emerald-500" />
                {subscriptionModal.form.memberEmail.trim() === '' && <span className="text-[10px] text-rose-400 mt-1 block">Valid email is required.</span>}
              </div>
            </div>

            <div className="flex justify-end space-x-3 pt-4 border-t border-slate-800">
              <button onClick={() => setSubscriptionModal(prev => ({ ...prev, open: false }))} className="px-4 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-bold rounded-xl transition-colors">Cancel</button>
              <button onClick={() => saveSubscriptionRecord()} disabled={!subscriptionModal.form.memberEmail.includes('@')} 
                      className="px-5 py-2.5 bg-emerald-500 hover:bg-emerald-400 disabled:bg-slate-800 disabled:text-slate-600 text-slate-950 text-xs font-bold rounded-xl shadow-lg shadow-emerald-500/20 transition-all">
                Create Group
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
