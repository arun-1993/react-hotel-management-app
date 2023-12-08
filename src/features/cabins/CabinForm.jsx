import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

import { createEditCabin } from "../../services/apiCabins";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import Textarea from "../../ui/Textarea";

export default function CabinForm({ cabin = {} }) {
    const queryClient = useQueryClient();
    const { register, handleSubmit, reset, getValues, formState } = useForm({
        defaultValues: cabin,
    });
    const { errors } = formState;
    const isEditSession = Object.keys(cabin).length === 0 ? false : true;

    const { isLoading: isCreating, mutate: createCabin } = useMutation({
        mutationFn: createEditCabin,
        onSuccess: () => {
            toast.success("New cabin successfully created");
            queryClient.invalidateQueries({ queryKey: ["cabins"] });
            reset();
        },
        onError: (error) => toast.error(error.message),
    });

    const { isLoading: isEditing, mutate: editCabin } = useMutation({
        mutationFn: ({ cabin, id }) => createEditCabin(cabin, id),
        onSuccess: () => {
            toast.success("Cabin successfully edited");
            queryClient.invalidateQueries({ queryKey: ["cabins"] });
            reset(getValues());
        },
        onError: (error) => toast.error(error.message),
    });

    const isLoading = isCreating || isEditing;

    function onSubmit(data) {
        const image = data.image instanceof Object ? data.image[0] : data.image;

        if (isEditSession)
            editCabin({ cabin: { ...data, image: image }, id: cabin.id });
        else createCabin({ ...data, image: image });
    }

    return (
        <Form onSubmit={handleSubmit(onSubmit)}>
            <FormRow label="Cabin name" error={errors?.name?.message}>
                <Input
                    type="text"
                    id="name"
                    disabled={isLoading}
                    {...register("name", {
                        required: "Cabin name is required",
                    })}
                />
            </FormRow>

            <FormRow
                label="Maximum capacity"
                error={errors?.maxCapacity?.message}
            >
                <Input
                    type="number"
                    id="maxCapacity"
                    disabled={isLoading}
                    {...register("maxCapacity", {
                        required: "Maximum capacity is required",
                        min: {
                            value: 1,
                            message: "Maximum capacity cannot be less than 1",
                        },
                    })}
                />
            </FormRow>

            <FormRow
                label="Regular price"
                error={errors?.regularPrice?.message}
            >
                <Input
                    type="number"
                    id="regularPrice"
                    disabled={isLoading}
                    {...register("regularPrice", {
                        required: "Price is required",
                        min: {
                            value: 1,
                            message: "Price cannot be less than 1",
                        },
                    })}
                />
            </FormRow>

            <FormRow label="Discount" error={errors?.discount?.message}>
                <Input
                    type="number"
                    id="discount"
                    defaultValue={0}
                    disabled={isLoading}
                    {...register("discount", {
                        required: "Discount is required",
                        min: {
                            value: 0,
                            message: "Maximum capacity cannot be less than 0",
                        },
                        validate: (value) =>
                            Number(value) <= Number(getValues().regularPrice) ||
                            "Discount should be less than the regular price",
                    })}
                />
            </FormRow>

            <FormRow label="Description" error={errors?.description?.message}>
                <Textarea
                    type="number"
                    id="description"
                    defaultValue=""
                    disabled={isLoading}
                    {...register("description", {
                        required: "Cabin description is required",
                    })}
                />
            </FormRow>

            <FormRow label="Cabin photo" error={errors?.image?.message}>
                <FileInput
                    id="image"
                    accept="image/*"
                    disabled={isLoading}
                    {...register("image", {
                        required: isEditSession
                            ? false
                            : "Cabin image is required",
                    })}
                />
            </FormRow>

            <FormRow>
                <Button variation="secondary" type="reset" disabled={isLoading}>
                    Cancel
                </Button>
                <Button disabled={isLoading}>
                    {isEditSession ? "Edit Cabin" : "Create Cabin"}
                </Button>
            </FormRow>
        </Form>
    );
}
