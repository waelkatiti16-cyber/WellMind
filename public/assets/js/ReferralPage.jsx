import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import ReferralCard from "../components/ReferralCard";
import ReferralTable from "../components/ReferralTable";
import Footer from "../components/Footer";

export default function ReferralPage() {
  return (
    <>
      <Header />

      <div className="container mt-4">
        <div className="row">
          
          {/* Sidebar */}
          <div className="col-lg-3">
            <Sidebar />
          </div>

          {/* Main Content */}
          <div className="col-lg-9">
            <h4>Referrals</h4>

            {/* Cards */}
            <div className="row">
              <ReferralCard title="Net Earnings" value="$12,000" />
              <ReferralCard title="Balance" value="$15,000" />
              <ReferralCard title="Referrals" value="10" />
            </div>

            {/* Referral Link */}
            <div className="card mt-4 p-3">
              <h5>Your Referral Link</h5>
              <input
                type="text"
                className="form-control mb-2"
                value="https://yourapp.com/ref?123"
                readOnly
              />
              <button className="btn btn-primary">Copy</button>
            </div>

            {/* Table */}
            <ReferralTable />
          </div>

        </div>
      </div>

      <Footer />
    </>
  );
}