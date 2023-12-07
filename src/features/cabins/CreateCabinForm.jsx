import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

import { createCabin } from "../../services/apiCabins";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import Textarea from "../../ui/Textarea";

export default function CreateCabinForm() {
    const queryClient = useQueryClient();
    const { register, handleSubmit, reset, getValues, formState } = useForm();
    const { errors } = formState;

    const { isLoading: isCreating, mutate } = useMutation({
        mutationFn: createCabin,
        onSuccess: () => {
            toast.success("New cabin successfully created");
            queryClient.invalidateQueries({ queryKey: ["cabins"] });
            reset();
        },
        onError: (error) => toast.error(error.message),
    });

    function onSubmit(data) {
        mutate({ ...data, image: data.image[0] });
    }

    return (
        <Form onSubmit={handleSubmit(onSubmit)}>
            <FormRow label="Cabin name" error={errors?.name?.message}>
                <Input
                    type="text"
                    id="name"
                    disabled={isCreating}
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
                    disabled={isCreating}
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
                    disabled={isCreating}
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
                    disabled={isCreating}
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
                    disabled={isCreating}
                    {...register("description", {
                        required: "Cabin description is required",
                    })}
                />
            </FormRow>

            <FormRow label="Cabin photo" error={errors?.image?.message}>
                <FileInput
                    id="image"
                    accept="image/*"
                    disabled={isCreating}
                    {...register("image", {
                        required: "Cabin image is required",
                    })}
                />
            </FormRow>

            <FormRow>
                <Button
                    variation="secondary"
                    type="reset"
                    disabled={isCreating}
                >
                    Cancel
                </Button>
                <Button disabled={isCreating}>Create Cabin</Button>
            </FormRow>
        </Form>
    );
}
