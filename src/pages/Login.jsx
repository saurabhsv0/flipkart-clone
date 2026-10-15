import { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { login } from '../store/authSlice';

// Demo auth: any 10-digit number and the OTP 123456 work.
export default function Login() {
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');
  const [sent, setSent] = useState(false);
  const [err, setErr] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [sp] = useSearchParams();

  const submit = (e) => {
    e.preventDefault();
    setErr('');
    if (!sent) {
      if (!/^\d{10}$/.test(phone)) return setErr('Enter a valid 10-digit mobile number');
      return setSent(true);
    }
    if (otp !== '123456') return setErr('Incorrect OTP. Use 123456 for this demo.');
    dispatch(login({ phone, name: 'User ' + phone.slice(-4) }));
    navigate(sp.get('next') || '/');
  };

  return (
    <div className="max-w-[820px] mx-auto mt-8 card flex flex-col sm:flex-row min-h-[460px]">
      <div className="sm:w-[40%] bg-fk-blue text-white p-8">
        <h1 className="text-2xl font-medium">Login</h1>
        <p className="mt-4 text-lg text-[#dbdbdb] leading-7">Get access to your orders, wishlist and recommendations.</p>
      </div>
      <form onSubmit={submit} className="flex-1 p-8 flex flex-col gap-5">
        <label className="block">
          <span className="text-xs text-fk-grey">Mobile number</span>
          <input value={phone} onChange={(e) => setPhone(e.target.value.replace(/\D/g, '').slice(0, 10))} disabled={sent} className="input mt-1" inputMode="numeric" />
        </label>
        {sent && (
          <label className="block">
            <span className="text-xs text-fk-grey">Enter OTP sent to +91 {phone}</span>
            <input value={otp} onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))} className="input mt-1" inputMode="numeric" autoFocus />
          </label>
        )}
        {err && <p className="text-red-600 text-sm" role="alert">{err}</p>}
        <button className="btn-orange">{sent ? 'Verify and login' : 'Request OTP'}</button>
        <p className="text-xs text-fk-grey">By continuing, you agree to the Terms of Use and Privacy Policy.</p>
      </form>
    </div>
  );
}
