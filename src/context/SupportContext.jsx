import React, { createContext, useContext, useState, useEffect } from 'react';

const SupportContext = createContext(null);

const INITIAL_SUPPORT_AGENTS = [
  {
    id: 'agent-admin-1',
    name: 'Priyanshu Singh Mahar',
    role: 'Master Administrator & Command Chief',
    department: 'Central Executive & Emergency Command',
    email: 'priyanshu.meher88@gmail.com',
    phone: '+91 9528731865',
    status: 'ACTIVE',
    isMasterAdmin: true,
    avatar: '🛡️',
    joinedDate: 'Nov 2024'
  },
  {
    id: 'agent-support-2',
    name: 'Pooja Rawat',
    role: 'Senior Char Dham & Pilgrim Coordinator',
    department: 'Spiritual Expeditions & Temple Passes',
    email: 'pooja.rawat@swargbraman.in',
    phone: '+91 98765 00002',
    status: 'ACTIVE',
    isMasterAdmin: false,
    avatar: '🛕',
    joinedDate: 'Dec 2024'
  },
  {
    id: 'agent-support-3',
    name: 'Devendra Negi',
    role: 'Mountain Rescue & Safety Dispatcher',
    department: 'Emergency Response & Weather Advisory',
    email: 'devendra.negi@swargbraman.in',
    phone: '+91 98765 00003',
    status: 'ACTIVE',
    isMasterAdmin: false,
    avatar: '🏔️',
    joinedDate: 'Jan 2025'
  },
  {
    id: 'agent-support-4',
    name: 'Sunita Joshi',
    role: 'District Haat & Artisan Guild Officer',
    department: 'Artisan Orders & Logistics Support',
    email: 'sunita.joshi@swargbraman.in',
    phone: '+91 98765 00004',
    status: 'ACTIVE',
    isMasterAdmin: false,
    avatar: '🎨',
    joinedDate: 'Feb 2025'
  }
];

