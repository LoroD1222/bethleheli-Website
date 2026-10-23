const message = "Hello! I'm interested in booking a safari. Can you help me?";
const href = `https://wa.me/255692796412?text=${encodeURIComponent(message)}`;

export function WhatsAppWidget() {
  return <aside className="whatsapp-widget" aria-label="WhatsApp contact">
    <a className="whatsapp-widget-prompt" href={href} target="_blank" rel="noopener noreferrer">💬 Chat with us</a>
    <a className="whatsapp-widget-button" href={href} target="_blank" rel="noopener noreferrer" aria-label="Chat with Betheli Expeditions on WhatsApp">
      <svg viewBox="0 0 32 32" aria-hidden="true"><path fill="currentColor" d="M16.04 3.2A12.7 12.7 0 0 0 5.3 22.68L3.5 29.2l6.67-1.75a12.7 12.7 0 1 0 5.87-24.25Zm0 2.14a10.55 10.55 0 0 1 9.16 15.8 10.56 10.56 0 0 1-14.45 3.85l-.47-.28-3.96 1.04 1.06-3.86-.3-.5a10.55 10.55 0 0 1 8.96-16.05Zm-4.5 4.88c-.23 0-.6.09-.91.43-.31.34-1.2 1.17-1.2 2.86s1.23 3.32 1.4 3.55c.17.23 2.42 3.7 5.86 5.18.82.35 1.46.57 1.96.73.82.26 1.57.22 2.16.13.66-.1 2.03-.83 2.32-1.63.29-.8.29-1.49.2-1.63-.08-.14-.31-.23-.65-.4-.34-.17-2.03-1-2.34-1.12-.31-.11-.54-.17-.77.17-.23.34-.88 1.11-1.08 1.34-.2.23-.4.26-.74.09-.34-.17-1.44-.53-2.74-1.69a10.3 10.3 0 0 1-1.9-2.36c-.2-.34-.02-.52.15-.69.15-.15.34-.4.51-.6.17-.2.23-.34.34-.57.12-.23.06-.43-.03-.6-.08-.17-.77-1.86-1.06-2.55-.28-.67-.56-.58-.77-.59h-.66Z"/></svg>
    </a>
  </aside>;
}
