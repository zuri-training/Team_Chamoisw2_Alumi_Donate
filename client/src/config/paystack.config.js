const config = {
    reference: (new Date()).getTime().toString(),
    email: '',
    amount: 100, //Amount is in the country's lowest currency. E.g Kobo, so 20000 kobo = N200
    publicKey: process.env.REACT_APP_PAYSTACK_PUBLIC_KEY,
    channels: ['card'],
    currency: 'NGN'
};

export default config