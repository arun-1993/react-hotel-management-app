import { Fragment, useState } from "react";
import { HiPencilSquare, HiSquare2Stack, HiTrash } from "react-icons/hi2";
import styled from "styled-components";

import { useCreateCabin } from "../../hooks/useCreateCabin";
import { useDeleteCabin } from "../../hooks/useDeleteCabin";
import { formatCurrency } from "../../utils/helpers";
import CabinForm from "./CabinForm";

const TableRow = styled.div`
    display: grid;
    grid-template-columns: 0.6fr 1.8fr 2.2fr 1fr 1fr 1fr;
    column-gap: 2.4rem;
    align-items: center;
    padding: 1.4rem 2.4rem;

    &:not(:last-child) {
        border-bottom: 1px solid var(--color-grey-100);
    }
`;

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
    const [showEditForm, setShowEditForm] = useState(false);
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
        <Fragment>
            <TableRow role="row">
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

                    <button
                        title="Edit Cabin"
                        disabled={isBusy}
                        onClick={() =>
                            setShowEditForm((showEditForm) => !showEditForm)
                        }
                    >
                        <HiPencilSquare />
                    </button>

                    <button
                        title="Delete Cabin"
                        disabled={isBusy}
                        onClick={() => deleteCabin(cabinId)}
                    >
                        <HiTrash />
                    </button>
                </div>
            </TableRow>
            {showEditForm && <CabinForm cabin={cabin} />}
        </Fragment>
    );
}
