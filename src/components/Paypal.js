
// import {
//     PayPalScriptProvider,
//     PayPalButtons,
//     usePayPalScriptReducer
// } from "@paypal/react-paypal-js";
// //import { apiCreateOrder } from "apis";
// import { useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// //import Swal from "sweetalert2";

// // This value is from the props in the UI
// const style = { "layout": "vertical" };

// // Custom component to wrap the PayPalButtons and show loading spinner
// const ButtonWrapper = ({ currency, showSpinner, amount, payload, setIsSuccess }) => {
//     const [{ isPending, options }, dispatch] = usePayPalScriptReducer();
//     const navigate = useNavigate()
//     useEffect(() => {
//         dispatch({
//             type: 'resetOptions',
//             value: {
//                 ...options, currency: currency
//             }
//         })
//     }, [currency, showSpinner])

//     // const handleSaveOrder = async () => {
//     //     const response = await apiCreateOrder({ ...payload, status: 'Succeed' })
//     //     if (response.success) {
//     //         setIsSuccess(true)
//     //         setTimeout(() => {
//     //             Swal.fire('Congrat!', 'Order was created.', 'success').then(() => {
//     //                 navigate('/')
//     //             })
//     //         }, 1500)
//     //     }
//     // }

//     return (
//         <>
//             {(showSpinner && isPending) && <div className="spinner" />}
//             <PayPalButtons
//                 style={style}
//                 disabled={false}
//                 forceReRender={[style, currency, amount]}
//                 fundingSource={undefined}
//                 createOrder={(data, actions) => actions.order.create({
//                     purchase_units: [
//                         { amount: { currency_code: currency, value: amount } }
//                     ]
//                 }).then(orderId => orderId)}
//                 onApprove={(data, actions) => actions.order.capture().then(async (response) => {
//                     if (response.status === 'COMPLETED') {
//                         //handleSaveOrder()
//                     }
//                 })}
//             />
//         </>
//     );
// }

// export default function Paypal({ amount, payload, setIsSuccess }) {
//     return (
//         <div style={{ maxWidth: "750px", minHeight: "200px", margin: 'auto' }}>
//             <PayPalScriptProvider options={{ clientId: "test", components: "buttons", currency: "USD" }}>
//                 <ButtonWrapper setIsSuccess={setIsSuccess} payload={payload} currency={'USD'} amount={amount} showSpinner={false} />
//             </PayPalScriptProvider>
//         </div>
//     );
// }


import {
    PayPalScriptProvider,
    PayPalButtons,
    usePayPalScriptReducer
} from "@paypal/react-paypal-js";

// This value is from the props in the UI
const style = {"layout":"vertical"};

function createOrder() {
    // replace this url with your server
    return fetch("https://react-paypal-js-storybook.fly.dev/api/paypal/create-order", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        // use the "body" param to optionally pass additional order information
        // like product ids and quantities
        body: JSON.stringify({
            cart: [
                {
                    sku: "1blwyeo8",
                    quantity: 2,
                },
            ],
        }),
    })
        .then((response) => response.json())
        .then((order) => {
            // Your code here after create the order
            return order.id;
        });
}
function onApprove(data) {
    // replace this url with your server
    return fetch("https://react-paypal-js-storybook.fly.dev/api/paypal/capture-order", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            orderID: data.orderID,
        }),
    })
        .then((response) => response.json())
        .then((orderData) => {
            // Your code here after capture the order
        });
}

// Custom component to wrap the PayPalButtons and show loading spinner
const ButtonWrapper = ({ showSpinner }) => {
    const [{ isPending }] = usePayPalScriptReducer();

    return (
        <>
            { (showSpinner && isPending) && <div className="spinner" /> }
            <PayPalButtons
                style={style}
                disabled={false}
                forceReRender={[style]}
                fundingSource={undefined}
                createOrder={createOrder}
                onApprove={onApprove}
            />
        </>
    );
}

export default function App() {
    return (
        <div style={{ maxWidth: "750px", minHeight: "200px" }}>
            <PayPalScriptProvider options={{ clientId: "test", components: "buttons", currency: "USD" }}>
                <ButtonWrapper showSpinner={false} />
            </PayPalScriptProvider>
        </div>
    );
}