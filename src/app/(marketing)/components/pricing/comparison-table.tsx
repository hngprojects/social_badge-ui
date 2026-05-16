import { COMPARISON_ROWS } from '../../pricing/constants/comparison-rows';
import StatusIcon from './status-icon';
type CellValue = string;

function TableCell({ value }: { value: CellValue }) {
  if (value === 'check') return <StatusIcon type="check" className="bg-green-500" />;
  if (value === 'cross') return <StatusIcon type="cross" className="bg-red-500" />;
  return <span className="text-[13px] text-[#303030]">{value}</span>;
}

export default function ComparisonTable() {
  return (
    <section className="lg:my-[140px] md:my-[100px] my-12 w-full px-6 max-w-[1090] mx-auto text-center">
      <h2 className="text-[clamp(22px,3vw,32px)] tracking-tight mb-2 font-fraunces">
        Compare plans and features
      </h2>
      <p className="text-sm text-[#303030] mb-10">Choose the perfect plan for your journey</p>

      <div className="overflow-x-auto rounded-2xl border border-[#B3B3B366]">
        <table className="w-full border-collapse text-sm">
          <thead>
            <tr>
              {['Feature/ Plan', 'Free Plan', 'Pro Plan', 'Team Plan'].map((header, i) => (
                <th
                  key={header}
                  className={`h-[94px] px-6 text-xl py-5 text-[#161616] border-b border-[#B3B3B366] bg-white whitespace-nowrap
  ${i === 0 ? 'text-left sticky left-0 z-10 bg-white' : 'text-center border-l border-[#B3B3B366] w-[252px] min-w-[105px]'}
`}
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {COMPARISON_ROWS.map((row, i) => (
              <tr
                key={row.feature}
                className={`h-[72px] ${i % 2 === 0 ? 'bg-[#f8f8f8]' : 'bg-white'}`}
              >
                <td className="px-6 py-5 font-medium text-[#111] border-b border-[#B3B3B366] whitespace-nowrap text-left sticky left-0 z-10 bg-inherit">
                  {row.feature}
                </td>
                {(['free', 'pro', 'team'] as const).map((plan) => (
                  <td
                    key={plan}
                    className="min-w-[130px] px-6 py-5 border-b border-l border-[#B3B3B366] text-center"
                  >
                    <div className="flex justify-center items-center">
                      <TableCell value={row[plan]} />
                    </div>
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}