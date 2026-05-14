# Security Specification: Keells Supermarket

## Data Invariants
1. A user can only read and write their own profile (except admins).
2. Products are readable by everyone, but only admins can write.
3. Orders can be created by authenticated users, but they can only read their own orders. Staff/Admins can read all.
4. Categories and Promotions are read-only for public, write-only for admins.
5. Loyalty points can only be updated by the system or admins (not by the user directly in the client).

## The Dirty Dozen Payloads (Rejection Targets)
1. **Identity Spoofing**: Attempt to create an order with `userId` of another user.
2. **Privilege Escalation**: Attempt to update `role` to 'admin' in own user profile.
3. **Shadow Update**: Attempt to add `specialDiscount: true` to a product.
4. **ID Poisoning**: Attempt to use a 2MB string as `productId`.
5. **State Shortcutting**: Attempt to update order status directly from 'pending' to 'delivered' without being a rider or admin.
6. **Price Tampering**: Attempt to set `price: 0.01` on a high-value product during creation (if allowed).
7. **Orphaned Writes**: Create an order item referencing a non-existent product ID.
8. **PII Leak**: A user attempting to read the `/users/{otherUserId}` document.
9. **Duplicate ID Injection**: Attempting to create a product with an ID that already exists.
10. **Resource Exhaustion**: Sending a 1MB string in the `displayName` field.
11. **Expired Promo Injection**: Creating an order with an expired discount code field (if validated).
12. **Self-Assigned Loyalty**: Attempting to increment `loyaltyPoints` in a profile update.

## Test Runner (Draft Rules Verification)
- Verify `PERMISSION_DENIED` on all above payloads.
- Verify `ALLOW` on valid user profile creation.
- Verify `ALLOW` on valid order placement by authenticated owner.
