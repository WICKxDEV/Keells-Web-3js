import { Router } from 'express';

const router = Router();

// Middleware to check for Admin (Mock)
// In production, this would verify Firebase Admin SDK tokens
const checkAdmin = (req: any, res: any, next: any) => {
  const adminToken = req.headers.authorization;
  if (adminToken === 'mock-admin-token') {
    next();
  } else {
    res.status(401).json({ error: 'Unauthorized: Admin access required' });
  }
};

router.get('/stats', checkAdmin, (req, res) => {
  res.json({
    dailyRevenue: 450000,
    activeOrders: 124,
    newCustomers: 45,
    topProducts: [
      { name: 'Fresh Chicken', sales: 1200 },
      { name: 'Red Rice', sales: 850 }
    ]
  });
});

export default router;
