const whatsappPhone = "255692796412";
const defaultMessage = "Hello Betheli Expeditions, I would like help planning a Tanzania trip.";

export const whatsappNumber = (process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || whatsappPhone).replace(/\D/g, "");
export const whatsappHref = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(process.env.NEXT_PUBLIC_WHATSAPP_MESSAGE || defaultMessage)}`;
