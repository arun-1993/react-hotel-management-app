import supabase from "./supabase";

export async function getBookings({ filter, sortBy }) {
    let query = supabase
        .from("bookings")
        .select(
            "id, created_at, startDate, endDate, numNights, numGuests, status, totalPrice, cabins(name), guests(fullName, email)"
        )
        .order(sortBy.field, { ascending: sortBy.direction === "asc" });

    if (filter)
        query = query[filter.method || "eq"](filter.field, filter.value);

    const { data, error } = await query;

    if (error) {
        console.error(error);
        throw new Error("Bookings could not be loaded");
    }

    return data;
}
