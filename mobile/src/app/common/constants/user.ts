import { SubscriptionLevelPermission } from '../models/user';

export const subscriptionLevel: SubscriptionLevelPermission[] = [
  {
    subscriptionName: 'Premium',
    level: 1,
    canInvoice: false,
    canMargin: false,
  },
  { subscriptionName: 'Elite', level: 2, canInvoice: true, canMargin: true },
  {
    subscriptionName: 'Lifetime',
    level: 3,
    canInvoice: true,
    canMargin: true,
  },
];
