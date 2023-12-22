import { useCheckOut } from "../../hooks/useCheckOut";
import Button from "../../ui/Button";
import SpinnerMini from "../../ui/SpinnerMini";

export default function CheckoutButton({ bookingId }) {
    const { isCheckingOut, checkOut } = useCheckOut();

    return (
        <Button
            size="small"
            onClick={() => checkOut(bookingId)}
            disabled={isCheckingOut}
        >
            {isCheckingOut ? <SpinnerMini /> : "Check out"}
        </Button>
    );
}
