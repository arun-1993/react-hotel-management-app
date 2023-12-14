import Button from "../../ui/Button";
import Modal from "../../ui/Modal";
import CabinForm from "./CabinForm";

export default function CreateCabin() {
    return (
        <div>
            <Modal>
                <Modal.Toggle target="createCabinForm">
                    <Button>Create new cabin</Button>
                </Modal.Toggle>

                <Modal.Window name="createCabinForm">
                    <CabinForm />
                </Modal.Window>
            </Modal>
        </div>
    );
}
