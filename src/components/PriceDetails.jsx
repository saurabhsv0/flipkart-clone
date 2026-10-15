import { inr } from '../utils/format';

export default function PriceDetails({ s }) {
  return (
    <div className="card h-fit">
      <h2 className="text-fk-grey font-medium uppercase text-sm px-5 py-3 border-b">Price details</h2>
      <dl className="px-5 py-4 space-y-4 text-sm">
        <div className="flex justify-between"><dt>Price ({s.count} item{s.count === 1 ? '' : 's'})</dt><dd>{inr(s.mrpTotal)}</dd></div>
        <div className="flex justify-between"><dt>Discount</dt><dd className="text-fk-green">− {inr(s.discount)}</dd></div>
        <div className="flex justify-between"><dt>Delivery charges</dt><dd>{s.delivery ? inr(s.delivery) : <span className="text-fk-green">Free</span>}</dd></div>
        <div className="flex justify-between border-t border-dashed pt-4 text-base font-medium"><dt>Total amount</dt><dd>{inr(s.total)}</dd></div>
      </dl>
      {s.discount > 0 && <p className="px-5 py-3 border-t text-fk-green text-sm font-medium">You will save {inr(s.discount)} on this order</p>}
    </div>
  );
}
