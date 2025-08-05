import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import GoBack from "../../components/ui/GoBack";

const activity = [
  {
    date: "2025-06-13 15:27:04",
    location: "Lagos",
    ip: "129.205.124.244",
    source: "web",
  },
  {
    date: "2025-06-13 15:10:20",
    location: "Lagos",
    ip: "129.205.124.227",
    source: "web",
  },
  {
    date: "2025-06-13 14:59:01",
    location: "Lagos",
    ip: "129.205.124.244",
    source: "web",
  },
  {
    date: "2025-06-13 13:41:51",
    location: "Lagos",
    ip: "129.205.124.227",
    source: "web",
  },
  {
    date: "2025-06-13 13:38:44",
    location: "Lagos",
    ip: "129.205.124.227",
    source: "web",
  },
  {
    date: "2025-06-13 12:11:31",
    location: "unknown",
    ip: "102.90.102.27",
    source: "web",
  },
  {
    date: "2025-06-04 12:47:05",
    location: "Lagos",
    ip: "197.211.57.19",
    source: "web",
  },
  {
    date: "2025-05-27 16:52:13",
    location: "Lagos",
    ip: "197.211.57.45",
    source: "web",
  },
  {
    date: "2025-05-26 11:25:58",
    location: "Lagos",
    ip: "197.211.59.105",
    source: "web",
  },
  {
    date: "2025-05-25 20:16:45",
    location: "Lagos",
    ip: "197.211.59.105",
    source: "web",
  },
];

export default function AccountActivity() {
  const navigate = useNavigate();

  return (
    <div className="max-w-7xl mx-auto px-4 py-6 text-white">
      {/* Header & Back Button */}
      <div className=" mb-6">
        <div className="flex flex-col gap-2">
          <GoBack />
        </div>
        <div className="flex items-center justify-between gap-2">
			<h2 className="text-2xl font-bold">Account Activity</h2>
			<p className="text-sm text-gray-400 hidden sm:block">
			  Only shows your records of three months
			</p>
		</div>
      </div>

      {/* Button */}
      <button className="bg-zinc-800 text-white text-sm px-4 py-2 rounded mb-4">
        Login activity
      </button>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full text-[11px] text-left border-separate border-spacing-y-2">
          <thead className="text-gray-400">
            <tr>
              <th className="px-4 py-2">Date</th>
              <th className="px-4 py-2">Location</th>
              <th className="px-4 py-2">IP</th>
              <th className="px-4 py-2">Source</th>
            </tr>
          </thead>
          <tbody className="text-white">
            {activity.map((a, idx) => (
              <tr key={idx} className="border-b border-gray-700">
                <td className="px-4 py-2">{a.date}</td>
                <td className="px-4 py-2">{a.location}</td>
                <td className="px-4 py-2">{a.ip}</td>
                <td className="px-4 py-2">{a.source}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
