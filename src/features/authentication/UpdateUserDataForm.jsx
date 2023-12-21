import { useState } from "react";

import { useUpdateUser } from "../../hooks/useUpdateUser";
import { useUser } from "../../hooks/useUser";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";

export default function UpdateUserDataForm() {
    const {
        user: {
            email,
            user_metadata: { fullName: currentFullName },
        },
    } = useUser();
    const { isUpdatingUser, updateUser } = useUpdateUser();
    const [fullName, setFullName] = useState(currentFullName);
    const [avatar, setAvatar] = useState(null);

    function handleSubmit(e) {
        e.preventDefault();
        if (fullName)
            updateUser(
                { fullName, avatar },
                {
                    onSuccess: () => {
                        setAvatar(null);
                        e.target.reset();
                    },
                }
            );
    }

    function handleReset() {
        setFullName(currentFullName);
        setAvatar(null);
    }

    return (
        <Form onSubmit={handleSubmit}>
            <FormRow label="Email address">
                <Input value={email} disabled />
            </FormRow>

            <FormRow label="Full name">
                <Input
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    id="fullName"
                    disabled={isUpdatingUser}
                />
            </FormRow>

            <FormRow label="Avatar image">
                <FileInput
                    id="avatar"
                    accept="image/*"
                    onChange={(e) => setAvatar(e.target.files[0])}
                    disabled={isUpdatingUser}
                />
            </FormRow>

            <FormRow>
                <Button
                    type="reset"
                    $variation="secondary"
                    onClick={handleReset}
                    disabled={isUpdatingUser}
                >
                    Cancel
                </Button>
                <Button disabled={isUpdatingUser}>Update account</Button>
            </FormRow>
        </Form>
    );
}
