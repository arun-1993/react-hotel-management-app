import { useSettings } from "../../hooks/useSettings";
import { useUpdateSetting } from "../../hooks/useUpdateSetting";
import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import Spinner from "../../ui/Spinner";

export default function UpdateSettingsForm() {
    const { isUpdating, updateSetting } = useUpdateSetting();
    const {
        isLoading,
        settings: {
            minBookingLength,
            maxBookingLength,
            maxGuestsPerBooking,
            breakfastPrice,
        } = {},
    } = useSettings();

    function handleUpdate(e) {
        const { defaultValue, id, value } = e.target;

        if (!id || !value || defaultValue === value) return;

        updateSetting({ [id]: value });

        e.target.defaultValue = value;
    }

    if (isLoading) return <Spinner />;

    return (
        <Form>
            <FormRow label="Minimum nights / booking">
                <Input
                    type="number"
                    id="minBookingLength"
                    defaultValue={minBookingLength}
                    onBlur={handleUpdate}
                    disabled={isUpdating}
                />
            </FormRow>

            <FormRow label="Maximum nights / booking">
                <Input
                    type="number"
                    id="maxBookingLength"
                    defaultValue={maxBookingLength}
                    onBlur={handleUpdate}
                    disabled={isUpdating}
                />
            </FormRow>

            <FormRow label="Maximum guests / booking">
                <Input
                    type="number"
                    id="maxGuestsPerBooking"
                    defaultValue={maxGuestsPerBooking}
                    onBlur={handleUpdate}
                    disabled={isUpdating}
                />
            </FormRow>

            <FormRow label="Breakfast price">
                <Input
                    type="number"
                    id="breakfastPrice"
                    defaultValue={breakfastPrice}
                    onBlur={handleUpdate}
                    disabled={isUpdating}
                />
            </FormRow>
        </Form>
    );
}
