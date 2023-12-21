import { useForm } from "react-hook-form";

import { useUpdateUser } from "../../hooks/useUpdateUser";
import Button from "../../ui/Button";
import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";

export default function UpdatePasswordForm() {
    const { register, handleSubmit, formState, getValues, reset } = useForm();
    const { errors } = formState;

    const { isUpdatingUser, updateUser } = useUpdateUser();

    function onSubmit({ password }) {
        updateUser({ password }, { onSuccess: reset });
    }

    return (
        <Form onSubmit={handleSubmit(onSubmit)}>
            <FormRow label="New password" error={errors?.password?.message}>
                <Input
                    type="password"
                    id="password"
                    autoComplete="current-password"
                    disabled={isUpdatingUser}
                    {...register("password", {
                        required: "Password is required",
                        minLength: {
                            value: 8,
                            message: "Password must be at least 8 characters",
                        },
                    })}
                />
            </FormRow>

            <FormRow
                label="Confirm password"
                error={errors?.passwordConfirm?.message}
            >
                <Input
                    type="password"
                    autoComplete="new-password"
                    id="passwordConfirm"
                    disabled={isUpdatingUser}
                    {...register("passwordConfirm", {
                        required: "Password confirmation is required",
                        validate: (value) =>
                            getValues().password === value ||
                            "Passwords need to match",
                    })}
                />
            </FormRow>

            <FormRow>
                <Button onClick={reset} type="reset" $variation="secondary">
                    Cancel
                </Button>
                <Button disabled={isUpdatingUser}>Update password</Button>
            </FormRow>
        </Form>
    );
}
