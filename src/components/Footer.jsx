export default function Footer() {
  const cols = {
    About: ['Contact Us', 'About Us', 'Careers', 'Press'],
    Help: ['Payments', 'Shipping', 'Cancellation & Returns', 'FAQ'],
    Policy: ['Return Policy', 'Terms of Use', 'Security', 'Privacy'],
  };
  return (
    <footer className="bg-[#172337] text-white mt-8">
      <div className="max-w-[1280px] mx-auto px-4 py-10 grid grid-cols-2 md:grid-cols-4 gap-8 text-sm">
        {Object.entries(cols).map(([title, links]) => (
          <div key={title}>
            <h4 className="text-[#878787] text-xs mb-3">{title}</h4>
            <ul className="space-y-2">{links.map((l) => <li key={l}>{l}</li>)}</ul>
          </div>
        ))}
        <div>
          <h4 className="text-[#878787] text-xs mb-3">Mail Us</h4>
          <p className="leading-6">Flipkart Clone Pvt. Ltd.<br />Student project, not affiliated with Flipkart.</p>
        </div>
      </div>
      <div className="border-t border-[#454d5e] text-center text-xs py-4">© 2026 Flipkart Clone. Built with React + Vite.</div>
    </footer>
  );
}
