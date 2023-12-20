import { useForm } from "react-hook-form";

import { useSignup } from "../../hooks/useSignup";
import Button from "../../ui/Button";
import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";

export default function SignupForm() {
    const { isSigningUp, signup } = useSignup();
    const { register, formState, getValues, handleSubmit, reset } = useForm();

    const { errors } = formState;

    function onSubmit({ fullName, email, password }) {
        signup({ fullName, email, password }, { onSettled: () => reset() });
    }

    return (
        <Form onSubmit={handleSubmit(onSubmit)}>
            <FormRow label="Full name" error={errors?.fullName?.message}>
                <Input
                    type="text"
                    id="fullName"
                    disabled={isSigningUp}
                    {...register("fullName", {
                        required: "Full name is required",
                    })}
                />
            </FormRow>

            <FormRow label="Email address" error={errors?.email?.message}>
                <Input
                    type="email"
                    id="email"
                    disabled={isSigningUp}
                    {...register("email", {
                        required: "Email is required",
                        pattern: {
                            value: /\S+@\S+\.\S+/,
                            message: "Not a valid email address",
                        },
                    })}
                />
            </FormRow>

            <FormRow
                label="Password (min 8 characters)"
                error={errors?.password?.message}
            >
                <Input
                    type="password"
                    id="password"
                    disabled={isSigningUp}
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
                label="Repeat password"
                error={errors?.passwordConfirm?.message}
            >
                <Input
                    type="password"
                    id="passwordConfirm"
                    disabled={isSigningUp}
                    {...register("passwordConfirm", {
                        required: "Password confirmation is required",
                        validate: (value) =>
                            value === getValues().password ||
                            "Passwords need to match",
                    })}
                />
            </FormRow>

            <FormRow>
                <Button
                    $variation="secondary"
                    type="reset"
                    onClick={reset}
                    disabled={isSigningUp}
                >
                    Cancel
                </Button>
                <Button disabled={isSigningUp}>Create new user</Button>
            </FormRow>
        </Form>
    );
}
