import UpdateSettingsForm from "../features/settings/UpdateSettingsForm";
import Heading from "../ui/Heading";
import Row from "../ui/Row";

export default function Settings() {
    return (
        <Row type="vertical">
            <Heading as="h1">Update settings</Heading>
            <UpdateSettingsForm />
        </Row>
    );
}
