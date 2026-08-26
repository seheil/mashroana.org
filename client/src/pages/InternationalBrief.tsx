import { Link } from "wouter";

export default function InternationalBrief() {
  return (
    <div className="min-h-screen bg-[#f7fbf7] text-slate-900" dir="ltr">
      <section className="bg-gradient-to-br from-[#123c2c] via-[#18563d] to-emerald-700 px-5 py-20 text-white">
        <div className="mx-auto max-w-6xl">
          <p className="text-sm font-bold uppercase tracking-[0.18em] text-emerald-100">Partner brief · Egypt</p>
          <h1 className="mt-3 max-w-4xl text-4xl font-black leading-tight md:text-6xl">Mashroana Foundation for Charitable Works</h1>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-emerald-50">An Arabic-first charitable foundation platform designed to make programme information, public transparency, responsible media, and partnership enquiries easier to understand and review.</p>
          <div className="mt-9 flex flex-wrap gap-3"><a href="/partnerships#partner-inquiry" className="rounded-xl bg-white px-5 py-3 font-bold text-[#123c2c]">Start a partnership enquiry</a><Link href="/" className="rounded-xl border border-white/40 px-5 py-3 font-bold text-white hover:bg-white/10">Arabic website</Link></div>
        </div>
      </section>

      <main className="mx-auto max-w-6xl space-y-14 px-5 py-16">
        <section className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.14em] text-emerald-700">Overview</p>
            <h2 className="mt-2 text-3xl font-black">A practical starting point for responsible collaboration</h2>
            <p className="mt-4 max-w-3xl leading-8 text-slate-600">The foundation’s public platform presents charitable work across care, education, health, social relief, and empowerment. It is intended to help donors and prospective partners understand the organisation’s public-facing programme areas and begin a structured conversation.</p>
            <p className="mt-4 max-w-3xl leading-8 text-slate-600">This brief is not a funding proposal, financial report, or legal verification document. Formal documents, programme scope, budgets, and reporting expectations are shared only after a suitable discussion and according to the foundation’s approval and data-protection practices.</p>
          </div>
          <aside className="rounded-3xl bg-white p-7 shadow-sm">
            <h2 className="text-xl font-black">Public contact point</h2>
            <dl className="mt-5 space-y-4 text-sm leading-6 text-slate-600"><div><dt className="font-bold text-slate-900">Location</dt><dd>39 Ali Qassem Street, Maadi Gardens, Cairo, Egypt</dd></div><div><dt className="font-bold text-slate-900">Phone / WhatsApp</dt><dd>+20 101 312 8453</dd></div><div><dt className="font-bold text-slate-900">Official social channel</dt><dd><a className="font-bold text-emerald-800 underline" href="https://www.facebook.com/Mashroana1" target="_blank" rel="noreferrer">Facebook / Mashroana1</a></dd></div></dl>
          </aside>
        </section>

        <section className="rounded-3xl bg-[#153f2e] p-7 text-white md:p-9">
          <p className="text-sm font-bold uppercase tracking-[0.14em] text-emerald-200">How collaboration can begin</p>
          <div className="mt-5 grid gap-5 md:grid-cols-4"><article><p className="font-black text-emerald-200">01</p><h2 className="mt-2 text-lg font-black">Initial enquiry</h2><p className="mt-2 text-sm leading-6 text-emerald-50">Share the organisation, type of collaboration, intended programme area, and expected timeframe.</p></article><article><p className="font-black text-emerald-200">02</p><h2 className="mt-2 text-lg font-black">Scoping discussion</h2><p className="mt-2 text-sm leading-6 text-emerald-50">Clarify need, geographic scope, intended outputs, responsibilities, and whether a partnership is feasible.</p></article><article><p className="font-black text-emerald-200">03</p><h2 className="mt-2 text-lg font-black">Due diligence</h2><p className="mt-2 text-sm leading-6 text-emerald-50">Agree the appropriate legal, governance, programme, and financial information to be reviewed securely.</p></article><article><p className="font-black text-emerald-200">04</p><h2 className="mt-2 text-lg font-black">Implementation and updates</h2><p className="mt-2 text-sm leading-6 text-emerald-50">Define milestones, approved indicators, reporting cadence, and responsible-use requirements for media.</p></article></div>
        </section>

        <section className="grid gap-6 md:grid-cols-2">
          <article className="rounded-3xl border border-emerald-100 bg-emerald-50 p-7"><h2 className="text-2xl font-black">Data, impact and safeguarding</h2><p className="mt-3 leading-7 text-slate-600">The website does not publish unverified figures or identifying beneficiary information. Public metrics should include a programme context, period, and source; otherwise they are marked as pending verification or withheld.</p><Link href="/impact-methodology" className="mt-5 inline-block font-bold text-emerald-800 underline">Read the impact-methodology principles</Link></article>
          <article className="rounded-3xl border border-amber-200 bg-amber-50 p-7"><h2 className="text-2xl font-black">Documents and next steps</h2><p className="mt-3 leading-7 text-slate-600">Publicly approved documents are listed in the transparency centre. Information that is confidential, incomplete, or unsuitable for public disclosure should be shared through an agreed secure process rather than uploaded to the public website.</p><Link href="/transparency" className="mt-5 inline-block font-bold text-emerald-800 underline">Visit the transparency centre</Link></article>
        </section>

        <section className="rounded-3xl border border-slate-200 bg-white p-7 text-center md:p-9"><h2 className="text-3xl font-black">Interested in a conversation?</h2><p className="mx-auto mt-3 max-w-2xl leading-7 text-slate-600">Use the structured partnership enquiry form. The current form is in Arabic and requests only the initial details needed to identify the right next step.</p><a href="/partnerships#partner-inquiry" className="mt-6 inline-block rounded-xl bg-emerald-700 px-6 py-3 font-bold text-white hover:bg-emerald-800">Open partnership enquiry</a></section>
      </main>
    </div>
  );
}
