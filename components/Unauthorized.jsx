import Link from "next/link"

const Unauthorized = () => {
    return (
        <div className="flex items-center justify-center h-screen bg-bnr-primary">
            <div className="w-1/5 bg-white">
                You must
                <Link href={"/login"}>
                    login
                </Link>
                to finish your payment.
            </div>
        </div>
    )
}

export default Unauthorized