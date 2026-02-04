# Book Reservation (Queue) System Implementation Plan

## Goal Description
Implement a waiting list (queue) system for books that are currently unavailable. Users can join the queue, and when a copy is returned, the first person in the queue receives a notification.

## Proposed Changes

### Backend

#### Models
- **[NEW]** `Notification.js`
    - Schema: `user` (ObjectId), `message` (String), `type` (Enum: 'AVAILABILITY', 'REMINDER'), `read` (Boolean), `relatedBook` (ObjectId, optional).
- **[MODIFY]** `Book.js`
    - Add `queue` field: Array of objects `{ user: ObjectId, requestedAt: Date }`.

#### Routes / Controllers
- **[NEW]** `notificationRoutes.js`
    - `GET /`: Get user's notifications.
    - `PUT /:id/read`: Mark notification as read.
- **[MODIFY]** `bookRoutes.js`
    - `POST /:id/reserve`: Validates availability (must be 0) and adds user to queue.
- **[MODIFY]** `userRoutes.js`
    - **Update `return` endpoint**:
        - Check `book.queue`.
        - If not empty, Create `Notification` for `queue[0].user`.
    - **[NEW]** `GET /reservations`: Get books the user is waiting for.

### Frontend

#### Context
- **[NEW]** `NotificationContext.jsx`
    - Provides `notifications`, `unreadCount`, `fetchNotifications`, `markAsRead`.

#### Components
- **[MODIFY]** `Header.jsx`
    - Add Notification Bell Icon with unread badge.
    - Add Dropdown to show recent notifications.
- **[MODIFY]** `BookDetails.jsx`
    - Add logic to check if `availableQuantity === 0`.
    - If 0, show "Join Waitlist" button (via backend API).
- **[MODIFY]** `Profile.jsx`
    - Add "My Reservations" section to show books the user is waiting for.

## Verification Plan

### Manual Verification
1.  **Waitlist Join:**
    - Log in as Student A.
    - Find a book with 0 availability.
    - Click "Join Waitlist". Verify success message.
2.  **Notification Trigger:**
    - Log in as Admin.
    - Return the book.
    - Check that Student A receives a notification.
3.  **My Reservations:**
    - Check Profile page to see the reserved book listed.