const INITIAL_SUPPORT_TICKETS = [
  {
    id: 'TKT-1048',
    customerName: 'Aarav Sharma',
    customerContact: '+91 98234 56789',
    customerEmail: 'aarav.sharma@example.com',
    category: 'Expedition & Booking',
    urgency: 'Normal',
    status: 'ACTIVE',
    assignedAgentId: 'agent-admin-1',
    assignedTo: 'Priyanshu Singh Mahar (Master Admin)',
    createdAt: new Date(Date.now() - 45 * 60000).toISOString(),
    lastUpdated: new Date(Date.now() - 5 * 60000).toISOString(),
    unreadByAdmin: false,
    unreadByCustomer: false,
    messages: [
      {
        id: 'msg-1',
        sender: 'customer',
        senderName: 'Aarav Sharma',
        text: 'Namaste Admin! I want to confirm if the Roopkund High Altitude Trek requires prior medical certificate from a physician?',
        timestamp: '11:15 AM',
        createdAt: new Date(Date.now() - 45 * 60000).toISOString()
      },
      {
        id: 'msg-2',
        sender: 'admin',
        senderName: 'Priyanshu Singh Mahar (Admin)',
        text: 'Jai Devbhoomi Aarav ji! Yes, for high altitude passes above 12,000 ft, a physical fitness clearance from a registered doctor is mandatory. Our NIM-certified lead guide will also do an oxygen saturation check at base camp before ascending.',
        timestamp: '11:22 AM',
        createdAt: new Date(Date.now() - 38 * 60000).toISOString()
      },
      {
        id: 'msg-3',
        sender: 'customer',
        senderName: 'Aarav Sharma',
        text: 'Thank you for the quick clarification! I will upload the certificate in My Trips section.',
        timestamp: '11:28 AM',
        createdAt: new Date(Date.now() - 32 * 60000).toISOString()
      }
    ]
  },
  {
    id: 'TKT-1047',
    customerName: 'Meenakshi Sundaram',
    customerContact: '+91 94441 23456',
    customerEmail: 'meenakshi.s@chennai.org',
    category: 'Char Dham Pilgrimage',
    urgency: 'Normal',
    status: 'IN_PROGRESS',
    assignedAgentId: 'agent-support-2',
    assignedTo: 'Pooja Rawat (Char Dham Coordinator)',
    createdAt: new Date(Date.now() - 120 * 60000).toISOString(),
    lastUpdated: new Date(Date.now() - 25 * 60000).toISOString(),
    unreadByAdmin: false,
    unreadByCustomer: false,
    messages: [
      {
        id: 'msg-201',
        sender: 'customer',
        senderName: 'Meenakshi Sundaram',
        text: 'We are a senior citizen family from Chennai planning Kedarnath & Badrinath darshan. Are biometric priority passes included in the 7-day package?',
        timestamp: '10:05 AM',
        createdAt: new Date(Date.now() - 120 * 60000).toISOString()
      },
      {
        id: 'msg-202',
        sender: 'admin',
        senderName: 'Pooja Rawat (Support Specialist)',
        text: 'Vanakkam Meenakshi ji! Yes, all SwargBhraman Char Dham Curated Packages include pre-verified Devbhoomi biometric registration and special senior citizen assistance at Sonprayag & Phata helipads.',
        timestamp: '10:20 AM',
        createdAt: new Date(Date.now() - 105 * 60000).toISOString()
      }
    ]
  },
  {
    id: 'TKT-1046',
    customerName: 'Vikramaditya Rathore',
    customerContact: '+91 97112 88990',
    customerEmail: 'vikram.rathore@jaipur.com',
    category: 'Emergency Mountain Dispatch',
    urgency: 'Emergency',
    status: 'ACTIVE',
    assignedAgentId: 'agent-admin-1',
    assignedTo: 'Priyanshu Singh Mahar (Master Admin)',
    createdAt: new Date(Date.now() - 18 * 60000).toISOString(),
    lastUpdated: new Date(Date.now() - 2 * 60000).toISOString(),
    unreadByAdmin: true,
    unreadByCustomer: false,
    messages: [
      {
        id: 'msg-301',
        sender: 'customer',
        senderName: 'Vikramaditya Rathore',
        text: 'URGENT: Heavy snowfall warning reported near Chopta - Tungnath trail. We are currently staying at a local homestay in Sari village. Is the trek open today?',
        timestamp: '11:42 AM',
        createdAt: new Date(Date.now() - 18 * 60000).toISOString()
      },
      {
        id: 'msg-302',
        sender: 'admin',
        senderName: 'Priyanshu Singh Mahar (Admin)',
        text: 'Rathore ji, standby! Our SDRF & Forest Range officer Devendra Negi has been alerted. Current advisory is to wait at Sari village till 2:00 PM for trail de-icing. Do not attempt high ridges without microspikes.',
        timestamp: '11:45 AM',
        createdAt: new Date(Date.now() - 15 * 60000).toISOString()
      }
    ]
  },
  {
    id: 'TKT-1045',
    customerName: 'Ananya Bhattacharya',
    customerContact: '+91 98300 45678',
    customerEmail: 'ananya.bhatt@kolkata.net',
    category: 'District Haat Order',
    urgency: 'Normal',
    status: 'RESOLVED',
    assignedAgentId: 'agent-support-4',
    assignedTo: 'Sunita Joshi (Haat Officer)',
    createdAt: new Date(Date.now() - 360 * 60000).toISOString(),
    lastUpdated: new Date(Date.now() - 80 * 60000).toISOString(),
    unreadByAdmin: false,
    unreadByCustomer: false,
    messages: [
      {
        id: 'msg-401',
        sender: 'customer',
        senderName: 'Ananya Bhattacharya',
        text: 'I placed an order for the GI-tagged Pithoragarh Thulma sheep wool blanket. Could you please share the SpeedPost consignment tracking ID?',
        timestamp: '06:30 AM',
        createdAt: new Date(Date.now() - 360 * 60000).toISOString()
      },
      {
        id: 'msg-402',
        sender: 'admin',
        senderName: 'Sunita Joshi (Haat Officer)',
        text: 'Namaskar Ananya ji! Your artisan parcel has been dispatched from Dharchula weaver society. SpeedPost Tracking: UK982341908IN. Expected delivery to Kolkata in 4 days.',
        timestamp: '08:15 AM',
        createdAt: new Date(Date.now() - 255 * 60000).toISOString()
      }
    ]
  }
];

