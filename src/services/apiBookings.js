import { PAGE_SIZE } from "../utils/constants";
import { getToday } from "../utils/helpers";
import supabase from "./supabase";

export async function getBookings({ filter, sortBy, page }) {
    const from = (page - 1) * PAGE_SIZE;
    const to = page * PAGE_SIZE - 1;

    let query = supabase
        .from("bookings")
        .select(
            "id, created_at, startDate, endDate, numNights, numGuests, status, totalPrice, cabins(name), guests(fullName, email)",
            { count: "exact" }
        )
        .order(sortBy.field, { ascending: sortBy.direction === "asc" })
        .range(from, to);

    if (filter)
        query = query[filter.method || "eq"](filter.field, filter.value);

    const { data, count, error } = await query;

    if (error) {
        console.error(error);
        throw new Error("Bookings could not be loaded");
    }

    return { data, count };
}

export async function getBooking(id) {
    const { data, error } = await supabase
        .from("bookings")
        .select("*, cabins(*), guests(*)")
        .eq("id", id)
        .single();

    if (error) {
        console.error(error);
        throw new Error("Booking could not be loaded");
    }

    return data;
}

export async function updateBooking(id, booking) {
    const { data, error } = await supabase
        .from("bookings")
        .update(booking)
        .eq("id", id)
        .select()
        .single();

    if (error) {
        console.error(error);
        throw new Error("Booking could not be updated");
    }

    return data;
}

export async function deleteBooking(id) {
    const { error } = await supabase.from("bookings").delete().eq("id", id);

    if (error) {
        console.error(error);
        throw new Error("Booking could not be deleted");
    }
}

export async function getBookingsAfterDate(date) {
    const { data, error } = await supabase
        .from("bookings")
        .select("created_at, totalPrice, extrasPrice")
        .gte("created_at", date)
        .lte("created_at", getToday({ end: true }));

    if (error) {
        console.error(error);
        throw new Error(error.message);
    }

    return data;
}

export async function getStaysAfterDate(date) {
    const { data, error } = await supabase
        .from("bookings")
        .select("*, guests(fullName)")
        .gte("startDate", date)
        .lte("startDate", getToday())
        .or("status.eq.checked-in,status.eq.checked-out");

    if (error) {
        console.error(error);
        throw new Error(error.message);
    }

    return data;
}

export async function getStaysTodayActivity() {
    const { data, error } = await supabase
        .from("bookings")
        .select("*, guests(fullName, nationality, countryFlag)")
        .or(
            `and(status.eq.unconfirmed,startDate.eq.${getToday()}),and(status.eq.checked-in,endDate.eq.${getToday()})`
        )
        .order("created_at");

    if (error) {
        console.error(error);
        throw new Error(error.message);
    }

    return data;
}
