// Kalkulator KPR — anuitas standar, disimulasikan per bulan lalu diagregat per tahun.

const priceInput = document.getElementById("input-price");
const dpInput = document.getElementById("input-dp");
const rateInput = document.getElementById("input-rate");
const tenorInput = document.getElementById("input-tenor");

const dpPercentLabel = document.getElementById("dp-percent-label");
const dpAmountLabel = document.getElementById("dp-amount-label");
const tenorLabel = document.getElementById("tenor-label");

const outMonthly = document.getElementById("out-monthly");
const outNote = document.getElementById("out-note");
const outLoan = document.getElementById("out-loan");
const outDp = document.getElementById("out-dp");
const outInterest = document.getElementById("out-interest");
const outTotal = document.getElementById("out-total");
const outVerdict = document.getElementById("out-verdict");
const breakdownBody = document.getElementById("breakdown-body");

const rupiah = new Intl.NumberFormat("id-ID", {
  style: "currency",
  currency: "IDR",
  maximumFractionDigits: 0,
});

function fmt(n) {
  return rupiah.format(Math.round(n));
}

function parseNum(input, fallback) {
  const v = parseFloat(input.value);
  return Number.isFinite(v) && v >= 0 ? v : fallback;
}

function verdictFor(monthly, years) {
  if (monthly <= 0) return "isi harga rumahnya dulu, baru kita ngobrol.";
  if (monthly < 2000000) return "segini sih masih masuk akal buat banyak orang. gas?";
  if (monthly < 5000000) return "lumayan kerasa tiap bulan, tapi rumahnya kebayang kan?";
  if (monthly < 10000000) return "pastikan gaji minimal 3x cicilan biar nggak ngos-ngosan.";
  return "cicilan sultan ini. yakin? cek lagi harga rumah atau DP-nya deh.";
}

function calculate() {
  const price = parseNum(priceInput, 0);
  const dpPercent = parseNum(dpInput, 0);
  const annualRate = parseNum(rateInput, 0);
  const years = Math.max(1, Math.round(parseNum(tenorInput, 20)));

  const dpAmount = (price * dpPercent) / 100;
  const loan = Math.max(0, price - dpAmount);
  const n = years * 12;
  const r = annualRate / 12 / 100;

  let monthly;
  if (loan <= 0) {
    monthly = 0;
  } else if (r === 0) {
    monthly = loan / n;
  } else {
    monthly = (loan * r) / (1 - Math.pow(1 + r, -n));
  }

  // Simulasi amortisasi bulanan, agregat per tahun.
  const yearly = [];
  let balance = loan;
  let totalInterest = 0;
  for (let year = 0; year < years; year++) {
    let principalYear = 0;
    let interestYear = 0;
    for (let month = 0; month < 12 && balance > 0; month++) {
      const interest = balance * r;
      let principal = monthly - interest;
      if (principal > balance) principal = balance; // bulan terakhir, hindari sisa negatif
      balance -= principal;
      principalYear += principal;
      interestYear += interest;
    }
    totalInterest += interestYear;
    yearly.push({
      year: year + 1,
      principal: principalYear,
      interest: interestYear,
      balance: Math.max(0, balance),
    });
  }

  const totalPaid = loan + totalInterest;

  // Tampilkan hasil.
  dpPercentLabel.textContent = dpPercent + "%";
  dpAmountLabel.textContent = fmt(dpAmount);
  tenorLabel.textContent = years + " tahun";

  outMonthly.textContent = fmt(monthly);
  outNote.textContent =
    loan <= 0
      ? "Nggak ada pinjaman — DP kamu nutup semua harganya."
      : `per bulan selama ${years} tahun (${n} kali cicilan), bunga ${annualRate}% per tahun`;
  outLoan.textContent = fmt(loan);
  outDp.textContent = fmt(dpAmount);
  outInterest.textContent = fmt(totalInterest);
  outTotal.textContent = fmt(totalPaid);
  outVerdict.textContent = verdictFor(monthly, years);

  breakdownBody.innerHTML = yearly
    .map(
      (row) => `<tr>
        <td>${row.year}</td>
        <td class="num">${fmt(row.principal)}</td>
        <td class="num">${fmt(row.interest)}</td>
        <td class="num">${fmt(row.balance)}</td>
      </tr>`
    )
    .join("");
}

[priceInput, dpInput, rateInput, tenorInput].forEach((input) => {
  input.addEventListener("input", calculate);
  input.addEventListener("change", calculate);
});

calculate();