export function SupportProvider({ children }) {
  // 1. Tickets State
  const [tickets, setTickets] = useState(() => {
    try {
      const saved = localStorage.getItem('swargbraman_support_tickets');
      if (saved) return JSON.parse(saved);
    } catch (e) {}
    return INITIAL_SUPPORT_TICKETS;
  });

  // 2. Agents State (Team Members)
  const [agents, setAgents] = useState(() => {
    try {
      const saved = localStorage.getItem('swargbraman_support_agents');
      if (saved) return JSON.parse(saved);
    } catch (e) {}
    return INITIAL_SUPPORT_AGENTS;
  });

  // 3. Active Traveler Ticket ID (for current session/widget)
  const [currentCustomerTicketId, setCurrentCustomerTicketId] = useState(() => {
    try {
      return localStorage.getItem('swargbraman_current_customer_ticket') || 'TKT-1048';
    } catch (e) {
      return 'TKT-1048';
    }
  });

  // Sync to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('swargbraman_support_tickets', JSON.stringify(tickets));
    } catch (e) {}
  }, [tickets]);

  useEffect(() => {
    try {
      localStorage.setItem('swargbraman_support_agents', JSON.stringify(agents));
    } catch (e) {}
  }, [agents]);

  useEffect(() => {
    try {
      if (currentCustomerTicketId) {
        localStorage.setItem('swargbraman_current_customer_ticket', currentCustomerTicketId);
      }
    } catch (e) {}
  }, [currentCustomerTicketId]);

  // Listen to cross-window or storage events
  useEffect(() => {
    const handleStorageChange = (e) => {
      if (e.key === 'swargbraman_support_tickets' && e.newValue) {
        try {
          setTickets(JSON.parse(e.newValue));
        } catch (err) {}
      }
      if (e.key === 'swargbraman_support_agents' && e.newValue) {
        try {
          setAgents(JSON.parse(e.newValue));
        } catch (err) {}
      }
    };
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  // Format current time
  const getCurrentTimeString = () => {
    const d = new Date();
    return d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  // Traveler creates new inquiry/ticket
  const createTicket = ({
    customerName,
    customerContact,
    customerEmail = '',
    category = 'General Inquiry',
    urgency = 'Normal',
    initialMessage = ''
  }) => {
    const newId = `TKT-${Math.floor(1000 + Math.random() * 9000)}`;
    const now = new Date().toISOString();
    const newTicket = {
      id: newId,
      customerName: customerName || 'Valued Traveler',
      customerContact: customerContact || '+91 98000 00000',
      customerEmail: customerEmail || 'traveler@swargbraman.in',
      category,
      urgency,
      status: 'ACTIVE',
      assignedAgentId: 'agent-admin-1', // Default routing to Master Admin
      assignedTo: 'Priyanshu Singh Mahar (Master Admin)',
      createdAt: now,
      lastUpdated: now,
      unreadByAdmin: true,
      unreadByCustomer: false,
      messages: initialMessage ? [
        {
          id: `msg-${Date.now()}`,
          sender: 'customer',
          senderName: customerName || 'Traveler',
          text: initialMessage,
          timestamp: getCurrentTimeString(),
          createdAt: now
        }
      ] : []
    };

    const updated = [newTicket, ...tickets];
    setTickets(updated);
    setCurrentCustomerTicketId(newId);
    return newTicket;
  };

  // Traveler sends message in active ticket
  const sendCustomerMessage = (ticketId, text, senderName = 'Traveler') => {
    if (!text || !text.trim()) return;
    const now = new Date().toISOString();
    const newMsg = {
      id: `msg-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
      sender: 'customer',
      senderName,
      text: text.trim(),
      timestamp: getCurrentTimeString(),
      createdAt: now
    };

    setTickets(prev =>
      prev.map(t => {
        if (t.id === ticketId) {
          return {
            ...t,
            lastUpdated: now,
            unreadByAdmin: true,
            status: t.status === 'RESOLVED' ? 'ACTIVE' : t.status,
            messages: [...t.messages, newMsg]
          };
        }
        return t;
      })
    );
  };

  // Admin sends direct reply to traveler
  const sendAdminMessage = (ticketId, text, adminName = 'Priyanshu Singh Mahar (Admin)') => {
    if (!text || !text.trim()) return;
    const now = new Date().toISOString();
    const newMsg = {
      id: `msg-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
      sender: 'admin',
      senderName: adminName,
      text: text.trim(),
      timestamp: getCurrentTimeString(),
      createdAt: now
    };

    setTickets(prev =>
      prev.map(t => {
        if (t.id === ticketId) {
          return {
            ...t,
            lastUpdated: now,
            unreadByCustomer: true,
            unreadByAdmin: false,
            messages: [...t.messages, newMsg]
          };
        }
        return t;
      })
    );
  };

  // Admin marks ticket as read
  const markTicketReadByAdmin = (ticketId) => {
    setTickets(prev =>
      prev.map(t => (t.id === ticketId ? { ...t, unreadByAdmin: false } : t))
    );
  };

  // Customer marks ticket as read
  const markTicketReadByCustomer = (ticketId) => {
    setTickets(prev =>
      prev.map(t => (t.id === ticketId ? { ...t, unreadByCustomer: false } : t))
    );
  };

  // Change ticket status (ACTIVE, IN_PROGRESS, RESOLVED)
  const updateTicketStatus = (ticketId, newStatus) => {
    setTickets(prev =>
      prev.map(t => (t.id === ticketId ? { ...t, status: newStatus, lastUpdated: new Date().toISOString() } : t))
    );
  };

  // Reassign ticket to another agent or back to admin
  const assignTicket = (ticketId, agentId, agentName) => {
    setTickets(prev =>
      prev.map(t => (t.id === ticketId ? { ...t, assignedAgentId: agentId, assignedTo: agentName, lastUpdated: new Date().toISOString() } : t))
    );
  };

  // Admin Team Member Management: Add new Agent to Support Team
  const addAgent = ({
    name,
    email,
    phone,
    role,
    department,
    status = 'ACTIVE',
    avatar = '👨‍💼'
  }) => {
    const newAgent = {
      id: `agent-${Date.now()}`,
      name: name.trim(),
      email: email.trim(),
      phone: phone.trim(),
      role: role.trim(),
      department: department.trim(),
      status,
      isMasterAdmin: false,
      avatar,
      joinedDate: new Date().toLocaleDateString('en-US', { month: 'short', year: 'numeric' })
    };
    const updated = [...agents, newAgent];
    setAgents(updated);
    return newAgent;
  };

  // Update Agent details or toggle status
  const updateAgent = (agentId, updatedData) => {
    setAgents(prev =>
      prev.map(a => (a.id === agentId ? { ...a, ...updatedData } : a))
    );
  };

  // Remove Agent from Support Team (Master Admin cannot be removed)
  const removeAgent = (agentId) => {
    const target = agents.find(a => a.id === agentId);
    if (target?.isMasterAdmin) {
      alert('Master Administrator cannot be removed from support command.');
      return false;
    }
    setAgents(prev => prev.filter(a => a.id !== agentId));
    // Reassign any tickets assigned to this agent back to Master Admin
    setTickets(prev =>
      prev.map(t => {
        if (t.assignedAgentId === agentId) {
          return {
            ...t,
            assignedAgentId: 'agent-admin-1',
            assignedTo: 'Priyanshu Singh Mahar (Master Admin)'
          };
        }
        return t;
      })
    );
    return true;
  };

  // Calculate ticket counts per agent
  const getAgentTicketCount = (agentId) => {
    return tickets.filter(t => t.assignedAgentId === agentId && t.status !== 'RESOLVED').length;
  };

  return (
    <SupportContext.Provider
      value={{
        tickets,
        agents,
        currentCustomerTicketId,
        setCurrentCustomerTicketId,
        createTicket,
        sendCustomerMessage,
        sendAdminMessage,
        markTicketReadByAdmin,
        markTicketReadByCustomer,
        updateTicketStatus,
        assignTicket,
        addAgent,
        updateAgent,
        removeAgent,
        getAgentTicketCount
      }}
    >
      {children}
    </SupportContext.Provider>
  );
}

export function useSupport() {
  const context = useContext(SupportContext);
  if (!context) {
    throw new Error('useSupport must be used within a SupportProvider');
  }
  return context;
}
