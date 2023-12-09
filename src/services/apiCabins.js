import supabase, { supabaseUrl } from "./supabase";

export async function getCabins() {
    const { data, error } = await supabase
        .from("cabins")
        .select("*")
        .order("name");

    if (error) {
        console.error(error);
        throw new Error("Cabins could not be loaded");
    }

    return data;
}

export async function createEditCabin(cabin, id = null) {
    let query = supabase.from("cabins");
    let imagePath = null;

    if (cabin.image instanceof Object && cabin.image.length !== 0) {
        const imageName = `${Math.random()}-${cabin.image.name}`.replaceAll(
            "/",
            ""
        );

        imagePath = `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`;

        const { error: storageError } = await supabase.storage
            .from("cabin-images")
            .upload(imageName, cabin.image);

        if (storageError) {
            console.error(storageError);
            throw new Error("There was an error uploading the image");
        }
    }

    if (cabin.image === null || cabin.image === undefined) delete cabin.image;
    else cabin.image = imagePath || cabin.image;

    if (id) query = query.update({ ...cabin }).eq("id", id);
    else query = query.insert([{ ...cabin }]);

    const { data, error } = await query.select();

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
