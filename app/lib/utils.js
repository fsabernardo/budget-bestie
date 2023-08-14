export const currencyFormatter = (amount) => {
    const formatter = Intl.NumberFormat("en-PH", {
        currency: "PHP",
        style: "currency",

    });

    return formatter.format(amount);
};