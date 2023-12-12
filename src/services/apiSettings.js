import supabase from "./supabase";

export async function getSettings() {
    const { data, error } = await supabase
        .from("settings")
        .select("*")
        .single();

    if (error) {
        console.error(error);
        throw new Error("Could not fetch settings");
    }

    return data;
}

export async function updateSetting(setting) {
    const { data, error } = await supabase
        .from("settings")
        .update(setting)
        .eq("id", 1)
        .single();

    if (error) {
        console.error(error);
        throw new Error("Could not update setting");
    }

    return data;
}
