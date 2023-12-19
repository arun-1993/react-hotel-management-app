import { PAGE_SIZE } from "../utils/constants";
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
