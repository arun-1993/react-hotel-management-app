import { HiPencilSquare, HiSquare2Stack, HiTrash } from "react-icons/hi2";
import styled from "styled-components";

import { useCreateCabin } from "../../hooks/useCreateCabin";
import { useDeleteCabin } from "../../hooks/useDeleteCabin";
import ConfirmDelete from "../../ui/ConfirmDelete";
import Modal from "../../ui/Modal";
import Table from "../../ui/Table";
import { formatCurrency } from "../../utils/helpers";
import CabinForm from "./CabinForm";

const Img = styled.img`
    display: block;
    width: 6.4rem;
    aspect-ratio: 3 / 2;
    object-fit: cover;
    object-position: center;
    transform: scale(1.5) translateX(-7px);
`;

const Cabin = styled.div`
    font-size: 1.6rem;
    font-weight: 600;
    color: var(--color-grey-600);
    font-family: "Sono";
`;

const Price = styled.div`
    font-family: "Sono";
    font-weight: 600;
`;

const Discount = styled.div`
    font-family: "Sono";
    font-weight: 500;
    color: var(--color-green-700);
`;

export default function CabinRow({ cabin }) {
    const { isDeleting, deleteCabin } = useDeleteCabin();
    const { isCreating, createCabin } = useCreateCabin();

    const isBusy = isCreating || isDeleting;
    const {
        id: cabinId,
        name,
        maxCapacity,
        regularPrice,
        discount,
        image,
    } = cabin;

    function duplicateCabin() {
        const duplicateCabinData = { ...cabin, name: `Copy of ${cabin.name}` };
        delete duplicateCabinData.id;
        createCabin(duplicateCabinData);
    }

    return (
        <Table.Row role="row">
            <Img src={image} />
            <Cabin>{name}</Cabin>
            <div>Fits up to {maxCapacity} guests</div>
            <Price>{formatCurrency(regularPrice)}</Price>
            {Number(discount) ? (
                <Discount>{formatCurrency(discount)}</Discount>
            ) : (
                <span>&mdash;</span>
            )}
            <div>
                <button
                    title="Duplicate Cabin"
                    disabled={isBusy}
                    onClick={duplicateCabin}
                >
                    <HiSquare2Stack />
                </button>

                <Modal>
                    <Modal.Toggle target="updateCabinForm">
                        <button title="Edit Cabin" disabled={isBusy}>
                            <HiPencilSquare />
                        </button>
                    </Modal.Toggle>

                    <Modal.Window name="updateCabinForm">
                        <CabinForm cabin={cabin} />
                    </Modal.Window>

                    <Modal.Toggle target="deleteCabin">
                        <button title="Delete Cabin" disabled={isBusy}>
                            <HiTrash />
                        </button>
                    </Modal.Toggle>

                    <Modal.Window name="deleteCabin">
                        <ConfirmDelete
                            resourceName="cabin"
                            onConfirm={() => deleteCabin(cabinId)}
                            disabled={isBusy}
                        />
                    </Modal.Window>
                </Modal>
            </div>
        </Table.Row>
    );
}
