# A Hotel Management App in React

## Functionalities

-   Users of the app are hotel employees. They need to be logged in to the application in order to perform the tasks.
-   New users can only be signed up inside the application (to ensure that only hotel employees can get accounts).
-   Users should be able to upload an avatar and change their name and password.
-   App needs a table view with all cabins showing the cabin photo, name, capacity, price and any discounts if applicable.
-   Users should be able to create, update or delete cabins.
-   App needs a table view with all bookings showing arrival and departure dates, status and paid amount as well as cabin and guest data.
-   The booking status can be "unconfirmed" (booked but not yet checked in), "checked in" or "checked out". The table should be filterable by status.
-   Other booking data includes number of guests, nights of stay, guest notes, whether they booked breakfast and breakfast price.
-   Users should be able to delete, check in or check out a guest (no editing necessary for now).
-   Bookings may not have been paid yet on guest arrival. Therefore on check in, users need to accept payment (outside the app) and then confirm that the payment has been received (in the app).
-   On check in, the guest should have the ability to add breakfast for the entire stay if they hadn't already.
-   Guest data should contain full name, email, national ID, nationality and a country flag for easy identification.
-   The initial app screen should be a dashboard that displays important information from the last 7, 30 or 90 days:
    -   A list of guests checking in and out on the current day. Users should be able to perform their tasks from here.
    -   Statistics on recent bookings, sales, check ins and occupancy rates.
    -   A chart showing daily hotel sales showing both total sales and extra sales (only breakfast at the moment).
    -   A chart showing statistics on stay durations as this is an important metric for the hotel.
-   Users should be able to define a few application wide settings such as breakfast price, min and max nights per booking, max guests per booking.
-   App needs a dark mode.

## Features

-   Authentication
-   Cabins
-   Bookings
-   Check In/Out
-   Guest
-   Dashboard
-   App Settings

## Pages

| Page             | Route                 |
| ---------------- | --------------------- |
| Dashboard        | `/dashboard`          |
| Bookings         | `/bookings`           |
| Cabins           | `/cabins`             |
| Booking check in | `/checkin/:bookingID` |
| App settings     | `/settings`           |
| User sign up     | `/users`              |
| Login            | `/login`              |
| Account settings | `/account`            |

## Tech Stack

-   **Routing:** React Router
-   **Styling:** Styled Components
-   **Remote State Management:** React Query / TanStack Query
-   **UI State Management:** React Context API
-   **Form Management:** React Hook Form
-   **Other Tools:** date-fns, React Icons, React Hot Toast, Recharts, Supabase, Vite
