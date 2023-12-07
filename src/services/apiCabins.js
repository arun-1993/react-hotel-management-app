import supabase, { supabaseUrl } from "./supabase";

export async function getCabins() {
    const { data, error } = await supabase.from("cabins").select("*");

    if (error) {
        console.error(error);
        throw new Error("Cabins could not be loaded");
    }

    return data;
}

export async function createCabin(cabin) {
    const imageName = `${Math.random()}-${cabin.image.name}`.replaceAll(
        "/",
        ""
    );

    const imagePath = `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`;

    const { error: storageError } = await supabase.storage
        .from("cabin-images")
        .upload(imageName, cabin.image);

    if (storageError) {
        console.error(storageError);
        throw new Error("There was an error uploading the image");
    }

    const { data, error } = await supabase
        .from("cabins")
        .insert([{ ...cabin, image: imagePath }])
        .select();

    if (error) {
        console.error(error);
        throw new Error("Cabin could not be created");
    }

    return data;
}

export async function deleteCabin(id) {
    const { error } = await supabase.from("cabins").delete().eq("id", id);

    if (error) {
        console.error(error);
        throw new Error("Cabin could not be deleted");
    }
}
